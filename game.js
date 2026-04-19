/**
 * game.js - ビジュアルノベルエンジン
 * 放課後のステラ
 */

class VNEngine {

  constructor() {
    this._debug      = VN_CONFIG.settings?.debug || false;
    this.parser      = new ScriptParser();
    this.labels      = {};           // { labelName: [cmd, ...] }
    this.currentLabel= 'start';
    this.currentIndex= 0;
    this._isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    this._longPressTimer = null;
    this._longPressTriggered = false;

    // 入力待ち / モード
    this.waitingForInput = false;
    this.skipMode        = false;
    this.autoMode        = false;

    // タイマー
    this.typewriterTimer = null;
    this.autoTimer          = null;
    this.skipTimer          = null;
    this._waitTimer         = null;   // @wait コマンドの setTimeout 参照
    this._stillHideWaitTimer = null;  // @still_hide の最低表示時間待機タイマー
    this._stillLockUntil    = 0;      // スチル表示後の最低表示ロック解除時刻

    // 現在表示中のテキスト
    this.currentText = '';

    // テキストログ
    this.textLog = [];

    // ゲームフラグ
    this.flags = {};

    // BGM
    this.bgmAudio   = null;
    this.currentBGM = '';

    // SE（再生中のAudioを追跡して停止できるようにする）
    this.seAudios = [];

    // 現在の背景キー
    this.currentBG = '';

    // 現在表示中のスチル
    this.currentStill = null;
    this._hideStillTimer = null;
    this._creditsAnimEnd = null;
    this._creditsTimers = [];
    this._creditsSession = null;
    this._creditsMemoryIndex = 0;

    // UI非表示モード
    this._uiHidden = false;

    // Canvasエフェクトレイヤー (ゲーム中)
    this.fx = new EffectsCanvas('canvas-effects');

    // トランジションCanvas
    this.tx = new TransitionCanvas('transition-canvas');

    // タイトル画面Canvasエフェクト (星瞬き・雲流れ)
    this.titleFx = new TitleEffectsCanvas();

    // キャラ状態: { left/center/right: { charKey, expr } | null }
    this.charState = { left: null, center: null, right: null };

    // 閲覧済みスチル (CG ギャラリー用)
    this.seenStills = new Set(
      JSON.parse(localStorage.getItem('vn_seen_stills') || '[]')
    );

    // オート速度設定の復元
    const savedDelay = localStorage.getItem('vn_auto_delay');
    if (savedDelay) VN_CONFIG.settings.autoDelay = parseInt(savedDelay, 10);

    // 文字表示速度の復元
    const savedTypeSpeed = localStorage.getItem('vn_type_speed');
    if (savedTypeSpeed !== null) VN_CONFIG.settings.typeSpeed = parseInt(savedTypeSpeed, 10);

    // BGM/SE音量の復元
    const savedBgm = localStorage.getItem('vn_bgm_volume');
    if (savedBgm !== null) VN_CONFIG.settings.bgmVolume = parseFloat(savedBgm);
    const savedSe = localStorage.getItem('vn_se_volume');
    if (savedSe !== null) VN_CONFIG.settings.seVolume = parseFloat(savedSe);

    // 文字サイズの復元
    const savedFontSize = localStorage.getItem('vn_font_size');
    if (savedFontSize) document.documentElement.style.setProperty('--vn-font-size', savedFontSize + 'px');

    // ウィンドウカラーパレットの復元
    const savedPalette = localStorage.getItem('vn_window_palette');
    if (savedPalette) this._applyWindowPalette(savedPalette);

    this._init();
  }

  // ============================================================
  //  初期化
  // ============================================================
  async _init() {
    this._bindEvents();
    this._resizeGame();
    this._initCursor();
    if (VN_CONFIG.settings.debug) this._initDebugPanel();
    this._tryLockLandscape();
    window.addEventListener('resize', () => this._resizeGame());
    window.addEventListener('orientationchange', () => setTimeout(() => this._resizeGame(), 300));
    if (window.visualViewport) window.visualViewport.addEventListener('resize', () => this._resizeGame());
    await this._loadScenarios();
    await this._preloadAssets();
    this._showTitleScreen();
    this._scheduleShootingStars();
  }

  // ============================================================
  //  アセットプリロード
  // ============================================================
  async _preloadAssets() {
    const bar    = document.getElementById('loading-bar-fill');
    const pctEl  = document.getElementById('loading-percent');
    const screen = document.getElementById('loading-screen');

    // 拡張子の優先順位: webp > png > jpg > jpeg（ファイルサイズ・品質で優先）
    const exts = ['.webp', '.png', '.jpg', '.jpeg'];
    const tasks = [];

    // 解決済み拡張子をキャッシュ（BG・Still共通ヘルパー）
    const makeResolver = (map, basePath) => (key) => new Promise(resolve => {
      let i = 0;
      const tryNext = () => {
        if (i >= exts.length) { resolve(); return; }
        const ext = exts[i++];
        const img = new Image();
        img.onload  = () => { map[key] = ext; resolve(); };
        img.onerror = tryNext;
        img.src = `${basePath}${key}${ext}`;
      };
      tryNext();
    });

    // 背景
    this._resolvedBGExt = {};
    const tryBG = makeResolver(this._resolvedBGExt, 'assets/images/bg/');
    for (const key of Object.keys(VN_CONFIG.backgrounds)) {
      tasks.push(tryBG(key));
    }

    // キャラクター立ち絵: すべて PNG なのでプリロードのみ（拡張子解決不要）
    // ImageオブジェクトをGC対象にしないよう _preloadedCharImgs に保持する
    this._preloadedCharImgs = [];
    for (const [charKey, charData] of Object.entries(VN_CONFIG.characters)) {
      for (const expr of (charData.expressions || [])) {
        tasks.push(new Promise(resolve => {
          const img = new Image();
          img.onload = img.onerror = resolve;
          img.src = `assets/images/chars/${charKey}/${expr}.png`;
          this._preloadedCharImgs.push(img);
        }));
      }
    }

    // スチル（CG）: 拡張子を解決して記録
    this._resolvedStillExt = {};
    const tryStill = makeResolver(this._resolvedStillExt, 'assets/images/stills/');
    for (const cg of (VN_CONFIG.cgList || [])) {
      tasks.push(tryStill(cg.key));
    }

    // 進捗トラッキング
    tasks.push(document.fonts ? document.fonts.ready : Promise.resolve());

    const total = tasks.length;
    let done = 0;
    const updateBar = () => {
      done++;
      const pct = Math.min(100, Math.round(done / total * 100));
      if (bar)   bar.style.width    = `${pct}%`;
      if (pctEl) pctEl.textContent  = `${pct}%`;
    };

    // フォント読み込み完了を待つ（FOUT防止）

    // ロード完了 と OK クリック を並行で待つ
    const loadDone = Promise.all(tasks.map(t => t.then(updateBar)));
    const okBtn    = document.getElementById('btn-loading-ok');
    const okDone   = new Promise(resolve => {
      if (okBtn) okBtn.addEventListener('click', resolve, { once: true });
      else resolve();
    });

    await Promise.all([loadDone, okDone]);

    // ローディング画面をフェードアウトして非表示
    if (screen) {
      screen.style.transition = 'opacity 0.6s ease';
      screen.style.opacity = '0';
      await new Promise(r => setTimeout(r, 600));
      screen.classList.add('hidden');
      screen.style.opacity = '';
      screen.style.transition = '';
    }
  }

