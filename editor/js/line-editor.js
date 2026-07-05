/* ===================================================================
   line-editor.js — 中央ペイン: ラベル内の全行を表示+編集
   ====================================================================
   - テキスト行（narration/dialogue/choice_option）: JA/EN 並列編集
   - コマンド行: クリックで展開してフォーム編集 (command-editor.js を使用)
   - 選択肢: 分岐先プルダウン + フラグ修飾子 + テキスト
   - 行間のホバーバーから「+ 行挿入」、行右の「✕」で削除
   =================================================================== */

window.EditorLineEditor = (() => {

  let _container;
  let _callbacks = {};
  let _state = {
    fileName: null,
    labelName: null,
    parsed: null,
    labelRange: null,
    locales: null,
    allLabels: [],
    chars: [],
    dirtyTextKeys: new Set(),
    dirtyLineIdx: new Set(),
    expandedCmdIdx: null,
    selectedLineIdx: null,
  };

  function init(containerEl, callbacks) {
    _container = containerEl;
    _callbacks = callbacks || {};
  }

  function setLocales(locales) { _state.locales = locales; }
  function setAllLabels(labels) { _state.allLabels = labels; }
  function setCharacters(charList) { _state.chars = charList || []; }

  function showLabel(fileName, labelName, parsed, labelRange) {
    _state.fileName = fileName;
    _state.labelName = labelName;
    _state.parsed = parsed;
    _state.labelRange = labelRange;
    _state.expandedCmdIdx = null;
    _state.selectedLineIdx = labelRange ? (labelRange.startIdx + 1) : null;
    render();
    if (_callbacks.onLineSelect && _state.selectedLineIdx != null) {
      _callbacks.onLineSelect(_state.selectedLineIdx);
    }
  }

  function markTextDirty(key, lang) {
    _state.dirtyTextKeys.add(`${key}::${lang}`);
    const field = _container.querySelector(`[data-keyfield="${cssEscape(key + '::' + lang)}"]`);
    if (field) field.classList.add('dirty');
  }

  function markLineDirty(lineIdx) {
    _state.dirtyLineIdx.add(lineIdx);
    const row = _container.querySelector(`[data-line-idx="${lineIdx}"]`);
    if (row) row.classList.add('dirty');
  }

  function clearDirty() {
    _state.dirtyTextKeys.clear();
    _state.dirtyLineIdx.clear();
    _container.querySelectorAll('.text-field.dirty, .line-row.dirty').forEach(el => el.classList.remove('dirty'));
  }

  function render() {
    if (!_container) return;
    _container.innerHTML = '';
    if (!_state.parsed || !_state.labelRange) {
      _container.innerHTML = '<div class="placeholder">ラベルを選択してください。</div>';
      return;
    }

    const { startIdx, endIdx } = _state.labelRange;

    // ラベル先頭の上に挿入バー（ラベル行直後＝最初の行の上）
    _container.appendChild(makeInsertBar(startIdx + 1));

    for (let i = startIdx + 1; i < endIdx; i++) {
      const line = _state.parsed[i];
      const el = renderLine(line, i);
      if (el) _container.appendChild(el);
      _container.appendChild(makeInsertBar(i + 1));
    }
  }

  function makeInsertBar(atIdx) {
    const bar = document.createElement('div');
    bar.className = 'insert-bar';
    const btn = document.createElement('button');
    btn.className = 'insert-btn';
    btn.textContent = '+';
    btn.title = 'この位置に行を挿入';
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showInsertMenu(btn, atIdx);
    });
    bar.appendChild(btn);
    return bar;
  }

  // 挿入メニュー定義: { section: '...' } はセクション見出し、それ以外は項目
  const INSERT_MENU = [
    { section: 'テキスト' },
    { label: '🗨️ ナレーション',     type: 'narration' },
    { label: '👤 セリフ',           type: 'dialogue' },
    { label: '➡️ 選択肢ブロック',   type: 'choice_block' },
    { section: '背景・スチル・音' },
    { label: '🎬 シーン変更 (@scene)',         type: 'cmd_scene' },
    { label: '🎵 BGM (@bgm)',                  type: 'cmd_bgm' },
    { label: '🔊 SE (@se)',                    type: 'cmd_se' },
    { label: '🖼️ スチル表示 (@still)',         type: 'cmd_still' },
    { label: '🖼️ スチル非表示 (@still_hide)',  type: 'cmd_still_hide' },
    { section: 'キャラクター' },
    { label: '👤 キャラ表示 (@show)',          type: 'cmd_show' },
    { label: '👤 キャラ非表示 (@hide)',        type: 'cmd_hide' },
    { label: '👥 全キャラ非表示 (@hide_all)',  type: 'cmd_hide_all' },
    { label: '😊 表情変更 (@expr)',            type: 'cmd_expr' },
    { label: '↔️ キャラ移動 (@move)',          type: 'cmd_move' },
    { section: '演出・制御' },
    { label: '🎨 ウィンドウ色 (@window_color)', type: 'cmd_window_color' },
    { label: '⏱️ 待機 (@wait)',                type: 'cmd_wait' },
    { label: '🚩 フラグ (@flag)',              type: 'cmd_flag' },
    { label: '🌀 シェイク (@shake)',           type: 'cmd_shake' },
    { label: '✨ エフェクト (@effect)',         type: 'cmd_effect' },
    { label: '➡️ ジャンプ (@jump)',            type: 'cmd_jump' },
    { section: 'その他' },
    { label: '💬 コメント',         type: 'comment' },
    { label: '⎯ 空行',              type: 'blank' },
    { label: '🔧 raw コマンド',     type: 'command' },
  ];

  function showInsertMenu(anchor, atIdx) {
    document.querySelectorAll('.insert-menu').forEach(el => el.remove());
    const menu = document.createElement('div');
    menu.className = 'insert-menu';
    for (const it of INSERT_MENU) {
      if (it.section) {
        const sec = document.createElement('div');
        sec.className = 'insert-menu-section';
        sec.textContent = it.section;
        menu.appendChild(sec);
        continue;
      }
      const opt = document.createElement('button');
      opt.className = 'insert-menu-item';
      opt.textContent = it.label;
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.remove();
        _callbacks.onInsertLine && _callbacks.onInsertLine(atIdx, it.type);
      });
      menu.appendChild(opt);
    }
    document.body.appendChild(menu);
    const rect = anchor.getBoundingClientRect();
    // 画面下端を超えるなら上方向に表示
    let top = rect.bottom + 4;
    let left = rect.left + rect.width / 2 - menu.offsetWidth / 2;
    if (top + menu.offsetHeight > window.innerHeight - 8) {
      top = Math.max(8, window.innerHeight - menu.offsetHeight - 8);
    }
    if (left < 8) left = 8;
    if (left + menu.offsetWidth > window.innerWidth - 8) {
      left = window.innerWidth - menu.offsetWidth - 8;
    }
    menu.style.left = left + 'px';
    menu.style.top = top + 'px';
    const close = (e) => {
      if (!menu.contains(e.target)) {
        menu.remove();
        document.removeEventListener('mousedown', close);
      }
    };
    setTimeout(() => document.addEventListener('mousedown', close), 0);
  }

  // app.js から「挿入後に自動でフォーム展開」したい時に呼ぶ
  function expandCommandAt(lineIdx) {
    _state.expandedCmdIdx = lineIdx;
    _state.selectedLineIdx = lineIdx;
    render();
  }

  function renderLine(line, lineIdx) {
    const row = document.createElement('div');
    row.className = `line-row ${line.type}`;
    row.dataset.lineIdx = String(lineIdx);
    if (_state.dirtyLineIdx.has(lineIdx)) row.classList.add('dirty');
    if (lineIdx === _state.selectedLineIdx) row.classList.add('selected');

    row.addEventListener('click', (e) => {
      if (e.target.closest('textarea, input, select, button')) return;
      _selectLine(lineIdx);
    });

    // 削除ボタン (空行以外)
    if (line.type !== 'blank') {
      const del = document.createElement('button');
      del.className = 'line-delete-btn';
      del.textContent = '✕';
      del.title = 'この行を削除';
      del.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('この行を削除しますか？')) {
          _callbacks.onDeleteLine && _callbacks.onDeleteLine(lineIdx);
        }
      });
      row.appendChild(del);
    }

    switch (line.type) {
      case 'blank':
        return row;
      case 'comment':
      case 'separator':
        const codeEl = document.createElement('span');
        codeEl.className = 'comment-text';
        codeEl.textContent = line.raw;
        row.appendChild(codeEl);
        return row;
      case 'command':
        return renderCommandRow(row, line, lineIdx);
      case 'choice_start':
        return renderChoiceStartRow(row, line, lineIdx);
      case 'narration':
        return renderTextRow(row, line, 'NARR', 'narr');
      case 'dialogue':
        return renderDialogueRow(row, line);
      case 'choice_option':
        return renderChoiceOptionRow(row, line);
      case 'label':
        // 通常 label 行はラベル先頭なので showLabel で表示範囲に含まれないが、
        // 念のためフォールバック
        row.classList.add('label-row');
        row.textContent = '# ' + line.name;
        return row;
      default:
        row.textContent = line.raw;
        return row;
    }
  }

  function renderCommandRow(row, line, lineIdx) {
    row.classList.add('cmd');
    const isExpanded = _state.expandedCmdIdx === lineIdx;
    if (isExpanded) row.classList.add('expanded');

    const isSupported = window.EditorCommandEditor?.isSupported(line.cmd);

    const head = document.createElement('div');
    head.className = 'cmd-head';
    head.innerHTML = `
      <span class="cmd-toggle">${isExpanded ? '▼' : '▶'}</span>
      <span class="cmd-summary">${escapeHtml(
        isSupported ? window.EditorCommandEditor.summary(line) : line.raw.trim()
      )}</span>
    `;
    head.addEventListener('click', (e) => {
      e.stopPropagation();
      _state.expandedCmdIdx = isExpanded ? null : lineIdx;
      _selectLine(lineIdx);
      render();
    });
    row.appendChild(head);

    if (isExpanded) {
      const body = document.createElement('div');
      body.className = 'cmd-body';
      window.EditorCommandEditor.render(body, line, (newRaw) => {
        line.raw = newRaw;
        const re = window.ScenarioIO.parseLine(newRaw);
        Object.assign(line, re);
        const sum = head.querySelector('.cmd-summary');
        if (sum) sum.textContent = isSupported
          ? window.EditorCommandEditor.summary(line)
          : line.raw.trim();
        markLineDirty(lineIdx);
        if (_callbacks.onCommandChange) _callbacks.onCommandChange(lineIdx, newRaw);
      });
      row.appendChild(body);
    }
    return row;
  }

  function renderChoiceStartRow(row, line, lineIdx) {
    row.classList.add('cmd', 'choice-start');
    const head = document.createElement('div');
    head.className = 'cmd-head';
    head.innerHTML = `
      <span class="cmd-toggle">▣</span>
      <span class="cmd-summary">➡️ 選択肢ブロック</span>
      <button class="add-choice-btn" title="この選択肢ブロックに分岐を追加">+ 選択肢を追加</button>
    `;
    head.querySelector('.add-choice-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      // 直後（連続する choice_option の末尾）に挿入
      let insertAt = lineIdx + 1;
      while (insertAt < _state.parsed.length && _state.parsed[insertAt].type === 'choice_option') {
        insertAt++;
      }
      _callbacks.onInsertLine && _callbacks.onInsertLine(insertAt, 'choice_option_in_block');
    });
    row.appendChild(head);
    return row;
  }

  function renderTextRow(row, line, speakerLabel, speakerCls) {
    row.classList.add('text');
    const header = document.createElement('div');
    header.className = 'line-header';
    header.innerHTML = `
      <span class="speaker-tag ${speakerCls}">${escapeHtml(speakerLabel)}</span>
      <span class="line-key">${escapeHtml(line.key || '(raw text)')}</span>
    `;
    row.appendChild(header);

    const body = document.createElement('div');
    body.className = 'line-body';
    body.appendChild(makeTextField('JA', 'ja', line));
    body.appendChild(makeTextField('EN', 'en', line));
    row.appendChild(body);
    return row;
  }

  function renderDialogueRow(row, line) {
    row.classList.add('text', 'dialogue-row');
    const header = document.createElement('div');
    header.className = 'line-header';

    // キャラセレクタ
    const speakerSelect = document.createElement('select');
    speakerSelect.className = 'speaker-select';
    const chars = _state.chars && _state.chars.length ? _state.chars : ['player'];
    const allChars = [...new Set(['player', ...chars])];
    if (line.char && !allChars.includes(line.char)) allChars.unshift(line.char);
    for (const c of allChars) {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      if (c === line.char) opt.selected = true;
      speakerSelect.appendChild(opt);
    }
    speakerSelect.addEventListener('change', () => {
      line.char = speakerSelect.value;
      line.raw = window.ScenarioIO.makeLine('dialogue', {
        char: line.char, key: line.key, text: line.text,
      }).raw;
      const idx = Number(row.dataset.lineIdx);
      markLineDirty(idx);
      _callbacks.onCommandChange && _callbacks.onCommandChange(idx, line.raw);
    });

    const speakerWrap = document.createElement('span');
    speakerWrap.className = 'speaker-tag-wrap';
    speakerWrap.appendChild(speakerSelect);
    header.appendChild(speakerWrap);

    const keyEl = document.createElement('span');
    keyEl.className = 'line-key';
    keyEl.textContent = line.key || '(raw text)';
    header.appendChild(keyEl);

    row.appendChild(header);

    const body = document.createElement('div');
    body.className = 'line-body';
    body.appendChild(makeTextField('JA', 'ja', line));
    body.appendChild(makeTextField('EN', 'en', line));
    row.appendChild(body);
    return row;
  }

  function renderChoiceOptionRow(row, line) {
    row.classList.add('text', 'choice-option-row');
    const header = document.createElement('div');
    header.className = 'line-header';
    header.innerHTML = `
      <span class="speaker-tag choice">CHOICE</span>
      <span class="line-key">${escapeHtml(line.key || '(raw text)')}</span>
    `;
    row.appendChild(header);

    const meta = document.createElement('div');
    meta.className = 'choice-meta';

    // 分岐先プルダウン
    const targetWrap = document.createElement('div');
    targetWrap.className = 'choice-meta-field';
    targetWrap.innerHTML = '<label>分岐先</label>';
    const targetSel = document.createElement('select');
    const allLabels = ['', ...(_state.allLabels || [])];
    if (line.target && !allLabels.includes(line.target)) allLabels.unshift(line.target);
    for (const lbl of allLabels) {
      const opt = document.createElement('option');
      opt.value = lbl;
      opt.textContent = lbl || '— 未選択 —';
      if (lbl === (line.target || '')) opt.selected = true;
      targetSel.appendChild(opt);
    }
    targetSel.addEventListener('change', () => {
      line.target = targetSel.value;
      line.raw = window.ScenarioIO.rebuildChoiceOptionRaw(line);
      const idx = Number(row.dataset.lineIdx);
      markLineDirty(idx);
      _callbacks.onCommandChange && _callbacks.onCommandChange(idx, line.raw);
    });
    targetWrap.appendChild(targetSel);
    meta.appendChild(targetWrap);

    // 修飾子テキスト
    const modWrap = document.createElement('div');
    modWrap.className = 'choice-meta-field';
    modWrap.innerHTML = '<label>修飾子 (例: sakura_favor+5,kotoha_favor-2)</label>';
    const modInput = document.createElement('input');
    modInput.type = 'text';
    modInput.value = (line.modifiers || []).join(',');
    modInput.placeholder = '空でOK';
    modInput.addEventListener('input', () => {
      line.modifiers = modInput.value.split(',').map(s => s.trim()).filter(Boolean);
      line.raw = window.ScenarioIO.rebuildChoiceOptionRaw(line);
      const idx = Number(row.dataset.lineIdx);
      markLineDirty(idx);
      _callbacks.onCommandChange && _callbacks.onCommandChange(idx, line.raw);
    });
    modWrap.appendChild(modInput);
    meta.appendChild(modWrap);

    row.appendChild(meta);

    const body = document.createElement('div');
    body.className = 'line-body';
    body.appendChild(makeTextField('JA', 'ja', line));
    body.appendChild(makeTextField('EN', 'en', line));
    row.appendChild(body);
    return row;
  }

  function makeTextField(label, lang, line) {
    const field = document.createElement('div');
    field.className = 'text-field';
    if (line.key) field.dataset.keyfield = `${line.key}::${lang}`;

    const lbl = document.createElement('label');
    lbl.textContent = label;
    field.appendChild(lbl);

    const ta = document.createElement('textarea');
    ta.rows = 1;
    if (line.key) {
      const val = _state.locales?.[lang]?.[line.key];
      if (val == null) {
        ta.classList.add('missing');
        ta.placeholder = '(未翻訳)';
      } else {
        ta.value = val;
      }
      ta.addEventListener('input', () => {
        ta.classList.remove('missing');
        if (_callbacks.onTextChange) _callbacks.onTextChange(line.key, lang, ta.value);
        markTextDirty(line.key, lang);
      });
    } else {
      ta.value = lang === 'ja' ? (line.text ?? '') : '';
      ta.disabled = true;
      ta.placeholder = lang === 'en' ? '(no key)' : '';
    }
    ta.addEventListener('focus', () => {
      const row = ta.closest('.line-row');
      if (row && row.dataset.lineIdx) _selectLine(Number(row.dataset.lineIdx));
    });
    autoGrow(ta);
    ta.addEventListener('input', () => autoGrow(ta));
    field.appendChild(ta);
    return field;
  }

  function _selectLine(lineIdx) {
    _state.selectedLineIdx = lineIdx;
    _container.querySelectorAll('.line-row.selected').forEach(el => el.classList.remove('selected'));
    const row = _container.querySelector(`[data-line-idx="${lineIdx}"]`);
    if (row) row.classList.add('selected');
    if (_callbacks.onLineSelect) _callbacks.onLineSelect(lineIdx);
  }

  function autoGrow(ta) {
    ta.style.height = 'auto';
    ta.style.height = Math.max(32, ta.scrollHeight) + 'px';
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  function cssEscape(s) {
    return s.replace(/[":.\\]/g, c => '\\' + c);
  }

  return {
    init, setLocales, setAllLabels, setCharacters,
    showLabel, markTextDirty, markLineDirty, clearDirty,
    expandCommandAt,
  };
})();
