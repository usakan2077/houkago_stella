/* ===================================================================
   preview.js — 右ペイン: シーンの静止画プレビュー
   ====================================================================
   選択行までのコマンドを順に走査して、現在の見た目状態を構築:
     - BG (画像 or グラデーション)
     - 表示中キャラ (位置・表情・衣装)
     - 表示中スチル
     - 現在のBGM/SE/ウィンドウ色 (テキスト表示)
   セリフ枠は選択行の発話者+テキストを表示。
   =================================================================== */

window.EditorPreview = (() => {

  let _container;
  let _backgroundsConfig = {};   // VN_CONFIG.backgrounds のフォールバック用
  let _assets = { bg: [], stills: [], chars: {} };

  // 単一の audio 要素で BGM / SE を再生（タイプごとに1つ）
  const _audio = {
    bgm: { el: null, current: null },
    se:  { el: null, current: null },
  };

  function _ensureAudio(kind) {
    if (_audio[kind].el) return _audio[kind].el;
    const el = new Audio();
    el.preload = 'none';
    el.volume = 0.5;
    if (kind === 'bgm') el.loop = true;
    _audio[kind].el = el;
    return el;
  }

  function _playAudio(kind, file) {
    if (!file) return;
    const el = _ensureAudio(kind);
    const dir = kind === 'bgm' ? 'bgm' : 'se';
    const url = `../assets/audio/${dir}/${file}`;
    if (_audio[kind].current !== url) {
      el.src = url;
      _audio[kind].current = url;
    } else {
      el.currentTime = 0;
    }
    el.play().catch(err => console.warn('[preview] play failed:', url, err));
    _updateAudioBtn(kind, true);
  }

  function _stopAudio(kind) {
    const el = _audio[kind].el;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    _updateAudioBtn(kind, false);
  }

  function _updateAudioBtn(kind, playing) {
    const btn = document.querySelector(`[data-audio-play="${kind}"]`);
    if (btn) btn.classList.toggle('playing', !!playing);
  }

  function stopAllAudio() {
    _stopAudio('bgm');
    _stopAudio('se');
  }

  function init(containerEl) {
    _container = containerEl;
    renderShell();
  }

  function setAssets(assets) { _assets = assets; }
  function setBackgroundsConfig(bgConfig) { _backgroundsConfig = bgConfig || {}; }

  function renderShell() {
    _container.innerHTML = `
      <div class="preview-stage" id="preview-stage">
        <div class="preview-bg" id="preview-bg"></div>
        <div class="preview-still" id="preview-still"></div>
        <div class="preview-chars" id="preview-chars"></div>
        <div class="preview-dialogue" id="preview-dialogue">
          <div class="preview-speaker" id="preview-speaker"></div>
          <div class="preview-text" id="preview-text"></div>
        </div>
      </div>
      <div class="preview-status" id="preview-status">
        <div class="status-row"><span class="status-label">BG</span><span id="status-bg">—</span></div>
        <div class="status-row">
          <span class="status-label">BGM</span>
          <span id="status-bgm">—</span>
          <button class="audio-btn" data-audio-play="bgm" title="再生">▶</button>
          <button class="audio-btn" data-audio-stop="bgm" title="停止">■</button>
        </div>
        <div class="status-row">
          <span class="status-label">SE</span>
          <span id="status-se">—</span>
          <button class="audio-btn" data-audio-play="se" title="再生">▶</button>
          <button class="audio-btn" data-audio-stop="se" title="停止">■</button>
        </div>
        <div class="status-row"><span class="status-label">Window</span><span id="status-window">—</span></div>
      </div>
    `;
    // 再生・停止ハンドラ
    _container.querySelectorAll('[data-audio-play]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const kind = btn.dataset.audioPlay;
        const file = _currentFor(kind);
        if (file) _playAudio(kind, file);
      });
    });
    _container.querySelectorAll('[data-audio-stop]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        _stopAudio(btn.dataset.audioStop);
      });
    });
  }

  // 現在のステータスから kind 別の再生対象ファイルを取得
  let _statusFiles = { bgm: null, se: null };
  function _currentFor(kind) { return _statusFiles[kind]; }

  function showPlaceholder() {
    if (!_container) return;
    renderShell();
    document.getElementById('preview-text').textContent = '(ラベルを選択してください)';
  }

  /**
   * 状態構築はファイル先頭(index 0)から selectedIdx まで走査する。
   * （前のラベルで設定された BG / BGM / 立ち絵を引き継ぐため）
   *   labelRange は API 互換のため引数に残すが、終了位置の上限としてのみ使用。
   */
  function renderAt(parsed, labelRange, selectedIdx, locales, lang) {
    if (!_container) return;
    if (!parsed) { showPlaceholder(); return; }

    const state = {
      bg: null,
      bgm: null,
      se: null,
      windowColor: null,
      chars: {},   // pos -> { char, expr, costume }
      still: null,
      speaker: null,
      textKey: null,
      textRaw: null,
    };

    // ファイル先頭 → selectedIdx までを順に走査（ラベル跨ぎでも状態を継承）
    const stopAt = Math.max(0, Math.min(selectedIdx, parsed.length - 1));
    for (let i = 0; i <= stopAt; i++) {
      const line = parsed[i];
      applyLine(state, line);
    }

    // テキストの解決
    const text = resolveText(state, locales, lang);
    paint(state, text, lang);
  }

  function applyLine(state, line) {
    if (!line) return;
    switch (line.type) {
      case 'command':
        applyCommand(state, line);
        break;
      case 'narration':
        state.speaker = null;
        state.textKey = line.key;
        state.textRaw = line.text;
        break;
      case 'dialogue':
        state.speaker = line.char;
        state.textKey = line.key;
        state.textRaw = line.text;
        break;
      case 'choice_option':
        state.speaker = '(choice)';
        state.textKey = line.key;
        state.textRaw = line.text;
        break;
    }
  }

  function applyCommand(state, line) {
    const c = line.cmd;
    const a = line.args || [];
    switch (c) {
      case 'scene':
        state.bg = a[0] || null;
        break;
      case 'bgm':
        if (!a[0] || a[0] === 'stop') state.bgm = null;
        else state.bgm = a[0];
        break;
      case 'se':
        if (!a[0] || a[0] === 'stop') state.se = null;
        else state.se = a[0];
        break;
      case 'show': {
        const char = a[0], pos = a[1] || 'center', expr = a[2] || 'normal';
        if (char) state.chars[pos] = { char, expr };
        break;
      }
      case 'hide': {
        const target = a[0];
        if (!target) break;
        // pos 名なら直接削除、キャラ名ならその char を持つ pos を探して削除
        if (['left', 'center', 'right'].includes(target)) {
          delete state.chars[target];
        } else {
          for (const pos of Object.keys(state.chars)) {
            if (state.chars[pos].char === target) delete state.chars[pos];
          }
        }
        break;
      }
      case 'hide_all':
        state.chars = {};
        break;
      case 'expr': {
        const target = a[0], expr = a[1] || 'normal';
        for (const pos of Object.keys(state.chars)) {
          if (state.chars[pos].char === target) state.chars[pos].expr = expr;
        }
        break;
      }
      case 'move': {
        const target = a[0], newPos = a[1];
        if (!target || !newPos) break;
        for (const pos of Object.keys(state.chars)) {
          if (state.chars[pos].char === target) {
            const c = state.chars[pos];
            delete state.chars[pos];
            state.chars[newPos] = c;
          }
        }
        break;
      }
      case 'still':
        state.still = a[0] || null;
        break;
      case 'still_hide':
        state.still = null;
        break;
      case 'window_color':
        state.windowColor = a[0] || null;
        break;
    }
  }

  function resolveText(state, locales, lang) {
    if (state.textKey) {
      const fromLocale = locales?.[lang]?.[state.textKey];
      if (fromLocale != null) return fromLocale;
      // フォールバック: 反対言語
      const other = lang === 'ja' ? 'en' : 'ja';
      const fb = locales?.[other]?.[state.textKey];
      if (fb != null) return fb + '  (※未翻訳)';
      return '(未翻訳: ' + state.textKey + ')';
    }
    return state.textRaw || '';
  }

  function paint(state, text, lang) {
    // BG
    const bgEl = document.getElementById('preview-bg');
    if (bgEl) {
      if (state.bg && _assets.bg.includes(state.bg)) {
        bgEl.style.background = '';
        bgEl.style.backgroundImage = `url(../assets/images/bg/${state.bg}.webp)`;
      } else if (state.bg && _backgroundsConfig[state.bg]) {
        bgEl.style.backgroundImage = '';
        bgEl.style.background = _backgroundsConfig[state.bg];
      } else {
        bgEl.style.background = '#1a1a2e';
        bgEl.style.backgroundImage = '';
      }
    }

    // Still
    const stillEl = document.getElementById('preview-still');
    if (stillEl) {
      if (state.still && _assets.stills.includes(state.still)) {
        stillEl.style.backgroundImage = `url(../assets/images/stills/${state.still}.webp)`;
        stillEl.classList.add('visible');
      } else {
        stillEl.style.backgroundImage = '';
        stillEl.classList.remove('visible');
      }
    }

    // Chars
    const charsEl = document.getElementById('preview-chars');
    if (charsEl) {
      charsEl.innerHTML = '';
      const positions = ['left', 'center', 'right'];
      for (const pos of positions) {
        const c = state.chars[pos];
        if (!c) continue;
        const img = document.createElement('div');
        img.className = `preview-char preview-char-${pos}`;
        const exprs = _assets.chars?.[c.char];
        if (exprs && exprs.includes(c.expr)) {
          img.style.backgroundImage = `url(../assets/images/chars/${c.char}/${c.expr}.png)`;
        } else {
          img.classList.add('preview-char-missing');
          img.textContent = `${c.char}/${c.expr}`;
        }
        charsEl.appendChild(img);
      }
    }

    // Dialogue
    const speakerEl = document.getElementById('preview-speaker');
    const textEl = document.getElementById('preview-text');
    if (speakerEl) speakerEl.textContent = state.speaker ? state.speaker : '';
    if (textEl) textEl.textContent = text || '';

    // Status
    setTxt('status-bg', state.bg || '—');
    setTxt('status-bgm', state.bgm || '—');
    setTxt('status-se', state.se || '—');
    setTxt('status-window', state.windowColor || '—');

    // 再生対象を更新（無効ならボタンを disabled に）
    _statusFiles.bgm = state.bgm;
    _statusFiles.se = state.se;
    _container.querySelectorAll('[data-audio-play="bgm"]').forEach(b => b.disabled = !state.bgm);
    _container.querySelectorAll('[data-audio-play="se"]').forEach(b => b.disabled = !state.se);
  }

  function setTxt(id, t) {
    const el = document.getElementById(id);
    if (el) el.textContent = t;
  }

  return { init, setAssets, setBackgroundsConfig, renderAt, showPlaceholder, stopAllAudio };
})();