  /** スマホ横向きロック（可能な場合）*/
  _tryLockLandscape() {
    // Screen Orientation API でロックを試みる（Android Chrome + fullscreen 時に有効）
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('landscape').catch(() => {
        // ロック不可（iOS等）の場合は CSS の @media portrait オーバーレイで対応
      });
    }
  }

  /** ゲームコンテナをウィンドウサイズに合わせてスケール */
  _resizeGame() {
    const container = document.getElementById('game-container');
    const vp = window.visualViewport;
    const W  = vp ? vp.width  : window.innerWidth;
    const H  = vp ? vp.height : window.innerHeight;
    const scaleX = W / 1280;
    const scaleY = H / 720;
    const scale = Math.min(scaleX, scaleY);
    container.style.transform       = `translate(-50%, -50%) scale(${scale})`;
    container.style.transformOrigin = 'center center';
  }

  /** シナリオ .md ファイルを順番に読み込む */
  async _loadScenarios() {
    for (const file of VN_CONFIG.scenarioFiles) {
      try {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text   = await res.text();
        const parsed = this.parser.parse(text);
        Object.assign(this.labels, parsed);
        if (this._debug) console.log(`[Engine] Loaded: ${file}`, Object.keys(parsed));
      } catch (e) {
        if (this._debug) console.error(`[Engine] Failed to load ${file}:`, e);
        this._showLoadError(file);
      }
    }
  }

  _showLoadError(file) {
    const el = document.createElement('div');
    el.style.cssText = [
      'position:fixed;top:0;left:0;right:0;',
      'background:#7a0020;color:#fff;padding:12px;',
      'text-align:center;z-index:9999;font-size:14px;',
    ].join('');
    el.textContent =
      `スクリプト読み込みエラー: ${file} ` +
      `— start.bat でサーバーを起動してください。`;
    document.body.appendChild(el);
  }

  // ============================================================
  //  イベントバインド
  // ============================================================
  _bindEvents() {
    const on = (id, ev, fn) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener(ev, fn);
    };

    // タイトル
    on('btn-newgame',  'click', () => this._startNewGame());
    on('btn-continue', 'click', () => this._openSaveLoad('load'));
    on('btn-gallery',  'click', () => this._openGallery());
    if (VN_CONFIG.settings.debug) {
      on('btn-debug', 'click', () => this._openDebugMenu());
    } else {
      const dbgBtn = document.getElementById('btn-debug');
      if (dbgBtn) dbgBtn.style.display = 'none';
    }

    // ゲームメニュー
    on('btn-save',     'click', () => this._openSaveLoad('save'));
    on('btn-load',     'click', () => this._openSaveLoad('load'));
    on('btn-log',      'click', () => this._openLog());
    on('btn-skip',     'click', () => this._toggleSkip());
    on('btn-auto',     'click', () => this._toggleAuto());
    on('btn-settings', 'click', () => this._openSettings());
    on('btn-to-title', 'click', () => this._returnToTitle());

    // テキスト進行 (テキストエリアクリック)
    const textArea = document.getElementById('text-area');
    if (textArea) textArea.addEventListener('click', () => this._onAdvance());

    // ゲーム画面背景クリック (テキストボックス外)
    const gameScreen = document.getElementById('game-screen');
    if (gameScreen) {
      gameScreen.addEventListener('click', (e) => {
        if (this._longPressTriggered) return;
        // UI非表示中は再表示して終了
        if (this._uiHidden) { this._showUI(); return; }
        const ignore = '#text-area, #choices-overlay, #menu-bar, .modal, #ending-screen, #still-layer';
        if (!e.target.closest(ignore)) this._onAdvance();
      });

      // 右クリック → UI切り替え / モーダルを閉じる
      gameScreen.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const titleScreen = document.getElementById('title-screen');
        if (titleScreen && !titleScreen.classList.contains('hidden')) return;
        this._uiHidden ? this._showUI() : this._hideUI();
      });

      const cancelLongPress = () => {
        if (this._longPressTimer) {
          clearTimeout(this._longPressTimer);
          this._longPressTimer = null;
        }
      };

      gameScreen.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;

        const titleScreen = document.getElementById('title-screen');
        if (titleScreen && !titleScreen.classList.contains('hidden')) return;

        this._longPressTriggered = false;
        const touch = e.touches[0];
        this._spawnTouchParticles(touch.clientX, touch.clientY);
        cancelLongPress();
        this._longPressTimer = setTimeout(() => {
          this._longPressTriggered = true;
          this._uiHidden ? this._showUI() : this._hideUI();
        }, 300);
      }, { passive: true });

      gameScreen.addEventListener('touchend', () => {
        cancelLongPress();
        if (this._longPressTriggered) {
          setTimeout(() => { this._longPressTriggered = false; }, 350);
        }
      }, { passive: true });
      gameScreen.addEventListener('touchcancel', () => {
        cancelLongPress();
        this._longPressTriggered = false;
      }, { passive: true });
      gameScreen.addEventListener('touchmove', () => {
        cancelLongPress();
      }, { passive: true });
    }

    // キーボード
    document.addEventListener('keydown', (e) => {
      const hasModal  = document.querySelector('.modal:not(.hidden)');
      const hasChoice = !document.getElementById('choices-overlay').classList.contains('hidden');
      const hasEnding = !document.getElementById('ending-screen').classList.contains('hidden');

      // F5/F7はモーダルが出ていなければ選択肢中・エンディング中でも有効
      if (e.code === 'F5' || e.code === 'F7') {
        if (hasModal) return;
        e.preventDefault();
        if (e.code === 'F5') this._openSaveLoad('save');
        else                 this._openSaveLoad('load');
        return;
      }

      // それ以外はモーダル / 選択肢 / エンディング中は無視
      if (hasModal || hasChoice || hasEnding) return;

      switch (e.code) {
        case 'Space': case 'Enter': case 'ArrowRight':
          this._onAdvance(); break;
        case 'KeyS': this._toggleSkip(); break;
        case 'KeyA': this._toggleAuto(); break;
      }
    });

    // マウスホイール上スクロール → ログ表示
    if (gameScreen) {
      gameScreen.addEventListener('wheel', (e) => {
        if (e.deltaY >= 0) return;
        const hasModal = document.querySelector('.modal:not(.hidden)');
        if (hasModal) return;
        const titleScreen = document.getElementById('title-screen');
        if (titleScreen && !titleScreen.classList.contains('hidden')) return;
        e.preventDefault();
        this._openLog();
      }, { passive: false });
    }

    // モーダルクローズ
    on('btn-modal-close',    'click', () => document.getElementById('save-load-modal').classList.add('hidden'));
    on('btn-log-close',      'click', () => document.getElementById('log-modal').classList.add('hidden'));
    on('btn-gallery-close',  'click', () => document.getElementById('gallery-modal').classList.add('hidden'));
    on('btn-settings-close', 'click', () => document.getElementById('settings-modal').classList.add('hidden'));
    on('btn-ending-title',  'click', () => this._returnToTitle());
    on('btn-next-chapter',  'click', () => this._continueToNextChapter());
    on('btn-credits-skip',  'click', () => this._skipCredits());

    // モーダル外クリック / 右クリックで閉じる
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
      });
      modal.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        modal.classList.add('hidden');
      });
    });

    // ボタンクリック音 (選択肢ボタン含む全ボタンを一括カバー)
    document.getElementById('game-container').addEventListener('click', (e) => {
      if (e.target.closest('button') && VN_CONFIG.clickSE) {
        this._playSE(VN_CONFIG.clickSE);
      }
    });
  }

  // ============================================================
  //  タイトル / ゲーム開始
  // ============================================================
  _showTitleScreen() {
    document.getElementById('title-screen').classList.remove('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    this._startTitleBGM();
    this._playTitleLogoAnim();
    this.titleFx.start();
  }

  _playTitleLogoAnim() {
    const wrapper = document.getElementById('title-logo-wrapper');
    if (!wrapper) return;

    // アニメをリセット
    wrapper.classList.remove('logo-entering');

    // 2フレーム待って確実にリセット状態を描画してからアニメ開始
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        wrapper.classList.add('logo-entering');
      });
    });
  }

  _startTitleBGM() {
    if (!VN_CONFIG.titleBGM) return;
    this._playBGM(VN_CONFIG.titleBGM);
  }

  _startNewGame() {
    document.getElementById('title-screen').classList.add('hidden');
    this.titleFx.stop();
    this._stopBGM();
    if (VN_CONFIG.introVideo) {
      this._playIntroVideo();
    } else if (VN_CONFIG.openingLines && VN_CONFIG.openingLines.length > 0) {
      this._playOpeningMonologue();
    } else {
      this._beginGame();
    }
  }

  _playOpeningMonologue() {
    const screen = document.getElementById('opening-screen');
    const textEl  = document.getElementById('opening-text');
    const bgEl    = document.getElementById('opening-bg');
    const arrow   = document.getElementById('opening-arrow');

    // 背景: openingBG キーで参照、画像ファイルがあれば上書き
    const bgKey = VN_CONFIG.openingBG || 'title_bg';
    const gradient = VN_CONFIG.backgrounds[bgKey];
    if (gradient) bgEl.style.background = gradient;
    const resolvedExt = this._resolvedBGExt && this._resolvedBGExt[bgKey];
    if (resolvedExt) {
      bgEl.style.background         = '';
      bgEl.style.backgroundImage    = `url(assets/images/bg/${bgKey}${resolvedExt})`;
      bgEl.style.backgroundSize     = 'cover';
      bgEl.style.backgroundPosition = 'center';
    }

    // 表示初期化
    textEl.style.opacity = '0';
    textEl.innerHTML = '';
    if (arrow) arrow.style.visibility = 'hidden';
    screen.classList.remove('hidden', 'fade-out');

    // BGM
    if (VN_CONFIG.openingBGM) this._playBGM(VN_CONFIG.openingBGM);

    const lines = [...(VN_CONFIG.openingLines || [])];
    let idx      = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      screen.removeEventListener('click', onAdvance);
      document.removeEventListener('keydown', onKey);
      if (arrow) arrow.style.visibility = 'hidden';
      screen.classList.add('fade-out');
      setTimeout(() => {
        screen.classList.add('hidden');
        screen.classList.remove('fade-out');
        textEl.innerHTML = '';
        textEl.style.opacity = '0';
        this._stopBGM();
        this._beginGame();
      }, 800);
    };

    let transTimer = null;

    const showLine = () => {
      if (finished) return;
      if (idx >= lines.length) { finish(); return; }
      if (arrow) arrow.style.visibility = 'hidden';
      // 前のタイマーをキャンセルし、transitionを切って即クリア
      if (transTimer) clearTimeout(transTimer);
      textEl.style.transition = 'none';
      textEl.style.opacity = '0';
      textEl.innerHTML = '';
      // 次フレームでtransitionを戻して表示
      transTimer = setTimeout(() => {
        if (finished) return;
        textEl.innerHTML = lines[idx++];
        textEl.style.transition = 'opacity 0.45s ease';
        textEl.style.opacity = '1';
        setTimeout(() => {
          if (!finished && arrow) arrow.style.visibility = 'visible';
        }, 500);
      }, 50);
    };

    const onAdvance = () => showLine();
    const onKey = (e) => {
      if (e.code === 'Escape') finish();
      else if (e.code === 'Space' || e.code === 'Enter') showLine();
    };

    screen.addEventListener('click', onAdvance);
    document.addEventListener('keydown', onKey);

    // 最初の行は自動で表示
    setTimeout(showLine, 700);
  }

  _playIntroVideo() {
    const screen = document.getElementById('intro-video-screen');
    const video  = document.getElementById('intro-video');

    video.src = VN_CONFIG.introVideo;
    video.currentTime = 0;
    screen.classList.remove('hidden', 'fade-out');

    const finish = () => {
      video.pause();
      screen.removeEventListener('click', onSkip);
      document.removeEventListener('keydown', onKeySkip);
      screen.classList.add('fade-out');
      setTimeout(() => {
        screen.classList.add('hidden');
        screen.classList.remove('fade-out');
        if (VN_CONFIG.openingLines && VN_CONFIG.openingLines.length > 0) {
          this._playOpeningMonologue();
        } else {
          this._beginGame();
        }
      }, 800);
    };

    const onSkip = () => finish();
    const onKeySkip = (e) => {
      if (e.code === 'Space' || e.code === 'Enter' || e.code === 'Escape') finish();
    };

    video.onended = finish;
    screen.addEventListener('click', onSkip, { once: true });
    document.addEventListener('keydown', onKeySkip);

    video.play().catch(() => finish()); // 再生不可時はそのままゲームへ
  }

  _beginGame() {
    document.getElementById('game-screen').classList.remove('hidden');
    this._resetGameState();
    this._gotoLabel(VN_CONFIG.startLabel);
  }

  _setWindowColor(target) {
    const COLORS = {
      sakura: {
        textBox:  'rgba(52, 6, 24, 0.88)',
        nameBox:  'rgba(62, 8, 30, 0.92)',
        shadow:   '0 0 36px 0 rgba(255, 100, 150, 0.30) inset, 0 0 3px 1px rgba(255, 100, 150, 0.14)',
      },
      kotoha: {
        textBox:  'rgba(6, 14, 58, 0.88)',
        nameBox:  'rgba(7, 18, 70, 0.92)',
        shadow:   '0 0 36px 0 rgba(100, 150, 255, 0.30) inset, 0 0 3px 1px rgba(100, 150, 255, 0.14)',
      },
      mahiru: {
        textBox:  'rgba(4, 42, 22, 0.88)',
        nameBox:  'rgba(5, 52, 28, 0.92)',
        shadow:   '0 0 36px 0 rgba(80, 220, 140, 0.28) inset, 0 0 3px 1px rgba(80, 220, 140, 0.13)',
      },
      reset: {
        textBox:  (this._paletteReset || {}).textBox || 'rgba(8, 3, 20, 0.8)',
        nameBox:  (this._paletteReset || {}).nameBox || 'rgba(12, 4, 24, 0.8)',
        shadow:   '',
      },
    };
    const c = COLORS[target] || COLORS.reset;
    const textBox = document.getElementById('text-box');
    const nameBox = document.getElementById('char-name-box');
    if (textBox) {
      textBox.style.background = c.textBox;
      textBox.style.boxShadow  = c.shadow;
    }
    if (nameBox) nameBox.style.background = c.nameBox;
    this.windowColor = target;
  }

  _resetGameState() {
    this.flags       = {};
    this.textLog     = [];
    this.charState   = { left: null, center: null, right: null };
    this.currentBG   = '';
    this.currentText = '';
    // 前回プレイの背景をDOMからクリア（残存背景が一瞬表示されるのを防ぐ）
    const bgEl = document.getElementById('background');
    if (bgEl) {
      bgEl.style.backgroundImage = '';
      bgEl.style.background      = '';
    }
    this._stopTypewriter();
    this._clearAllChars('instant');
    this._hideStill('instant');
    this.skipMode = false;
    this.autoMode = false;
    document.getElementById('btn-skip').classList.remove('active');
    document.getElementById('btn-auto').classList.remove('active');
    document.getElementById('choices-overlay').classList.add('hidden');
    document.getElementById('credits-screen').classList.add('hidden');
    document.getElementById('ending-screen').classList.add('hidden');
    this._clearCreditsPresentation();
    document.getElementById('next-arrow').style.display = 'none';
    document.getElementById('dialog-text').textContent  = '';
    document.getElementById('char-name').textContent    = '';
    document.getElementById('char-name-box').style.display = 'none';
    // UI非表示状態を解除（_displayEnding()がセットしたインラインスタイルも全クリア）
    this._uiHidden = false;
    ['text-area', 'menu-bar'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.visibility   = '';
      el.style.opacity      = '';
      el.style.transition   = '';
      el.style.pointerEvents = '';
    });
    this._stopBGM();
    this._setWindowColor('reset');
  }

  // ============================================================
  //  シーン実行
  // ============================================================
  _gotoLabel(label) {
    if (!this.labels[label]) {
      if (this._debug) console.error(`[Engine] Label not found: "${label}"`);
      return;
    }
    this._stopAllSE();
    this._stopTypewriter(); // 全タイマー（_stillHideWaitTimer含む）をキャンセル
    if (this.currentStill) this._hideStill('instant');
    this.currentLabel = label;
    this.currentIndex = 0;
    this._executeNext();
  }

  _executeNext() {
    const cmds = this.labels[this.currentLabel];
    if (!cmds || this.currentIndex >= cmds.length) {
      // 選択肢表示中なら誤作動防止のため何もしない
      const choicesVisible = !document.getElementById('choices-overlay').classList.contains('hidden');
      if (choicesVisible) {
        if (this._debug) console.warn(`[Engine] _executeNext called at end of label "${this.currentLabel}" while choices are visible — ignoring`);
        return;
      }
      // ラベル末尾に達した → END 扱い
      if (this._debug) console.warn(`[Engine] Label "${this.currentLabel}" ran out of commands without @end/@jump — showing END`);
      this._displayEnding('END');
      return;
    }
    const cmd = cmds[this.currentIndex++];
    this._processCommand(cmd);
  }

  _processCommand(cmd) {
    switch (cmd.cmd) {

      case 'scene':
        this._changeBackground(cmd.bg, cmd.effect);
        this._executeNext();
        break;

      case 'bgm':
        if (cmd.action === 'play') { this._stopAllSE(); this._playBGM(cmd.track); }
        else this._stopBGM();
        this._executeNext();
        break;

      case 'se':
        this._playSE(cmd.file, cmd.loop);
        this._executeNext();
        break;

      case 'show':
        this._showChar(cmd.char, cmd.pos, cmd.expr, cmd.effect);
        this._executeNext();
        break;

      case 'hide':
        this._hideChar(cmd.target, cmd.effect);
        this._executeNext();
        break;

      case 'hide_all':
        this._clearAllChars(cmd.effect);
        this._executeNext();
        break;

      case 'expr':
        this._changeExpr(cmd.char, cmd.expr);
        this._executeNext();
        break;

      case 'move':
        this._moveChar(cmd.char, cmd.pos, cmd.effect);
        this._executeNext();
        break;

      case 'still':
        this._showStill(cmd.image, cmd.effect);
        this._executeNext();
        break;

      case 'still_hide': {
        const remaining = this._stillLockUntil - Date.now();
        if (remaining > 0) {
          // 最低表示時間が残っている → 解除まで待機（専用タイマーで管理）
          clearTimeout(this._stillHideWaitTimer);
          this._stillHideWaitTimer = setTimeout(() => {
            this._stillHideWaitTimer = null;
            this._hideStill(cmd.effect);
            this._executeNext();
          }, remaining);
        } else {
          this._hideStill(cmd.effect);
          this._executeNext();
        }
        break;
      }

      case 'wait':
        if (this.skipMode) {
          this._executeNext();
        } else {
          this._waitTimer = setTimeout(() => {
            this._waitTimer = null;
            this._executeNext();
          }, cmd.ms);
        }
        break;

      case 'effect':
        this.fx.setEffect(cmd.type);
        this._executeNext();
        break;

      case 'shake':
        this.fx.shake(cmd.strength, cmd.duration);
        this._executeNext();
        break;

      case 'flag':
        this.flags[cmd.name] = cmd.value;
        this._executeNext();
        break;

      case 'flag_add':
        this.flags[cmd.name] = (Number(this.flags[cmd.name]) || 0) + cmd.amount;
        this._debugUpdatePanel();
        this._executeNext();
        break;

      case 'flag_sub':
        this.flags[cmd.name] = (Number(this.flags[cmd.name]) || 0) - cmd.amount;
        this._debugUpdatePanel();
        this._executeNext();
        break;

      case 'flag_toggle':
        this.flags[cmd.name] = !this.flags[cmd.name];
        this._debugUpdatePanel();
        this._executeNext();
        break;

      case 'if': {
        const flagVal = this.flags[cmd.flag];
        const numFlag = Number(flagVal);
        const numVal  = Number(cmd.value);
        let   cond    = false;
        switch (cmd.op) {
          case '==': cond = String(flagVal) === String(cmd.value); break;
          case '!=': cond = String(flagVal) !== String(cmd.value); break;
          case '>=': cond = numFlag >= numVal; break;
          case '>':  cond = numFlag >  numVal; break;
          case '<=': cond = numFlag <= numVal; break;
          case '<':  cond = numFlag <  numVal; break;
          default:   if (this._debug) console.warn('[Engine] @if: 不明な演算子:', cmd.op);
        }
        if (cond) this._gotoLabel(cmd.to);
        else      this._executeNext();
        break;
      }

      case 'route_select': {
        // 数値フラグが最大のルートへジャンプ
        let bestLabel = cmd.fallback;
        let bestVal   = 0;
        for (const { flag, label } of cmd.routes) {
          const val = Number(this.flags[flag]) || 0;
          if (val > bestVal) { bestVal = val; bestLabel = label; }
        }
        if (this._debug) console.log(`[Engine] route_select → ${bestLabel} (best=${bestVal})`);
        this._gotoLabel(bestLabel || 'bad_end');
        break;
      }

      case 'jump':
        this._gotoLabel(cmd.to);
        break;

      case 'narrate':
        this._displayDialog(null, cmd.text, cmd.emphasis);
        break;

      case 'say':
        this._displayDialog(cmd.char, cmd.text);
        break;

      case 'choice':
        this._displayChoices(cmd.options);
        break;

      case 'credits':
        this._showCredits(cmd.bgm, cmd.profile);
        break;

      case 'window_color':
        this._setWindowColor(cmd.target);
        this._executeNext();
        break;

      case 'end':
        this._displayEnding(cmd.title, cmd.next);
        break;

      default:
        if (this._debug) console.warn('[Engine] Unknown command:', cmd);
        this._executeNext();
    }
  }

  // ============================================================
  //  背景
  // ============================================================
  _changeBackground(bgKey, effect = 'fade') {
    this._stopAllSE();
    this.currentBG = bgKey;
    const el = document.getElementById('background');

    // 背景を適用してコールバックを呼ぶ
    const applyBG = (onReady) => {
      const gradient = VN_CONFIG.backgrounds[bgKey] || '#1a1a2e';
      const resolvedExt = this._resolvedBGExt && this._resolvedBGExt[bgKey];

      if (resolvedExt) {
        // プリロード済み: 即時適用（onload待ち不要）
        el.style.background         = '';
        el.style.backgroundImage    = `url(assets/images/bg/${bgKey}${resolvedExt})`;
        el.style.backgroundSize     = 'cover';
        el.style.backgroundPosition = 'center';
        onReady();
      } else {
        // フォールバック: 拡張子を順に試す（プリロード前やconfig未登録の場合）
        const tryExts = ['.jpg', '.jpeg', '.png', '.webp'];
        const tryNext = (i) => {
          if (i >= tryExts.length) {
            el.style.backgroundImage = '';
            el.style.background      = gradient;
            onReady();
            return;
          }
          const img = new Image();
          img.onload = () => {
            if (this._resolvedBGExt) this._resolvedBGExt[bgKey] = tryExts[i];
            el.style.background         = '';
            el.style.backgroundImage    = `url(assets/images/bg/${bgKey}${tryExts[i]})`;
            el.style.backgroundSize     = 'cover';
            el.style.backgroundPosition = 'center';
            onReady();
          };
          img.onerror = () => tryNext(i + 1);
          img.src = `assets/images/bg/${bgKey}${tryExts[i]}`;
        };
        tryNext(0);
      }
    };

    if (effect === 'instant') {
      applyBG(() => {});
    } else if (effect === 'fade') {
      this.tx.diamond(1000, () => applyBG(() => {}), null);
    } else {
      applyBG(() => {});
    }
  }

  // ============================================================
  //  キャラクター管理
  // ============================================================
  _showChar(charKey, pos, expr, effect = 'fade_in') {
    const cfg = VN_CONFIG.characters[charKey];
    if (!cfg) {
      if (this._debug) console.warn(`[Engine] Unknown character: ${charKey}`);
      return;
    }
    const slot = document.getElementById(`char-${pos}`);
    if (!slot) return;

    this.charState[pos] = { charKey, expr };

    // スプライト構築
    const sprite = document.createElement('div');
    sprite.className         = 'char-sprite';
    sprite.dataset.charKey   = charKey;

    // キャラ画像はすべて PNG
    const imgEl = new Image();
    imgEl.alt = cfg.name;
    imgEl.onerror = () => {
      // PNG が見つからない場合のみプレースホルダー
      const ph = document.createElement('div');
      ph.className = 'char-placeholder';
      ph.style.background = cfg.charColor || 'rgba(150,150,200,.7)';
      ph.innerHTML = `
        <div class="char-ph-icon">♡</div>
        <div class="char-ph-name">${cfg.name}</div>
        <div class="char-ph-expr">[${expr}]</div>
      `;
      sprite.appendChild(ph);
    };
    imgEl.onload = () => sprite.appendChild(imgEl);
    imgEl.src = `assets/images/chars/${charKey}/${expr}.png`;

    slot.innerHTML = '';
    slot.appendChild(sprite);

    // エフェクトで表示
    // まずクラスをリセットして visible に
    slot.className = 'character-slot';
    void slot.offsetWidth; // reflow
    slot.classList.add('visible');

    if (effect !== 'instant') {
      const animClass = {
        fade_in:         'anim-fade-in',
        slide_in_left:   'anim-slide-in-left',
        slide_in_right:  'anim-slide-in-right',
        pop_in:          'anim-pop-in',
      }[effect] || 'anim-fade-in';
      slot.classList.add(animClass);
      setTimeout(() => slot.classList.remove(animClass),
                 VN_CONFIG.settings.charFadeTime + 100);
    }
  }

  _hideChar(target, effect = 'fade_out') {
    const positions = ['left', 'center', 'right'];
    if (positions.includes(target)) {
      this._doHideSlot(`char-${target}`, effect);
      this.charState[target] = null;
    } else {
      // charKey で検索
      for (const pos of positions) {
        const sprite = document.querySelector(`#char-${pos} .char-sprite`);
        if (sprite && sprite.dataset.charKey === target) {
          this._doHideSlot(`char-${pos}`, effect);
          this.charState[pos] = null;
          break;
        }
      }
    }
  }

  _doHideSlot(slotId, effect) {
    const slot = document.getElementById(slotId);
    if (!slot || !slot.classList.contains('visible')) return;

    if (effect === 'instant') {
      slot.innerHTML = '';
      slot.className = 'character-slot';
      return;
    }

    const animClass = {
      fade_out:          'anim-fade-out',
      slide_out_left:    'anim-slide-out-left',
      slide_out_right:   'anim-slide-out-right',
    }[effect] || 'anim-fade-out';

    slot.classList.add(animClass);
    setTimeout(() => {
      // タイムアウト発火前に別キャラが表示された場合はスキップ
      if (!slot.classList.contains(animClass)) return;
      slot.innerHTML  = '';
      slot.className  = 'character-slot';
    }, VN_CONFIG.settings.charFadeTime + 50);
  }

  _clearAllChars(effect = 'fade_out') {
    ['left', 'center', 'right'].forEach(pos => this._hideChar(pos, effect));
  }

  _changeExpr(charKey, expr) {
    for (const pos of ['left', 'center', 'right']) {
      if (this.charState[pos]?.charKey === charKey) {
        this.charState[pos].expr = expr;
        const slot   = document.getElementById(`char-${pos}`);
        const sprite = slot?.querySelector('.char-sprite');
        if (!sprite) return;

        const imgEl = new Image();
        imgEl.alt = charKey;
        imgEl.onload = () => {
          sprite.innerHTML = '';
          sprite.appendChild(imgEl);
        };
        imgEl.src = `assets/images/chars/${charKey}/${expr}.png`;
        break;
      }
    }
  }

  _moveChar(charKey, newPos, effect = 'slide') {
    let fromPos = null;
    for (const pos of ['left', 'center', 'right']) {
      if (this.charState[pos]?.charKey === charKey) { fromPos = pos; break; }
    }
    if (!fromPos) return;

    const state = { ...this.charState[fromPos] };
    const hideEffect  = effect === 'slide' ? 'fade_out' : 'instant';
    const showEffect  = effect === 'slide' ? 'fade_in'  : 'instant';
    const delay       = effect === 'slide' ? 300 : 0;

    this._hideChar(fromPos, hideEffect);
    setTimeout(() => this._showChar(charKey, newPos, state.expr, showEffect), delay);
  }

  /** キャラクターをハイライト/ディム */
  _highlightChar(activeKey) {
    ['left', 'center', 'right'].forEach(pos => {
      const slot = document.getElementById(`char-${pos}`);
      if (!slot.classList.contains('visible')) return;
      const key = this.charState[pos]?.charKey;
      slot.classList.toggle('dimmed',      key !== activeKey);
      slot.classList.toggle('highlighted', key === activeKey);
    });
  }

  _clearCharHighlights() {
    ['left', 'center', 'right'].forEach(pos => {
      document.getElementById(`char-${pos}`)
              .classList.remove('dimmed', 'highlighted');
    });
  }

  // ============================================================
  //  スチル (イベントCG)
  // ============================================================
  _showStill(imageName, effect = 'fade_in') {
    // ペンディング中の fade_out タイマーをキャンセル（race condition 対策）
    if (this._hideStillTimer) { clearTimeout(this._hideStillTimer); this._hideStillTimer = null; }
    // instant（ロード復元時など）はロック不要、それ以外は1.5秒間クリックで非表示不可
    this._stillLockUntil = effect === 'instant' ? 0 : Date.now() + 1500;
    const el = document.getElementById('still-layer');
    el.className  = '';
    el.innerHTML  = '';
    el.style.backgroundImage = '';
    el.style.opacity    = '';
    el.style.transition = '';

    const applyStill = (src) => {
      el.style.background         = '';
      el.style.backgroundImage    = `url(${src})`;
      el.style.backgroundSize     = 'contain';
      el.style.backgroundPosition = 'center';
      el.style.backgroundRepeat   = 'no-repeat';
      el.style.backgroundColor    = 'rgba(0,0,0,.85)';
      if (!this.seenStills.has(imageName)) {
        this.seenStills.add(imageName);
        localStorage.setItem('vn_seen_stills', JSON.stringify([...this.seenStills]));
      }
    };

    const resolvedExt = this._resolvedStillExt && this._resolvedStillExt[imageName];
    if (resolvedExt) {
      applyStill(`assets/images/stills/${imageName}${resolvedExt}`);
    } else {
      // フォールバック（config未登録のスチル）
      const tryExts = ['.webp', '.png', '.jpg', '.jpeg'];
      const tryImage = (i) => {
        if (i >= tryExts.length) {
          el.style.background = 'rgba(0,0,0,.85)';
          el.innerHTML = `<div class="still-placeholder">[スチル: ${imageName}]</div>`;
          return;
        }
        const img = new Image();
        img.onload  = () => {
          if (this._resolvedStillExt) this._resolvedStillExt[imageName] = tryExts[i];
          applyStill(img.src);
        };
        img.onerror = () => tryImage(i + 1);
        img.src = `assets/images/stills/${imageName}${tryExts[i]}`;
      };
      tryImage(0);
    }

    el.classList.remove('hidden');
    if (effect !== 'instant') el.classList.add(`effect-${effect}`);
    this.currentStill = imageName;
  }

  _hideStill(effect = 'fade_out') {
    this._stillLockUntil = 0;
    this.currentStill = null;
    if (this._hideStillTimer) { clearTimeout(this._hideStillTimer); this._hideStillTimer = null; }
    const el = document.getElementById('still-layer');
    if (!el) return;
    if (effect === 'fade_out') {
      el.style.transition = 'opacity .5s ease';
      el.style.opacity    = '0';
      this._hideStillTimer = setTimeout(() => {
        this._hideStillTimer = null;
        el.classList.add('hidden');
        el.style.opacity    = '';
        el.style.transition = '';
        el.innerHTML        = '';
        el.style.backgroundImage = '';
        el.style.background      = '';
      }, 500);
    } else {
      el.classList.add('hidden');
      el.innerHTML        = '';
      el.style.backgroundImage = '';
    }
  }

  // ============================================================
  //  ダイアログ表示
  // ============================================================
  _displayDialog(charKey, text, emphasis) {
    this._stopTypewriter();
    // 前行のオートタイマーが残っている場合は破棄（手動進行との二重発火を防ぐ）
    if (this.autoTimer) { clearTimeout(this.autoTimer); this.autoTimer = null; }
    this.waitingForInput = false;

    const nameBox  = document.getElementById('char-name-box');
    const nameEl   = document.getElementById('char-name');
    const textEl   = document.getElementById('dialog-text');
    const arrow    = document.getElementById('next-arrow');

    arrow.style.display = 'none';
    textEl.textContent  = '';
    textEl.classList.remove('narrate-inner', 'narrate-climax');

    const cfg = charKey ? VN_CONFIG.characters[charKey] : null;

    if (cfg && cfg.name) {
      nameEl.textContent  = cfg.name;
      nameEl.style.color  = cfg.nameColor || '#ff99bb';
      nameBox.style.setProperty('--accent-color', cfg.nameColor || '#ff99bb');
      nameBox.style.display = 'block';
      this._highlightChar(charKey);
    } else {
      nameEl.textContent    = '';
      nameBox.style.display = 'none';
      if (!charKey) this._clearCharHighlights();
    }

    // ログに追加
    this.textLog.push({ name: cfg?.name || '', nameColor: cfg?.nameColor || '', text });
    this.currentText     = text;
    this.currentEmphasis = emphasis || null;

    if (this.skipMode) {
      // スキップ中は即表示して次へ
      if (emphasis === 'inner') {
        textEl.classList.add('narrate-inner');
        textEl.innerHTML = `<em>${text}</em>`;
      } else if (emphasis === 'climax') {
        textEl.classList.add('narrate-climax');
        textEl.textContent = text;
      } else {
        textEl.textContent = text;
      }
      this.waitingForInput = true;
      arrow.style.display = 'block';
      this.skipTimer = setTimeout(() => { this.skipTimer = null; this._executeNext(); }, 50);
      return;
    }

    const onDone = () => {
      this.waitingForInput = true;
      arrow.style.display  = 'block';
      if (this.autoMode) {
        const delay = Math.max(text.length * 60, VN_CONFIG.settings.autoDelay);
        this.autoTimer = setTimeout(() => this._executeNext(), delay);
      }
    };

    if (emphasis === 'inner') {
      // 内心：<em>で包んでタイプライター
      textEl.classList.add('narrate-inner');
      textEl.innerHTML = '<em></em>';
      this._startTypewriter(textEl.querySelector('em'), text, onDone);
    } else if (emphasis === 'climax') {
      // 締め：即表示＋CSSフェードイン
      textEl.classList.add('narrate-climax');
      textEl.textContent = text;
      onDone();
    } else {
      this._startTypewriter(textEl, text, onDone);
    }
  }

  _startTypewriter(el, text, onDone) {
    let i = 0;
    const speed = VN_CONFIG.settings.typeSpeed;
    this.typewriterTimer = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i++];
      } else {
        clearInterval(this.typewriterTimer);
        this.typewriterTimer = null;
        onDone();
      }
    }, speed);
  }

  _stopTypewriter() {
    if (this.typewriterTimer) {
      clearInterval(this.typewriterTimer);
      this.typewriterTimer = null;
    }
    if (this.autoTimer) {
      clearTimeout(this.autoTimer);
      this.autoTimer = null;
    }
    if (this.skipTimer) {
      clearTimeout(this.skipTimer);
      this.skipTimer = null;
    }
    if (this._waitTimer) {
      clearTimeout(this._waitTimer);
      this._waitTimer = null;
    }
    if (this._stillHideWaitTimer) {
      clearTimeout(this._stillHideWaitTimer);
      this._stillHideWaitTimer = null;
    }
  }

  /** クリック / スペース / Enter で進む */
  _onAdvance() {
    const choicesVisible = !document.getElementById('choices-overlay')
                                   .classList.contains('hidden');
    if (choicesVisible) return;

    // スキップ中のクリックでスキップ解除
    if (this.skipMode) {
      this._toggleSkip();
      return;
    }

    // スチル最低表示時間中はクリックを無視
    if (this._stillLockUntil > Date.now()) return;

    if (this.typewriterTimer) {
      // タイプライター実行中 → 全文即表示（emphasisに応じて正しいDOM構造を使う）
      this._stopTypewriter();
      const textEl = document.getElementById('dialog-text');
      if (this.currentEmphasis === 'inner') {
        // <em>が消えないようinnerHTMLで設定
        textEl.classList.add('narrate-inner');
        textEl.innerHTML = `<em>${this.currentText}</em>`;
      } else {
        textEl.textContent = this.currentText;
      }
      this.waitingForInput = true;
      document.getElementById('next-arrow').style.display = 'block';
      if (this.autoMode) {
        const delay = Math.max(this.currentText.length * 60, VN_CONFIG.settings.autoDelay);
        this.autoTimer = setTimeout(() => this._executeNext(), delay);
      }
      return;
    }

    if (this.waitingForInput) this._executeNext();
  }

  // ============================================================
  //  選択肢
  // ============================================================
  _displayChoices(options) {
    this._stopTypewriter();
    this.waitingForInput = false;
    document.getElementById('next-arrow').style.display = 'none';

    // スキップ・オートを停止（選択肢は必ず手動で選ばせる）
    if (this.skipMode) {
      this.skipMode = false;
      document.getElementById('btn-skip').classList.remove('active');
    }
    if (this.autoMode) {
      this.autoMode = false;
      document.getElementById('btn-auto').classList.remove('active');
    }

    const overlay   = document.getElementById('choices-overlay');
    const container = document.getElementById('choices-container');
    container.innerHTML = '';

    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className   = 'choice-btn';
      btn.textContent = opt.text;
      btn.addEventListener('click', () => {
        overlay.classList.add('hidden');
        // フラグ修飾子を適用 ([flag+10] など)
        if (opt.flags && opt.flags.length > 0) {
          for (const { name, op, amount } of opt.flags) {
            const cur = Number(this.flags[name]) || 0;
            this.flags[name] = op === '+' ? cur + amount : cur - amount;
          }
          this._debugUpdatePanel();
        }
        this._gotoLabel(opt.next);
      });
      container.appendChild(btn);
    });

    overlay.classList.remove('hidden');
  }

  // ============================================================
  //  スキップ / オート
  // ============================================================
  _toggleSkip() {
    this.skipMode = !this.skipMode;
    document.getElementById('btn-skip').classList.toggle('active', this.skipMode);
    if (this.skipMode) {
      if (this.autoMode) this._toggleAuto();
      if (this.typewriterTimer) this._onAdvance();
      else if (this.waitingForInput) this._executeNext();
    }
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  _toggleAuto() {
    this.autoMode = !this.autoMode;
    document.getElementById('btn-auto').classList.toggle('active', this.autoMode);
    if (this.autoMode) {
      if (this.skipMode) this._toggleSkip();
      if (this.waitingForInput) {
        this.autoTimer = setTimeout(
          () => this._executeNext(), VN_CONFIG.settings.autoDelay
        );
      }
    } else {
      // autoTimer のみキャンセル（typewriterTimer は継続させる）
      // typewriter中にオートを切っても文字表示が止まらないようにする
      if (this.autoTimer) { clearTimeout(this.autoTimer); this.autoTimer = null; }
    }
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  // ============================================================
  //  セーブ / ロード
  // ============================================================
  _openSaveLoad(mode) {
    // スキップ中はモーダルを開く前に停止
    if (this.skipMode) {
      this.skipMode = false;
      document.getElementById('btn-skip').classList.remove('active');
    }
    document.getElementById('modal-title').textContent = mode === 'save' ? 'SAVE' : 'LOAD';
    const slotsEl = document.getElementById('save-slots');
    slotsEl.innerHTML = '';

    for (let i = 1; i <= 10; i++) {
      const raw  = localStorage.getItem(`vn_save_${i}`);
      const slot = document.createElement('div');
      slot.className = 'save-slot';

      if (raw) {
        const d = JSON.parse(raw);
        slot.innerHTML = `
          <span class="slot-num">SLOT ${i}</span>
          <div class="slot-info">
            <div class="slot-label">${d.label || '?'}</div>
            <div class="slot-preview">${d.preview || ''}</div>
          </div>
          <span class="slot-date">${d.date || ''}</span>
        `;
        slot.addEventListener('click', () => {
          document.getElementById('save-load-modal').classList.add('hidden');
          if (mode === 'save') {
            this._showConfirm(`SLOT ${i} に上書きしますか？`, () => this._saveToSlot(i));
          } else {
            this._loadFromSlot(i);
          }
        });
      } else {
        slot.innerHTML = `
          <span class="slot-num">SLOT ${i}</span>
          <span class="slot-empty">--- Empty ---</span>
        `;
        if (mode === 'save') {
          slot.addEventListener('click', () => {
            document.getElementById('save-load-modal').classList.add('hidden');
            this._saveToSlot(i);
          });
        }
      }
      slotsEl.appendChild(slot);
    }

    document.getElementById('save-load-modal').classList.remove('hidden');
  }

  _saveToSlot(slot) {
    const preview = this.currentText.slice(0, 28) +
                    (this.currentText.length > 28 ? '…' : '');
    const data = {
      label:      this.currentLabel,
      index:      this.currentIndex - 1, // 現在実行中コマンドの index
      flags:      { ...this.flags },
      charState:  JSON.parse(JSON.stringify(this.charState)),
      currentBG:    this.currentBG,
      currentBGM:   this.currentBGM,
      currentStill: this.currentStill || null,
      windowColor:  this.windowColor || 'reset',
      preview,
      date: new Date().toLocaleString('ja-JP', {
        month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
      }),
    };
    localStorage.setItem(`vn_save_${slot}`, JSON.stringify(data));
    this._showToast(`SLOT ${slot}  にセーブしました`);
  }

  _loadFromSlot(slot) {
    const raw = localStorage.getItem(`vn_save_${slot}`);
    if (!raw) return;
    const d = JSON.parse(raw);

    this._resetGameState();
    document.getElementById('title-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');

    // 状態復元
    this.flags = d.flags || {};
    if (d.currentBG) this._changeBackground(d.currentBG, 'instant');
    if (d.currentBGM) this._playBGM(d.currentBGM);
    if (d.currentStill) this._showStill(d.currentStill, 'instant');
    this._setWindowColor(d.windowColor || 'reset');

    for (const [pos, state] of Object.entries(d.charState || {})) {
      if (state) this._showChar(state.charKey, pos, state.expr, 'instant');
    }

    // ラベル・インデックスを復元して再実行
    this.currentLabel = d.label;
    this.currentIndex = d.index; // executeNext がインクリメントするので -1 しない
    this._executeNext();
  }

  _showConfirm(message, onOk, onCancel) {
    const modal = document.getElementById('confirm-modal');
    document.getElementById('confirm-message').textContent = message;
    modal.classList.remove('hidden');

    const ok  = document.getElementById('btn-confirm-ok');
    const no  = document.getElementById('btn-confirm-no');

    const cleanup = () => {
      modal.classList.add('hidden');
      ok.replaceWith(ok.cloneNode(true));
      no.replaceWith(no.cloneNode(true));
    };

    // cloneNode後の要素を再取得
    document.getElementById('btn-confirm-ok').addEventListener('click', () => {
      cleanup(); if (onOk) onOk();
    }, { once: true });
    document.getElementById('btn-confirm-no').addEventListener('click', () => {
      cleanup(); if (onCancel) onCancel();
    }, { once: true });
  }

  _showToast(msg) {
    const el = document.createElement('div');
    el.textContent  = msg;
    el.style.cssText = [
      'position:fixed;top:50%;left:50%;',
      'transform:translate(-50%,-50%);',
      'background:rgba(0,0,0,.85);',
      'color:#ffaac8;padding:16px 40px;',
      'border:1px solid rgba(220,140,190,.5);',
      'z-index:9999;pointer-events:none;',
      'font-size:15px;letter-spacing:.2em;',
      'transition:opacity 1s;',
    ].join('');
    document.body.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; }, 1200);
    setTimeout(() => { el.remove(); }, 2200);
  }

  // ============================================================
  //  UI 非表示モード（右クリック）
  // ============================================================
  _hideUI() {
    this._uiHidden = true;
    const ids = ['text-area', 'menu-bar', 'choices-overlay'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.visibility = 'hidden';
    });
  }

  _showUI() {
    this._uiHidden = false;
    const ids = ['text-area', 'menu-bar', 'choices-overlay'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.visibility = '';
    });
  }

  // ============================================================
  //  テキストログ
  // ============================================================
  _openLog() {
    const content = document.getElementById('log-content');
    content.innerHTML = this.textLog.slice(-40).map(e => `
      <div class="log-entry">
        ${e.name ? `<span class="log-name" style="color:${e.nameColor || '#ff99bb'}">${e.name}</span>` : ''}
        <span>${e.text}</span>
      </div>
    `).join('');
    document.getElementById('log-modal').classList.remove('hidden');
    requestAnimationFrame(() => { content.scrollTop = content.scrollHeight; });
  }

  // ============================================================
  //  クレジットロール
  // ============================================================
  async _showCredits(bgmFile, profileKey = null) {
    this._stopTypewriter();
    this._clearAllChars('fade_out');
    this._hideStill('instant');
    this._clearCreditsPresentation();

    const screen   = document.getElementById('credits-screen');
    const roll     = document.getElementById('credits-roll');
    const profile  = this._resolveCreditsProfile(profileKey, bgmFile);
    const bgmTrack = profile.themeTrack || bgmFile || null;
    const session  = Symbol('credits');
    this._creditsSession = session;

    if (bgmTrack) this._playBGM(bgmTrack);

    // クレジット行を生成
    const lines = VN_CONFIG.credits || [];
    roll.innerHTML = lines.map(item => {
      switch (item.type) {
        case 'game-title': return `<div class="credits-game-title">${item.text}</div>`;
        case 'heading':    return `<div class="credits-heading">${item.text}</div>`;
        case 'name':       return `<div class="credits-name">${item.text}</div>`;
        case 'sub':        return `<div class="credits-sub">${item.text}</div>`;
        case 'thanks':     return `<div class="credits-thanks">${item.text}</div>`;
        case 'spacer':     return `<div class="credits-spacer"></div>`;
        case 'logo':       return `<div class="credits-logo"><img src="${item.text}" alt="logo"></div>`;
        default:           return '';
      }
    }).join('');
    roll.style.animation = 'none';
    roll.style.opacity = '0';

    screen.classList.remove('hidden');

    const fallbackDuration = this._estimateCreditsDuration(screen, roll, profile.scrollSpeed || 55);
    const audioDuration = bgmTrack ? await this._getAudioDuration(bgmTrack) : null;
    if (this._creditsSession !== session) return;

    requestAnimationFrame(() => {
      if (this._creditsSession !== session) return;

      const vh      = screen.clientHeight;
      const rollH   = roll.scrollHeight;
      const total   = vh + rollH;
      const speed   = profile.scrollSpeed || 55;
      const natural = total / speed;
      const dur     = Math.max(audioDuration || 0, natural, fallbackDuration);

      roll.style.setProperty('--credits-start', `${vh}px`);
      roll.style.setProperty('--credits-end',   `-${rollH}px`);
      roll.style.animation = `creditsScroll ${dur}s linear forwards`;
      roll.style.opacity = '1';

      this._startCreditsPresentation(profile, dur);

      this._creditsAnimEnd = () => {
        roll.removeEventListener('animationend', this._creditsAnimEnd);
        this._creditsAnimEnd = null;
        this._endCredits();
      };
      roll.addEventListener('animationend', this._creditsAnimEnd);
    });
  }

  _resolveCreditsProfile(profileKey, bgmFile) {
    const profile = (VN_CONFIG.creditsProfiles && profileKey)
      ? (VN_CONFIG.creditsProfiles[profileKey] || {})
      : {};
    return {
      key: profileKey || '',
      themeTrack: profile.themeTrack || bgmFile || null,
      themeTitle: profile.themeTitle || '',
      themeCredit: profile.themeCredit || '',
      memoryStills: Array.isArray(profile.memoryStills) ? profile.memoryStills : [],
      lyrics: Array.isArray(profile.lyrics) ? profile.lyrics : [],
      scrollSpeed: profile.scrollSpeed || 55,
    };
  }

  _estimateCreditsDuration(screen, roll, speed) {
    const vh    = screen.clientHeight || 720;
    const rollH = roll.scrollHeight || 1080;
    return (vh + rollH) / speed;
  }

  _startCreditsPresentation(profile, durationSec) {
    this._creditsMemoryIndex = 0;
    this._scheduleCreditsMemories(profile, durationSec);
    this._scheduleCreditsLyrics(profile, durationSec);
  }

  _scheduleCreditsMemories(profile, durationSec) {
    const stills = (profile.memoryStills || []).filter(Boolean);
    if (stills.length === 0) return;

    const introSec = 1.2;
    const usableSec = Math.max(durationSec - 3.4, stills.length * 1.8);
    const slotSec = usableSec / stills.length;

    stills.forEach((stillKey, index) => {
      const timer = setTimeout(() => {
        if (!this._creditsSession) return;
        this._showCreditsMemory(stillKey);
      }, Math.max(0, (introSec + slotSec * index) * 1000));
      this._creditsTimers.push(timer);
    });
  }

  _showCreditsMemory(stillKey) {
    const cards = [
      document.getElementById('credits-memory-card-a'),
      document.getElementById('credits-memory-card-b'),
    ].filter(Boolean);
    if (cards.length === 0) return;

    const next = cards[this._creditsMemoryIndex % cards.length];
    const prev = cards[(this._creditsMemoryIndex + 1) % cards.length];
    const src = this._getStillAssetPath(stillKey);
    if (!src) return;

    next.style.backgroundImage = `url(${src})`;
    const labelEl = next.querySelector('.credits-memory-label');
    if (labelEl) labelEl.textContent = this._getStillLabel(stillKey);

    next.classList.add('active');
    if (prev) prev.classList.remove('active');
    this._creditsMemoryIndex++;
  }

  _getStillAssetPath(stillKey) {
    const resolvedExt = this._resolvedStillExt && this._resolvedStillExt[stillKey];
    if (resolvedExt) return `assets/images/stills/${stillKey}${resolvedExt}`;
    return `assets/images/stills/${stillKey}.webp`;
  }

  _getStillLabel(stillKey) {
    const item = (VN_CONFIG.cgList || []).find(cg => cg.key === stillKey);
    return item?.label || stillKey;
  }

  _scheduleCreditsLyrics(profile, durationSec) {
    const lyricsEl = document.getElementById('credits-lyrics');
    const lyrics = (profile.lyrics || []).filter(Boolean);
    if (!lyricsEl || lyrics.length === 0) return;

    const introSec = 2.4;
    const usableSec = Math.max(durationSec - 5.0, lyrics.length * 4.0);
    const slotSec = usableSec / lyrics.length;
    const holdMs = Math.max(3200, Math.min(6200, slotSec * 780));

    lyrics.forEach((entry, index) => {
      const timer = setTimeout(() => {
        if (!this._creditsSession) return;
        this._showCreditsLyric(entry, holdMs);
      }, Math.max(0, (introSec + slotSec * index) * 1000));
      this._creditsTimers.push(timer);
    });
  }

  _showCreditsLyric(entry, holdMs) {
    const lyricsEl = document.getElementById('credits-lyrics');
    if (!lyricsEl) return;

    const lines = Array.isArray(entry) ? entry : [entry];
    lyricsEl.textContent = lines.join('\n');
    lyricsEl.classList.remove('hidden');
    requestAnimationFrame(() => lyricsEl.classList.add('visible'));

    const fadeTimer = setTimeout(() => {
      lyricsEl.classList.remove('visible');
    }, holdMs);
    this._creditsTimers.push(fadeTimer);
  }

  _clearCreditsPresentation() {
    this._creditsSession = null;
    this._creditsTimers.forEach(timer => clearTimeout(timer));
    this._creditsTimers = [];
    this._creditsMemoryIndex = 0;

    const roll = document.getElementById('credits-roll');
    if (roll && this._creditsAnimEnd) {
      roll.removeEventListener('animationend', this._creditsAnimEnd);
      this._creditsAnimEnd = null;
    }
    if (roll) {
      roll.style.animation = 'none';
      roll.style.opacity = '';
    }

    const lyricsEl = document.getElementById('credits-lyrics');
    if (lyricsEl) {
      lyricsEl.textContent = '';
      lyricsEl.classList.remove('visible');
      lyricsEl.classList.add('hidden');
    }

    ['credits-memory-card-a', 'credits-memory-card-b'].forEach(id => {
      const card = document.getElementById(id);
      if (!card) return;
      card.classList.remove('active');
      card.style.backgroundImage = '';
      const labelEl = card.querySelector('.credits-memory-label');
      if (labelEl) labelEl.textContent = '';
    });
  }

  async _getAudioDuration(track) {
    return await new Promise(resolve => {
      const audio = new Audio();
      let settled = false;
      const finish = (value) => {
        if (settled) return;
        settled = true;
        audio.removeEventListener('loadedmetadata', onLoaded);
        audio.removeEventListener('error', onError);
        resolve(value);
      };
      const onLoaded = () => finish(Number.isFinite(audio.duration) ? audio.duration : null);
      const onError  = () => finish(null);

      audio.preload = 'metadata';
      audio.addEventListener('loadedmetadata', onLoaded, { once: true });
      audio.addEventListener('error', onError, { once: true });
      audio.src = `assets/audio/bgm/${track}`;
    });
  }

  _skipCredits() {
    const roll = document.getElementById('credits-roll');
    if (this._creditsAnimEnd) {
      roll.removeEventListener('animationend', this._creditsAnimEnd);
      this._creditsAnimEnd = null;
    }
    roll.style.animation = 'none';
    this._endCredits();
  }

  _endCredits() {
    this._clearCreditsPresentation();
    document.getElementById('credits-screen').classList.add('hidden');
    document.getElementById('credits-roll').style.animation = 'none';
    document.getElementById('credits-roll').style.opacity = '';
    this._executeNext();
  }

  // ============================================================
  //  エンディング
  // ============================================================
  _displayEnding(title, next = null) {
    this._stopTypewriter();
    this.waitingForInput = false;

    // スキップ・オートも停止
    if (this.skipMode) {
      this.skipMode = false;
      document.getElementById('btn-skip').classList.remove('active');
    }
    if (this.autoMode) {
      this.autoMode = false;
      document.getElementById('btn-auto').classList.remove('active');
    }

    // メッセージウィンドウ・メニューバーをフェードアウト
    ['text-area', 'menu-bar'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.transition    = 'opacity 0.4s ease';
      el.style.opacity       = '0';
      el.style.pointerEvents = 'none';
    });
    // キャラをフェードアウト
    this._clearAllChars('fade_out');

    if (next) {
      // 背景も暗転フェード（starPan開始までの間に旧背景が残らないよう）
      const bgEl = document.getElementById('background');
      bgEl.style.transition = 'opacity 0.6s ease';
      bgEl.style.opacity    = '0';
      // ── チャプター切り替え: ボタン不要、自動でstarPan ──
      setTimeout(() => {
        this.tx.starPan(title, () => {
          // canvas が非表示になった直後に旧背景・テキストを即クリア（一瞬残るちらつき防止）
          const bgEl = document.getElementById('background');
          bgEl.style.transition      = '';
          bgEl.style.opacity         = '1';
          bgEl.style.backgroundImage = '';
          bgEl.style.background      = '#08060f';

          const textEl   = document.getElementById('dialog-text');
          const nameBox  = document.getElementById('char-name-box');
          if (textEl)  textEl.textContent       = '';
          if (nameBox) nameBox.style.display     = 'none';

          ['text-area', 'menu-bar'].forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            el.style.transition    = 'opacity 0.4s ease';
            el.style.opacity       = '1';
            el.style.pointerEvents = '';
          });
          this._gotoLabel(next);
        });
      }, 800);
    } else {
      // ── 最終エンディング: タイトルへ戻るボタンを表示 ──
      setTimeout(() => {
        document.getElementById('ending-title').textContent = title.replace(/\s*—\s*/g, '\n— ');
        document.getElementById('btn-next-chapter').classList.add('hidden');
        document.getElementById('ending-screen').classList.remove('hidden');
      }, 700);
    }
  }

  _continueToNextChapter() {
    // 現在は最終エンディングのみ使用（チャプター切り替えは_displayEndingで自動化）
    document.getElementById('ending-screen').classList.add('hidden');
  }

  // ============================================================
  //  タイトルに戻る
  // ============================================================
  _returnToTitle() {
    this._showConfirm(
      'タイトルに戻りますか？\n（未セーブのデータは失われます）',
      () => {
        this._stopAllSE();
        this._nextChapterLabel = null;
        this._resetGameState();
        this._showTitleScreen();
      }
    );
  }

  // ============================================================
  //  設定
  // ============================================================
  _openSettings() {
    // オート速度
    const currentDelay = VN_CONFIG.settings.autoDelay;
    document.querySelectorAll('#auto-speed-options .settings-opt').forEach(btn => {
      const delay = parseInt(btn.dataset.delay, 10);
      btn.classList.toggle('active', delay === currentDelay);
      btn.onclick = () => {
        VN_CONFIG.settings.autoDelay = delay;
        localStorage.setItem('vn_auto_delay', delay);
        document.querySelectorAll('#auto-speed-options .settings-opt')
          .forEach(b => b.classList.toggle('active', parseInt(b.dataset.delay, 10) === delay));
      };
    });

    // 文字表示速度
    const currentSpeed = VN_CONFIG.settings.typeSpeed;
    document.querySelectorAll('#type-speed-options .settings-opt').forEach(btn => {
      const speed = parseInt(btn.dataset.speed, 10);
      btn.classList.toggle('active', speed === currentSpeed);
      btn.onclick = () => {
        VN_CONFIG.settings.typeSpeed = speed;
        localStorage.setItem('vn_type_speed', speed);
        document.querySelectorAll('#type-speed-options .settings-opt')
          .forEach(b => b.classList.toggle('active', parseInt(b.dataset.speed, 10) === speed));
      };
    });

    // BGM音量スライダー
    const bgmSlider = document.getElementById('bgm-volume-slider');
    const bgmVal    = document.getElementById('bgm-volume-value');
    bgmSlider.value = Math.round(VN_CONFIG.settings.bgmVolume * 100);
    bgmVal.textContent = bgmSlider.value;
    bgmSlider.oninput = () => {
      const v = parseInt(bgmSlider.value, 10) / 100;
      VN_CONFIG.settings.bgmVolume = v;
      localStorage.setItem('vn_bgm_volume', v);
      bgmVal.textContent = bgmSlider.value;
      if (this.bgmAudio) try { this.bgmAudio.volume = v; } catch (e) {}
    };

    // SE音量スライダー
    const seSlider = document.getElementById('se-volume-slider');
    const seVal    = document.getElementById('se-volume-value');
    seSlider.value = Math.round(VN_CONFIG.settings.seVolume * 100);
    seVal.textContent = seSlider.value;
    seSlider.oninput = () => {
      const v = parseInt(seSlider.value, 10) / 100;
      VN_CONFIG.settings.seVolume = v;
      localStorage.setItem('vn_se_volume', v);
      seVal.textContent = seSlider.value;
    };

    // 文字サイズ
    const currentFontSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--vn-font-size') || '26', 10
    );
    document.querySelectorAll('#font-size-options .settings-opt').forEach(btn => {
      const size = parseInt(btn.dataset.size, 10);
      btn.classList.toggle('active', size === currentFontSize);
      btn.onclick = () => {
        document.documentElement.style.setProperty('--vn-font-size', size + 'px');
        localStorage.setItem('vn_font_size', size);
        document.querySelectorAll('#font-size-options .settings-opt')
          .forEach(b => b.classList.toggle('active', parseInt(b.dataset.size, 10) === size));
      };
    });

    // ウィンドウカラーパレット
    const currentPalette = localStorage.getItem('vn_window_palette') || 'default';
    document.querySelectorAll('#palette-options .palette-swatch').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.palette === currentPalette);
      btn.onclick = () => {
        this._applyWindowPalette(btn.dataset.palette);
        localStorage.setItem('vn_window_palette', btn.dataset.palette);
        document.querySelectorAll('#palette-options .palette-swatch')
          .forEach(b => b.classList.toggle('active', b.dataset.palette === btn.dataset.palette));
      };
    });

    document.getElementById('settings-modal').classList.remove('hidden');
  }

  _applyWindowPalette(palette) {
    const PALETTES = {
      default: { textBox: 'rgba(8, 3, 20, 0.80)',  nameBox: 'rgba(12, 4, 24, 0.80)' },
      navy:    { textBox: 'rgba(3, 8, 40, 0.85)',   nameBox: 'rgba(4, 10, 50, 0.88)' },
      forest:  { textBox: 'rgba(3, 22, 10, 0.85)',  nameBox: 'rgba(4, 28, 14, 0.88)' },
      sepia:   { textBox: 'rgba(24, 14, 4, 0.85)',  nameBox: 'rgba(30, 18, 6, 0.88)' },
      black:   { textBox: 'rgba(0, 0, 0, 0.92)',    nameBox: 'rgba(5, 5, 5, 0.95)'  },
    };
    const p = PALETTES[palette] || PALETTES.default;
    // COLORS.reset を上書きして以降の _setWindowColor('reset') に反映
    this._paletteReset = p;
    // 現在 reset 状態なら即時反映
    if (!this.windowColor || this.windowColor === 'reset') {
      const textBox = document.getElementById('text-box');
      const nameBox = document.getElementById('char-name-box');
      if (textBox) textBox.style.background = p.textBox;
      if (nameBox) nameBox.style.background = p.nameBox;
    }
  }

  // ============================================================
  //  CG ギャラリー
  // ============================================================
  _openGallery() {
    const content = document.getElementById('gallery-content');
    const list    = VN_CONFIG.cgList || [];
    if (list.length === 0) {
      content.innerHTML = '<p style="color:rgba(255,255,255,0.4);text-align:center;margin-top:40px;">スチル画像がありません</p>';
      document.getElementById('gallery-modal').classList.remove('hidden');
      return;
    }

    const seenCount = list.filter(it => this.seenStills.has(it.key)).length;
    let html = `<div class="cg-total-count">${seenCount} / ${list.length}</div>`;
    html += `<div class="cg-grid">`;
    for (const item of list) {
      if (this.seenStills.has(item.key)) {
        html += `<div class="cg-thumb unlocked" data-key="${item.key}" title="${item.label}">
          <div class="cg-thumb-img" style="background-image:url('${this._getStillAssetPath(item.key)}')"></div>
          <div class="cg-thumb-label">${item.label}</div>
        </div>`;
      } else {
        html += `<div class="cg-thumb locked">
          <div class="cg-thumb-img cg-thumb-locked">？</div>
          <div class="cg-thumb-label cg-label-locked">？？？</div>
        </div>`;
      }
    }
    html += `</div>`;
    content.innerHTML = html;

    content.querySelectorAll('.cg-thumb.unlocked').forEach(el => {
      el.addEventListener('click', () => this._openGalleryViewer(el.dataset.key));
    });

    document.getElementById('gallery-modal').classList.remove('hidden');
  }

  _openGalleryViewer(key) {
    const existing = document.getElementById('gallery-viewer');
    if (existing) existing.remove();

    const viewer = document.createElement('div');
    viewer.id = 'gallery-viewer';
    viewer.innerHTML = `
      <div id="gallery-viewer-bg"></div>
      <div id="gallery-viewer-img" style="background-image:url('${this._getStillAssetPath(key)}')"></div>
      <button id="gallery-viewer-close">✕</button>
    `;
    document.body.appendChild(viewer);

    const close = () => viewer.remove();
    viewer.querySelector('#gallery-viewer-close').addEventListener('click', close);
    viewer.querySelector('#gallery-viewer-bg').addEventListener('click', close);
  }

  // ============================================================
  //  モーダルを開く (汎用)
  // ============================================================
  _openModal(id) {
    document.getElementById(id).classList.remove('hidden');
  }

  // ============================================================
  //  BGM / SE
  // ============================================================
  _playBGM(track) {
    if (this.currentBGM === track) return; // 同じ曲なら何もしない
    this.currentBGM = track;

    // 直前のBGMを即座に停止
    // ※フェードアウト(setInterval)は iOS で audio.volume が read-only なため
    //   volume が 0 に達せず pause() が呼ばれずに BGM が積み重なるバグの原因
    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.bgmAudio = null;
    }

    const audio = new Audio(`assets/audio/bgm/${track}`);
    audio.loop = true;
    // iOS では volume は read-only のため 0 セットが効かない場合があるが
    // play() 後にフェードインを試みる（失敗しても音は出る）
    try { audio.volume = 0; } catch (e) { /* iOS read-only 無視 */ }
    this.bgmAudio = audio;

    const startFadeIn = () => {
      const target = VN_CONFIG.settings.bgmVolume;
      // 一度 volume を変更して iOS の read-only を検出
      try { audio.volume = 0; } catch (e) { return; } // 例外 = read-only → フェード不要
      const before = audio.volume;
      audio.volume = 0.01;
      if (audio.volume === before) return; // 変化なし = iOS read-only → フェード不要
      audio.volume = 0;
      const timer = setInterval(() => {
        if (!this.bgmAudio || this.bgmAudio !== audio) { clearInterval(timer); return; }
        try {
          audio.volume = Math.min(target, audio.volume + 0.05);
        } catch (e) { clearInterval(timer); return; }
        if (audio.volume >= target) clearInterval(timer);
      }, 80);
    };

    audio.play().then(startFadeIn).catch(() => {
      // 自動再生ブロック時は最初のクリックで再生
      // ガード必須: 別のBGMに切り替わっていたらこのAudioは再生しない
      const resume = () => {
        if (this.bgmAudio !== audio) { document.removeEventListener('click', resume); return; }
        audio.play().then(startFadeIn).catch(() => {});
        document.removeEventListener('click', resume);
      };
      document.addEventListener('click', resume);
    });
  }

  _stopBGM() {
    this.currentBGM = '';
    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.bgmAudio = null;
    }
  }

  _playSE(file, loop = false) {
    try {
      const audio = new Audio(`assets/audio/se/${file}`);
      audio.volume = VN_CONFIG.settings.seVolume;
      audio.loop = loop;
      this.seAudios.push(audio);
      if (!loop) {
        audio.addEventListener('ended', () => {
          this.seAudios = this.seAudios.filter(a => a !== audio);
        });
      }
      audio.play().catch(() => {});
    } catch (e) {}
  }

  _stopAllSE() {
    this.seAudios.forEach(a => { a.pause(); a.currentTime = 0; });
    this.seAudios = [];
  }

  // ============================================================
  //  カスタムカーソル
  // ============================================================
  _initCursor() {
    if (this._isTouchDevice) return;

    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-ring"></div><div class="cursor-core"></div>';
    document.body.appendChild(cursor);

    const sparkleColors = ['#ffb8e2', '#e090ff', '#ffffff', '#ffccee', '#bb88ff'];
    let lastSparkle = 0;

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';

      const now = Date.now();
      if (now - lastSparkle < 55) return;
      lastSparkle = now;

      const sp = document.createElement('div');
      sp.className  = 'cursor-sparkle';
      sp.style.left = e.clientX + 'px';
      sp.style.top  = e.clientY + 'px';
      sp.style.background = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
      const angle = Math.random() * Math.PI * 2;
      const dist  = Math.random() * 18 + 6;
      sp.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
      sp.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
      document.body.appendChild(sp);
      setTimeout(() => sp.remove(), 620);
    });
  }

  _spawnTouchParticles(clientX, clientY) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const gameScreen = document.getElementById('game-screen');
    if (!gameScreen) return;

    const rect = gameScreen.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const count = 5 + Math.floor(Math.random() * 4);
    const colors = ['#fff6fc', '#ffd5ee', '#ffb6dd', '#e7c6ff', '#fff0a8'];

    for (let i = 0; i < count; i++) {
      const star = document.createElement('span');
      star.className = 'touch-star';
      star.textContent = '✦';
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.color = colors[Math.floor(Math.random() * colors.length)];
      star.style.fontSize = `${12 + Math.random() * 10}px`;
      star.style.setProperty('--dx', `${(Math.random() - 0.5) * 72}px`);
      star.style.setProperty('--dy', `${-18 - Math.random() * 44}px`);
      star.style.setProperty('--rot', `${(Math.random() - 0.5) * 160}deg`);
      star.addEventListener('animationend', () => star.remove(), { once: true });
      setTimeout(() => { if (star.isConnected) star.remove(); }, 900);
      gameScreen.appendChild(star);
    }
  }

  // ============================================================
  //  DEBUG: チャプタージャンプメニュー (後で削除)
  // ============================================================
  _openDebugMenu() {
    // 既存パネルがあれば閉じる
    const existing = document.getElementById('debug-jump-overlay');
    if (existing) { existing.remove(); return; }

    const chapters = [
      { label: 'Chapter 1 — 星の見えない夜空',   key: 'start' },
      { label: 'Chapter 2 — 笑顔の境界線',       key: 'chapter2_start' },
      { label: 'Chapter 3 — 遠くの音',           key: 'chapter3_start' },
      { label: 'Chapter 4 — 理由を集める日々',   key: 'chapter4_start' },
      { label: 'Chapter 5 — 水面の午後',         key: 'chapter5_start' },
      { label: 'Chapter 6 — それぞれの放課後',   key: 'chapter6_start' },
      { label: 'Chapter 7 — 重なる孤独',         key: 'chapter7_start' },
      { label: 'Chapter 8 — 選ぶということ',     key: 'chapter8_start' },
      { label: '── 分岐: さくらルート',           key: 'sakura_interlude' },
      { label: '── 分岐: ことはルート',           key: 'kotoha_interlude' },
      { label: '── 分岐: まひるルート',           key: 'mahiru_interlude' },
      { label: '── バッドエンド',                 key: 'bad_end_common' },
    ];

    const overlay = document.createElement('div');
    overlay.id = 'debug-jump-overlay';
    overlay.style.cssText = [
      'position:fixed;inset:0;z-index:1000000;',
      'background:rgba(0,0,0,.78);',
      'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;',
    ].join('');

    const title = document.createElement('div');
    title.textContent = '⚙ DEBUG: チャプタージャンプ';
    title.style.cssText = 'color:#ff8;font-size:1.1em;font-family:monospace;margin-bottom:8px;';
    overlay.appendChild(title);

    for (const ch of chapters) {
      const btn = document.createElement('button');
      btn.textContent = ch.label;
      btn.style.cssText = [
        'width:340px;padding:10px 20px;',
        'background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.25);',
        'color:#eee;font-size:.95em;font-family:monospace;cursor:pointer;',
        'transition:background .15s;',
      ].join('');
      btn.onmouseenter = () => { btn.style.background = 'rgba(255,255,180,.18)'; };
      btn.onmouseleave = () => { btn.style.background = 'rgba(255,255,255,.08)'; };
      btn.addEventListener('click', () => {
        overlay.remove();
        this._startFromLabel(ch.key);
      });
      overlay.appendChild(btn);
    }

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '閉じる';
    closeBtn.style.cssText = [
      'margin-top:12px;padding:6px 24px;',
      'background:transparent;border:1px solid rgba(255,255,255,.3);',
      'color:rgba(255,255,255,.5);font-family:monospace;cursor:pointer;',
    ].join('');
    closeBtn.addEventListener('click', () => overlay.remove());
    overlay.appendChild(closeBtn);

    // オーバーレイ外クリックで閉じる
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

    document.body.appendChild(overlay);
  }

  _startFromLabel(label) {
    document.getElementById('title-screen').classList.add('hidden');
    this.titleFx.stop();
    this._stopBGM();
    document.getElementById('game-screen').classList.remove('hidden');
    this._resetGameState();
    // デバッグ用: ルート分岐以降のラベルには好感度を自動設定
    const favorPresets = {
      sakura_interlude:  { sakura_favor: 12 },
      kotoha_interlude:  { kotoha_favor: 12 },
      mahiru_interlude:  { mahiru_favor: 12 },
      chapter8_start:    { sakura_favor: 10, kotoha_favor: 10, mahiru_favor: 10 },
    };
    if (favorPresets[label]) Object.assign(this.flags, favorPresets[label]);
    this._gotoLabel(label);
  }

  // ============================================================
  //  デバッグ: フラグモニター (F2 でトグル)
  // ============================================================
  _initDebugPanel() {
    const panel = document.createElement('div');
    panel.id = 'debug-flag-panel';
    panel.style.cssText = [
      'position:fixed;top:8px;right:8px;',
      'background:rgba(8,6,18,.93);',
      'color:#ccc;font-family:monospace;font-size:11px;',
      'border:1px solid rgba(120,100,200,.5);border-radius:6px;',
      'z-index:999999;display:none;',
      'width:260px;max-height:85vh;overflow-y:auto;',
      'box-shadow:0 4px 24px rgba(0,0,0,.6);',
      'user-select:none;',
    ].join('');
    document.body.appendChild(panel);

    document.addEventListener('keydown', (e) => {
      if (e.code === 'F2') {
        e.preventDefault();
        const titleVisible = !document.getElementById('title-screen').classList.contains('hidden');
        if (titleVisible) {
          const dbgBtn = document.getElementById('btn-debug');
          if (dbgBtn) dbgBtn.style.display = dbgBtn.style.display === 'none' ? '' : 'none';
        } else {
          const visible = panel.style.display !== 'none';
          panel.style.display = visible ? 'none' : 'block';
          if (!visible) this._debugUpdatePanel();
        }
      }
    });

    this._debugPanel = panel;
  }

  _debugUpdatePanel() {
    if (!VN_CONFIG.settings.debug) return;
    if (!this._debugPanel || this._debugPanel.style.display === 'none') return;

    const entries = Object.entries(this.flags);

    // 好感度フラグ（_favor / _affection）と真偽フラグに分類
    const favorKeys  = ['sakura_favor', 'kotoha_favor', 'mahiru_favor'];
    const numEntries = entries.filter(([k, v]) => typeof v === 'number' || (typeof v === 'string' && !isNaN(Number(v)) && v !== ''));
    const boolEntries = entries.filter(([k, v]) => v === true || v === false || v === 'true' || v === 'false');
    const otherEntries = entries.filter(([k, v]) =>
      !numEntries.find(e => e[0] === k) && !boolEntries.find(e => e[0] === k));

    const makeNumRow = ([k, v]) => {
      const num = Number(v);
      const isFavor = favorKeys.includes(k);
      const barMax = isFavor ? 100 : null;
      const bar = barMax !== null
        ? `<div style="height:3px;background:#222;border-radius:2px;margin:2px 0 4px;">` +
          `<div style="height:3px;width:${Math.min(num/barMax*100,100)}%;` +
          `background:linear-gradient(90deg,#9060d0,#e080ff);border-radius:2px;"></div></div>`
        : '';
      return `<div style="margin:3px 0;">` +
        `<div style="display:flex;justify-content:space-between;align-items:center;">` +
        `<span style="color:#aaa;">${k}</span>` +
        `<span style="display:flex;align-items:center;gap:4px;">` +
        `<button onclick="window._dbg.add('${k}',-1)" style="${btnS('#333')}">−</button>` +
        `<span style="color:#ffdd66;min-width:28px;text-align:center;">${num}</span>` +
        `<button onclick="window._dbg.add('${k}',1)"  style="${btnS('#333')}">＋</button>` +
        `</span></div>${bar}</div>`;
    };

    const makeBoolRow = ([k, v]) => {
      const bool = v === true || v === 'true';
      return `<div style="display:flex;justify-content:space-between;margin:3px 0;">` +
        `<span style="color:#aaa;">${k}</span>` +
        `<button onclick="window._dbg.toggle('${k}')" style="${btnS(bool ? '#1a3a1a' : '#2a1a1a')};color:${bool ? '#88ffaa' : '#ff8888'};">` +
        `${bool ? 'true' : 'false'}</button></div>`;
    };

    const makeOtherRow = ([k, v]) =>
      `<div style="display:flex;justify-content:space-between;margin:3px 0;">` +
      `<span style="color:#aaa;">${k}</span>` +
      `<span style="color:#ccc;">${v}</span></div>`;

    const section = (title, color, rows) => rows.length === 0 ? '' :
      `<div style="color:${color};border-bottom:1px solid rgba(255,255,255,.1);` +
      `padding:6px 12px 3px;font-size:10px;letter-spacing:.1em;">${title}</div>` +
      `<div style="padding:4px 12px 8px;">` + rows.map(r => r).join('') + `</div>`;

    const btnS = (bg) =>
      `background:${bg};border:1px solid rgba(255,255,255,.15);color:#ccc;` +
      `border-radius:3px;padding:1px 5px;cursor:pointer;font-size:10px;font-family:monospace;`;

    this._debugPanel.innerHTML =
      `<div style="padding:8px 12px;border-bottom:1px solid rgba(120,100,200,.3);` +
      `display:flex;justify-content:space-between;align-items:center;">` +
      `<span style="color:#c090ff;font-size:11px;letter-spacing:.05em;">⚙ DEBUG PANEL</span>` +
      `<span style="color:#555;font-size:10px;">F2</span></div>` +

      // 現在位置
      `<div style="padding:6px 12px;background:rgba(255,255,255,.04);` +
      `border-bottom:1px solid rgba(255,255,255,.07);font-size:10px;line-height:1.8;">` +
      `<span style="color:#6688cc;">label</span>  ${this.currentLabel}<br>` +
      `<span style="color:#6688cc;">index</span>  ${this.currentIndex}</div>` +

      // 好感度（数値フラグ）
      section('▸ 数値フラグ', '#ffcc44', numEntries.map(makeNumRow)) +

      // 真偽フラグ
      section('▸ 真偽フラグ', '#88aaff', boolEntries.map(makeBoolRow)) +

      // その他
      (otherEntries.length > 0 ? section('▸ その他', '#aaa', otherEntries.map(makeOtherRow)) : '') +

      (entries.length === 0 ? `<div style="padding:12px;color:#555;text-align:center;">フラグなし</div>` : '');

    // 操作ハンドラ
    window._dbg = {
      add: (key, delta) => {
        this.flags[key] = (Number(this.flags[key]) || 0) + delta;
        this._debugUpdatePanel();
      },
      toggle: (key) => {
        const cur = this.flags[key] === true || this.flags[key] === 'true';
        this.flags[key] = !cur;
        this._debugUpdatePanel();
      },
    };
  }

  // ============================================================
  //  流れ星 (タイトル画面)
  // ============================================================
  _createShootingStar() {
    const container = document.getElementById('shooting-stars');
    if (!container) return;
    const star     = document.createElement('div');
    star.className = 'shooting-star';
    const x        = Math.random() * 1000 + 150;
    const y        = Math.random() * 280;
    const length   = Math.random() * 90 + 55;
    const duration = (Math.random() * 0.5 + 0.7).toFixed(2);
    star.style.left   = `${x}px`;
    star.style.top    = `${y}px`;
    star.style.height = `${length}px`;
    star.style.setProperty('--dur', `${duration}s`);
    container.appendChild(star);
    setTimeout(() => star.remove(), parseFloat(duration) * 1000 + 300);
  }

  _scheduleShootingStars() {
    const spawn = () => {
      const title = document.getElementById('title-screen');
      if (title && !title.classList.contains('hidden')) {
        this._createShootingStar();
        if (Math.random() < 0.2) {
          setTimeout(() => this._createShootingStar(), 120 + Math.random() * 180);
        }
      }
      setTimeout(spawn, Math.random() * 4000 + 3000);
    };
    setTimeout(spawn, Math.random() * 1500 + 1500);
  }
}

