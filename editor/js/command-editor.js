/* ===================================================================
   command-editor.js — 制御コマンドのフォーム編集
   ====================================================================
   各コマンド種別に対応するフィールド定義 → フォーム生成 → raw 文字列生成。
   未対応コマンドは raw テキスト編集にフォールバック。
   =================================================================== */

window.EditorCommandEditor = (() => {

  // ----- アセット情報（app.js から setAssets で注入される）-----
  let _assets = { bg: [], bgm: [], se: [], stills: [], chars: {} };
  // config.js は editor からは直接読まないので、必要な情報は app から渡してもらう
  // ここでは asset から動的取得しているのでそれを使う
  let _allLabels = [];   // .md 全体から抽出した label 名（@jump の選択肢用）

  function setAssets(assets) { _assets = assets; }
  function setLabels(labels) { _allLabels = labels; }

  // ----- 位置/エフェクト/効果の定数 -----
  const POS = ['left', 'center', 'right'];
  const SHOW_EFFECT = ['fade_in', 'slide_in_left', 'slide_in_right', 'pop_in', 'instant'];
  const HIDE_EFFECT = ['fade_out', 'slide_out_left', 'slide_out_right', 'instant'];
  const SCENE_EFFECT = ['fade', 'instant', 'slide_left', 'slide_right'];
  const MOVE_EFFECT = ['slide', 'instant'];
  const STILL_EFFECT_IN = ['fade_in', 'slide_in_bottom'];
  const STILL_EFFECT_OUT = ['fade_out', 'instant'];
  const WINDOW_TARGETS = ['sakura', 'kotoha', 'mahiru', 'reset'];

  // ----- スキーマ定義 -----
  // 各エントリ: parse(args) → values, fields(values) → field[], build(values) → args[]
  const SCHEMAS = {
    scene: {
      label: '🎬 シーン',
      parse: a => ({ bg: a[0] || '', effect: a[1] || 'fade' }),
      build: v => ['scene', v.bg, ...(v.effect && v.effect !== 'fade' ? [v.effect] : [])],
      fields: () => [
        { k: 'bg', label: 'BG', type: 'select-bg', required: true },
        { k: 'effect', label: 'エフェクト', type: 'select-strict', options: SCENE_EFFECT },
      ],
    },
    bgm: {
      label: '🎵 BGM',
      parse: a => {
        if (!a[0] || a[0] === 'stop') return { action: 'stop' };
        return { action: 'play', track: a[0], loop: a[1] !== 'noloop' };
      },
      build: v => {
        if (v.action === 'stop') return ['bgm', 'stop'];
        return ['bgm', v.track, ...(v.loop === false ? ['noloop'] : [])];
      },
      fields: v => v.action === 'stop'
        ? [{ k: 'action', label: '動作', type: 'select-strict', options: ['play', 'stop'] }]
        : [
            { k: 'action', label: '動作', type: 'select-strict', options: ['play', 'stop'] },
            { k: 'track', label: 'トラック', type: 'select-bgm', required: true },
            { k: 'loop', label: 'ループ', type: 'checkbox' },
          ],
    },
    se: {
      label: '🔊 SE',
      parse: a => {
        if (!a[0] || a[0] === 'stop') return { action: 'stop' };
        return { action: 'play', file: a[0], loop: a[1] === 'loop' };
      },
      build: v => {
        if (v.action === 'stop') return ['se', 'stop'];
        return ['se', v.file, ...(v.loop ? ['loop'] : [])];
      },
      fields: v => v.action === 'stop'
        ? [{ k: 'action', label: '動作', type: 'select-strict', options: ['play', 'stop'] }]
        : [
            { k: 'action', label: '動作', type: 'select-strict', options: ['play', 'stop'] },
            { k: 'file', label: 'ファイル', type: 'select-se', required: true },
            { k: 'loop', label: 'ループ', type: 'checkbox' },
          ],
    },
    show: {
      label: '👤 キャラ表示',
      parse: a => ({
        char: a[0] || '',
        pos: a[1] || 'center',
        expr: a[2] || 'normal',
        effect: a[3] || 'fade_in',
      }),
      build: v => {
        const args = ['show', v.char, v.pos];
        const expr = v.expr || 'normal';
        const effect = v.effect || 'fade_in';
        if (expr !== 'normal' || effect !== 'fade_in') args.push(expr);
        if (effect !== 'fade_in') args.push(effect);
        return args;
      },
      fields: v => [
        { k: 'char', label: 'キャラ', type: 'select-char', required: true },
        { k: 'pos', label: '位置', type: 'select-strict', options: POS },
        { k: 'expr', label: '表情', type: 'select-expr', forKey: 'char' },
        { k: 'effect', label: 'エフェクト', type: 'select-strict', options: SHOW_EFFECT },
      ],
    },
    hide: {
      label: '👤 キャラ非表示',
      parse: a => ({ target: a[0] || '', effect: a[1] || 'fade_out' }),
      build: v => ['hide', v.target, ...(v.effect && v.effect !== 'fade_out' ? [v.effect] : [])],
      fields: () => [
        { k: 'target', label: '対象', type: 'select-char-or-pos', required: true },
        { k: 'effect', label: 'エフェクト', type: 'select-strict', options: HIDE_EFFECT },
      ],
    },
    hide_all: {
      label: '👥 全キャラ非表示',
      parse: a => ({ effect: a[0] || 'fade_out' }),
      build: v => ['hide_all', ...(v.effect && v.effect !== 'fade_out' ? [v.effect] : [])],
      fields: () => [
        { k: 'effect', label: 'エフェクト', type: 'select-strict', options: HIDE_EFFECT },
      ],
    },
    expr: {
      label: '😊 表情変更',
      parse: a => ({ char: a[0] || '', expr: a[1] || 'normal' }),
      build: v => ['expr', v.char, v.expr],
      fields: () => [
        { k: 'char', label: 'キャラ', type: 'select-char', required: true },
        { k: 'expr', label: '表情', type: 'select-expr', forKey: 'char', required: true },
      ],
    },
    move: {
      label: '↔️ キャラ移動',
      parse: a => ({ char: a[0] || '', pos: a[1] || 'center', effect: a[2] || 'slide' }),
      build: v => ['move', v.char, v.pos, ...(v.effect && v.effect !== 'slide' ? [v.effect] : [])],
      fields: () => [
        { k: 'char', label: 'キャラ', type: 'select-char', required: true },
        { k: 'pos', label: '位置', type: 'select-strict', options: POS, required: true },
        { k: 'effect', label: 'エフェクト', type: 'select-strict', options: MOVE_EFFECT },
      ],
    },
    still: {
      label: '🖼️ スチル表示',
      parse: a => ({ image: a[0] || '', effect: a[1] || 'fade_in' }),
      build: v => ['still', v.image, ...(v.effect && v.effect !== 'fade_in' ? [v.effect] : [])],
      fields: () => [
        { k: 'image', label: 'スチル', type: 'select-still', required: true },
        { k: 'effect', label: 'エフェクト', type: 'select-strict', options: STILL_EFFECT_IN },
      ],
    },
    still_hide: {
      label: '🖼️ スチル非表示',
      parse: a => ({ effect: a[0] || 'fade_out' }),
      build: v => ['still_hide', ...(v.effect && v.effect !== 'fade_out' ? [v.effect] : [])],
      fields: () => [
        { k: 'effect', label: 'エフェクト', type: 'select-strict', options: STILL_EFFECT_OUT },
      ],
    },
    wait: {
      label: '⏱️ 待機',
      parse: a => ({ ms: parseInt(a[0]) || 1000 }),
      build: v => ['wait', String(v.ms)],
      fields: () => [
        { k: 'ms', label: 'ミリ秒', type: 'number', min: 0, step: 100, required: true },
      ],
    },
    window_color: {
      label: '🎨 ウィンドウ色',
      parse: a => ({ target: a[0] || 'reset' }),
      build: v => ['window_color', v.target],
      fields: () => [
        { k: 'target', label: 'カラー', type: 'select-strict', options: WINDOW_TARGETS, required: true },
      ],
    },
    jump: {
      label: '➡️ ジャンプ',
      parse: a => ({ label: a[0] || '' }),
      build: v => ['jump', v.label],
      fields: () => [
        { k: 'label', label: 'ジャンプ先', type: 'select-label', required: true },
      ],
    },
    flag: {
      label: '🚩 フラグ設定',
      parse: a => ({ name: a[0] || '', value: a[1] || '' }),
      build: v => ['flag', v.name, v.value],
      fields: () => [
        { k: 'name', label: '名前', type: 'text', required: true },
        { k: 'value', label: '値', type: 'text', required: true },
      ],
    },
    effect: {
      label: '✨ 演出',
      parse: a => ({ type: a[0] || 'stop' }),
      build: v => ['effect', v.type],
      fields: () => [
        { k: 'type', label: '演出', type: 'text', required: true },
      ],
    },
    shake: {
      label: '🌀 シェイク',
      parse: a => ({ strength: parseInt(a[0]) || 8, duration: parseInt(a[1]) || 500 }),
      build: v => ['shake', String(v.strength), String(v.duration)],
      fields: () => [
        { k: 'strength', label: '強度', type: 'number', min: 1 },
        { k: 'duration', label: '時間(ms)', type: 'number', min: 0, step: 100 },
      ],
    },
  };

  // ----- 公開API -----

  function isSupported(cmd) {
    return cmd in SCHEMAS;
  }

  function getLabel(cmd) {
    return SCHEMAS[cmd]?.label || cmd;
  }

  /**
   * フォームを生成して container に挿入する。
   * @param container - 親要素
   * @param parsedLine - { type: 'command', cmd, args, raw } の行オブジェクト
   * @param onChange - (newRaw) => void
   */
  function render(container, parsedLine, onChange) {
    container.innerHTML = '';
    const schema = SCHEMAS[parsedLine.cmd];

    if (!schema) {
      // 未対応コマンド: raw 編集にフォールバック
      const ta = document.createElement('textarea');
      ta.className = 'cmd-form-raw';
      ta.value = parsedLine.raw;
      ta.rows = 1;
      ta.spellcheck = false;
      ta.addEventListener('input', () => {
        onChange(ta.value);
        autoGrow(ta);
      });
      autoGrow(ta);
      container.appendChild(ta);
      return;
    }

    const values = schema.parse(parsedLine.args || []);

    const form = document.createElement('div');
    form.className = 'cmd-form';

    const renderFields = () => {
      form.innerHTML = '';
      const fields = schema.fields(values);
      for (const f of fields) {
        const fieldEl = makeField(f, values, () => {
          // フィールドが変わったら全フィールド再描画（条件付きフィールド対応）
          renderFields();
          const args = schema.build(values);
          const newRaw = '@' + args.filter(a => a !== '' && a != null).join(' ');
          onChange(newRaw);
        });
        form.appendChild(fieldEl);
      }
    };
    renderFields();
    container.appendChild(form);
  }

  function makeField(field, values, onChange) {
    const wrap = document.createElement('div');
    wrap.className = 'cmd-field';

    const lbl = document.createElement('label');
    lbl.textContent = field.label + (field.required ? ' *' : '');
    wrap.appendChild(lbl);

    let input;
    switch (field.type) {
      case 'text':
        input = document.createElement('input');
        input.type = 'text';
        input.value = values[field.k] ?? '';
        input.addEventListener('input', () => {
          values[field.k] = input.value;
          onChange();
        });
        break;

      case 'number':
        input = document.createElement('input');
        input.type = 'number';
        if (field.min != null) input.min = field.min;
        if (field.step != null) input.step = field.step;
        input.value = values[field.k] ?? '';
        input.addEventListener('input', () => {
          values[field.k] = input.value === '' ? '' : Number(input.value);
          onChange();
        });
        break;

      case 'checkbox':
        input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = !!values[field.k];
        input.addEventListener('change', () => {
          values[field.k] = input.checked;
          onChange();
        });
        break;

      case 'select-strict':
        input = makeSelect(field.options, values[field.k], v => {
          values[field.k] = v;
          onChange();
        });
        break;

      case 'select-bg':
        input = makeSelectGroup(_assets.bg, values[field.k], v => {
          values[field.k] = v;
          onChange();
        });
        break;

      case 'select-bgm':
        input = makeSelectGroup(_assets.bgm, values[field.k], v => {
          values[field.k] = v;
          onChange();
        });
        break;

      case 'select-se':
        input = makeSelectGroup(_assets.se, values[field.k], v => {
          values[field.k] = v;
          onChange();
        });
        break;

      case 'select-still':
        input = makeSelectGroup(_assets.stills, values[field.k], v => {
          values[field.k] = v;
          onChange();
        });
        break;

      case 'select-char':
        input = makeSelectGroup(Object.keys(_assets.chars || {}), values[field.k], v => {
          values[field.k] = v;
          onChange();
        });
        break;

      case 'select-expr': {
        const charKey = values[field.forKey];
        const exprs = (_assets.chars && _assets.chars[charKey]) || ['normal'];
        input = makeSelectGroup(exprs, values[field.k], v => {
          values[field.k] = v;
          onChange();
        });
        break;
      }

      case 'select-char-or-pos': {
        const chars = Object.keys(_assets.chars || {});
        const opts = [...chars, ...POS];
        input = makeSelectGroup(opts, values[field.k], v => {
          values[field.k] = v;
          onChange();
        });
        break;
      }

      case 'select-label':
        input = makeSelectGroup(_allLabels, values[field.k], v => {
          values[field.k] = v;
          onChange();
        });
        break;

      default:
        input = document.createElement('input');
        input.type = 'text';
        input.value = values[field.k] ?? '';
        input.addEventListener('input', () => {
          values[field.k] = input.value;
          onChange();
        });
    }
    wrap.appendChild(input);
    return wrap;
  }

  function makeSelect(options, current, onSelect) {
    const sel = document.createElement('select');
    for (const o of options) {
      const opt = document.createElement('option');
      opt.value = o;
      opt.textContent = o;
      if (o === current) opt.selected = true;
      sel.appendChild(opt);
    }
    sel.addEventListener('change', () => onSelect(sel.value));
    return sel;
  }

  function makeSelectGroup(options, current, onSelect) {
    const sel = document.createElement('select');
    // 現在値がリストにない場合は先頭に追加（既存データの互換性のため）
    if (current && !options.includes(current)) {
      const opt = document.createElement('option');
      opt.value = current;
      opt.textContent = `${current} (未検出)`;
      opt.selected = true;
      sel.appendChild(opt);
    }
    // 空選択肢
    if (!options.length || !current) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = '— 未選択 —';
      if (!current) opt.selected = true;
      sel.appendChild(opt);
    }
    for (const o of options) {
      const opt = document.createElement('option');
      opt.value = o;
      opt.textContent = o;
      if (o === current) opt.selected = true;
      sel.appendChild(opt);
    }
    sel.addEventListener('change', () => onSelect(sel.value));
    return sel;
  }

  function autoGrow(ta) {
    ta.style.height = 'auto';
    ta.style.height = Math.max(28, ta.scrollHeight) + 'px';
  }

  /** コマンド行のサマリ表示（折りたたみ時用） */
  function summary(parsedLine) {
    const schema = SCHEMAS[parsedLine.cmd];
    if (!schema) return parsedLine.raw.trim();
    const v = schema.parse(parsedLine.args || []);
    const parts = Object.entries(v)
      .filter(([_, val]) => val !== '' && val != null && val !== false)
      .map(([k, val]) => `${k}=${val}`);
    return `${schema.label} · ${parts.join(' ')}`;
  }

  return { setAssets, setLabels, isSupported, getLabel, render, summary };
})();