// ============================================================
//  タイトル画面 Canvasエフェクト (星個別瞬き・雲流れ)
// ============================================================
class TitleEffectsCanvas {
  constructor() {
    this._canvas = null;
    this._ctx    = null;
    this._rafId  = null;
    this._t0     = 0;
    this._stars  = [];
    this._w      = 0;
    this._h      = 0;
  }

  start() {
    if (!this._canvas) {
      this._canvas = document.getElementById('title-canvas');
      if (!this._canvas) return;
      this._ctx = this._canvas.getContext('2d');
      window.addEventListener('resize', () => {
        this._resize();
        this._initStars();
      });
    }
    this.stop(); // 多重起動防止
    // display:none 解除直後はlayout reflowが終わっていないため
    // 1フレーム遅延してからサイズを取得する
    requestAnimationFrame(() => {
      this._resize();
      this._initStars();
      this._t0 = performance.now();
      const loop = (now) => {
        this._rafId = requestAnimationFrame(loop);
        this._draw(now);
      };
      this._rafId = requestAnimationFrame(loop);
    });
  }

  stop() {
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    if (this._ctx) this._ctx.clearRect(0, 0, this._w, this._h);
  }

  _resize() {
    if (!this._canvas) return;
    const p = this._canvas.parentElement;
    const w = (p && p.clientWidth  > 0) ? p.clientWidth  : window.innerWidth;
    const h = (p && p.clientHeight > 0) ? p.clientHeight : window.innerHeight;
    this._w = this._canvas.width  = w;
    this._h = this._canvas.height = h;
  }

  _initStars() {
    this._stars = [];
    const topMargin = 70; // 上部の黒帯を避ける
    for (let i = 0; i < 55; i++) {
      this._stars.push({
        x:     Math.random() * this._w,
        y:     topMargin + Math.random() * (this._h - topMargin) * 0.88,
        r:     0.6 + Math.random() * 1.6,
        phase: Math.random() * Math.PI * 2,
        freq:  0.3 + Math.random() * 1.1,
        base:  0.2 + Math.random() * 0.4,
      });
    }
  }

  _draw(now) {
    const ctx = this._ctx;
    const t   = (now - this._t0) / 1000;
    ctx.clearRect(0, 0, this._w, this._h);

    // ── 星 (個別瞬き) ─────────────────────────────────────
    for (const s of this._stars) {
      const alpha = s.base + (1 - s.base) * 0.5 *
        (1 + Math.sin(t * s.freq * Math.PI * 2 + s.phase));
      ctx.save();
      ctx.globalAlpha = Math.min(1, alpha);
      if (s.r > 1.3) {
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3.5);
        glow.addColorStop(0, 'rgba(220,185,255,0.55)');
        glow.addColorStop(1, 'rgba(200,160,255,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}

// ============================================================
//  トランジションCanvas（シーン・チャプター切り替え）
// ============================================================
class TransitionCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx    = this.canvas ? this.canvas.getContext('2d') : null;
    this._resize();
    window.addEventListener('resize', () => this._resize());
    // chapter_bg 先読み
    this._chapterBg = new Image();
    this._chapterBg.src = 'assets/images/bg/chapter_bg.png';
  }

  _resize() {
    if (!this.canvas) return;
    this.canvas.width  = this.canvas.offsetWidth  || 1280;
    this.canvas.height = this.canvas.offsetHeight || 720;
  }

  _clear() {
    if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  _animate(duration, onFrame, onDone) {
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      onFrame(t);
      if (t < 1) requestAnimationFrame(tick);
      else if (onDone) onDone();
    };
    requestAnimationFrame(tick);
  }

  _easeIn(t)    { return t * t; }
  _easeOut(t)   { return t * (2 - t); }
  _easeInOut(t) { return t < .5 ? 2*t*t : -1+(4-2*t)*t; }

  // ── ダイヤモンドトランジション（シーン切り替え） ───────────
  diamond(duration, onSwap, onDone) {
    if (!this.ctx) { onSwap(); if (onDone) onDone(); return; }
    const W = this.canvas.width, H = this.canvas.height;
    const SIZE = Math.min(W, H) / 7;
    const cols = Math.ceil(W / SIZE) + 2;
    const rows = Math.ceil(H / SIZE) + 2;
    const half = duration / 2;
    const ctx  = this.ctx;

    const draw = (progress) => {
      this._clear();
      ctx.fillStyle = '#0a0508';
      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.rotate(Math.PI / 4);
      const ox = -Math.ceil(cols / 2) * SIZE;
      const oy = -Math.ceil(rows / 2) * SIZE;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const delay = (c + r) / (cols + rows);
          const t = Math.max(0, Math.min(1, (progress - delay * .6) / .4));
          const s = SIZE * t;
          ctx.fillRect(ox + c * SIZE + SIZE / 2 - s / 2, oy + r * SIZE + SIZE / 2 - s / 2, s, s);
        }
      }
      ctx.restore();
    };

    this.canvas.style.display = 'block';
    this._animate(half, t => draw(this._easeIn(t)), () => {
      onSwap();
      this._animate(half, t => draw(1 - this._easeOut(t)), () => {
        this._clear();
        this.canvas.style.display = 'none';
        if (onDone) onDone();
      });
    });
  }

  // ── 星空パン（チャプター切り替え） ─────────────────────────
  starPan(title, onDone) {
    if (!this.ctx) { if (onDone) onDone(); return; }
    const W = this.canvas.width, H = this.canvas.height;
    const ctx = this.ctx;
    const img = this._chapterBg;

    const scale  = W / 1536;
    const dH     = 2752 * scale;
    const startY = -(dH - H);
    const endY   = 0;

    const drawBg = (y, alpha) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      if (img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, 0, y, W, dH);
      } else {
        const grd = ctx.createLinearGradient(0, 0, 0, H);
        grd.addColorStop(0,   '#03040f');
        grd.addColorStop(0.6, '#080c20');
        grd.addColorStop(1,   '#141828');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);
      }
      ctx.restore();
    };

    const drawTitle = (alpha) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.textAlign = 'center';
      ctx.font = `${W * 0.028}px 'Yu Mincho', 'Shippori Mincho B1', serif`;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(100,120,255,0.5)';
      ctx.shadowBlur  = 18;
      ctx.fillText(title, W / 2, H * 0.5);
      ctx.shadowBlur  = 0;
      ctx.restore();
    };

    const drawShootingStar = (progress) => {
      if (progress <= 0) return;
      const sx = W * 0.78, sy = H * 0.12;
      const ex = W * 0.22, ey = H * 0.38;
      const head = Math.min(progress, 1);
      const tail = Math.max(0, progress - 0.18);
      const hx = sx + (ex - sx) * head, hy = sy + (ey - sy) * head;
      const tx = sx + (ex - sx) * tail, ty = sy + (ey - sy) * tail;
      ctx.save();
      const grad = ctx.createLinearGradient(tx, ty, hx, hy);
      grad.addColorStop(0, 'rgba(180,200,255,0)');
      grad.addColorStop(1, 'rgba(255,255,255,0.95)');
      ctx.strokeStyle = grad;
      ctx.lineWidth   = 1.5;
      ctx.shadowColor = '#b0c8ff';
      ctx.shadowBlur  = 10;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(hx, hy);
      ctx.stroke();
      if (head < 1) {
        ctx.beginPath();
        ctx.arc(hx, hy, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.shadowBlur = 14;
        ctx.fill();
      }
      ctx.restore();
    };

    const PAN_DUR     = 2000;
    const TITLE_DUR   = 700;
    const HOLD_DUR    = 500;
    const STAR_DUR    = 900;
    const FADEOUT_DUR = 600;

    this.canvas.style.display       = 'block';
    this.canvas.style.pointerEvents = 'auto'; // 演出中のクリック貫通を防ぐ

    this._animate(PAN_DUR, t => {
      this._clear();
      drawBg(startY + (endY - startY) * this._easeInOut(t), Math.min(t * 5, 1));
    }, () => {
      this._animate(TITLE_DUR, t => {
        this._clear();
        drawBg(endY, 1);
        drawTitle(this._easeOut(t));
      }, () => {
        this._animate(HOLD_DUR + STAR_DUR, t => {
          this._clear();
          drawBg(endY, 1);
          drawTitle(1);
          drawShootingStar(Math.max(0, (t * (HOLD_DUR + STAR_DUR) - HOLD_DUR) / STAR_DUR) * 1.2);
        }, () => {
          this._animate(FADEOUT_DUR, t => {
            this._clear();
            drawBg(endY, 1);
            ctx.fillStyle = `rgba(0,0,0,${this._easeIn(t)})`;
            ctx.fillRect(0, 0, W, H);
          }, () => {
            this._clear();
            this.canvas.style.display       = 'none';
            this.canvas.style.pointerEvents = 'none';
            if (onDone) onDone();
          });
        });
      });
    });
  }
}

// ============================================================
//  Canvasエフェクトレイヤー
// ============================================================
class EffectsCanvas {
  constructor(canvasId) {
    this.canvas  = document.getElementById(canvasId);
    this.ctx     = this.canvas ? this.canvas.getContext('2d') : null;
    this.effect  = null;       // 現在のエフェクト名 ('sakura'|'rain'|'snow'|null)
    this.particles = [];
    this._shakeEl  = null;     // シェイク対象要素
    this._rafId    = null;
    this._resize();
    window.addEventListener('resize', () => this._resize());
    this._loop();
  }

  _resize() {
    if (!this.canvas) return;
    this.canvas.width  = this.canvas.offsetWidth  || window.innerWidth;
    this.canvas.height = this.canvas.offsetHeight || window.innerHeight;
  }

  // エフェクト設定 ('sakura'|'rain'|'snow'|'stop')
  setEffect(type) {
    if (type === 'stop') {
      this.effect    = null;
      this.particles = [];
    } else {
      this.effect    = type;
      this.particles = [];
    }
  }

  // 画面シェイク
  shake(strength, duration) {
    const target = document.getElementById('game-screen');
    if (!target) return;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      if (elapsed >= duration) {
        target.style.transform = '';
        return;
      }
      const decay = 1 - elapsed / duration;
      const dx = (Math.random() * 2 - 1) * strength * decay;
      const dy = (Math.random() * 2 - 1) * strength * decay;
      target.style.transform = `translate(${dx}px,${dy}px)`;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  _spawnParticle() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    if (this.effect === 'sakura') {
      return {
        x:     Math.random() * w,
        y:     -10,
        size:  Math.random() * 6 + 4,
        speedX: (Math.random() - 0.4) * 1.2,
        speedY: Math.random() * 1.5 + 0.8,
        angle: Math.random() * Math.PI * 2,
        spin:  (Math.random() - 0.5) * 0.06,
        alpha: Math.random() * 0.5 + 0.5,
        color: `hsl(${Math.random() * 20 + 340},${Math.floor(Math.random()*20+70)}%,${Math.floor(Math.random()*10+80)}%)`,
      };
    } else if (this.effect === 'rain') {
      return {
        x:     Math.random() * w,
        y:     -20,
        size:  Math.random() * 10 + 8,
        speedX: 1.5,
        speedY: Math.random() * 8 + 12,
        alpha: Math.random() * 0.3 + 0.2,
      };
    } else if (this.effect === 'snow') {
      return {
        x:     Math.random() * w,
        y:     -10,
        size:  Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.5 + 0.5,
        sway:  Math.random() * 0.02,
        age:   0,
      };
    }
  }

  _drawParticle(p) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = p.alpha;
    if (this.effect === 'sakura') {
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      // 花びら形（楕円）
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.effect === 'rain') {
      ctx.strokeStyle = 'rgba(174,214,241,0.7)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.speedX * 1.5, p.y + p.size);
      ctx.stroke();
    } else if (this.effect === 'snow') {
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  _loop() {
    if (!this.ctx) return;
    const ctx  = this.ctx;
    const w    = this.canvas.width;
    const h    = this.canvas.height;

    ctx.clearRect(0, 0, w, h);

    if (this.effect) {
      // スポーン
      const maxParticles = this.effect === 'rain' ? 120 : 60;
      const spawnRate    = this.effect === 'rain' ? 5 : 1;
      if (this.particles.length < maxParticles) {
        for (let i = 0; i < spawnRate; i++) {
          this.particles.push(this._spawnParticle());
        }
      }

      // 更新・描画
      this.particles = this.particles.filter(p => {
        if (this.effect === 'sakura') {
          p.x     += p.speedX + Math.sin(p.age || 0) * 0.4;
          p.y     += p.speedY;
          p.angle += p.spin;
          p.age   = (p.age || 0) + 0.03;
        } else if (this.effect === 'rain') {
          p.x += p.speedX;
          p.y += p.speedY;
        } else if (this.effect === 'snow') {
          p.x += p.speedX + Math.sin(p.age) * 0.5;
          p.y += p.speedY;
          p.age += p.sway;
        }
        this._drawParticle(p);
        return p.y < h + 20;
      });
    }

    this._rafId = requestAnimationFrame(() => this._loop());
  }
}

// ============================================================
//  エンジン起動
// ============================================================
const engine = new VNEngine();
