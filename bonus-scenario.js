/* Post-clear comedy. Uses the normal VN parser, dialogue, choices and emote engine. */
class BonusScenario {
  constructor(engine) {
    this.engine = engine;
    this.timers = new Set();
    this.animations = new Set();
    this.epoch = 0;
    this.active = false;
    this.starting = false;
    this.screen = document.getElementById('game-screen');
    this.layer = document.createElement('div');
    this.layer.id = 'bonus-layer';
    this.layer.setAttribute('aria-hidden', 'true');
    this.screen.appendChild(this.layer);
  }

  get debugEnabled() { return !!VN_CONFIG.settings?.debug; }
  get canStart() { return this.engine._hasAllGoodEndsSeen(); }

  get english() { return this.engine.currentLanguage === 'en'; }
  text(ja, en) { return this.english ? en : ja; }

  install() {
    const e = this.engine;
    for (const [key, actor] of Object.entries(VN_BONUS.actors)) {
      VN_CONFIG.characters[key] = { ...VN_CONFIG.characters[actor.speakerKey], ...actor, bonusOnly: true };
    }
    Object.assign(e.labels, e.parser.parse(VN_BONUS.script));
    for (const [key, value] of Object.entries(VN_BONUS.texts[this.english ? 'en' : 'ja'])) {
      e.scenarioTexts['bonus.' + key] = value;
    }
  }

  async preload() {
    if (this.ready) return;
    const images = await Promise.all(VN_BONUS.assets.map(src => new Promise((resolve, reject) => {
      const img = new Image();
      const timer = setTimeout(() => reject(new Error('Bonus image timeout: ' + src)), 30000);
      img.onload = () => { clearTimeout(timer); resolve(img); };
      img.onerror = () => { clearTimeout(timer); reject(new Error('Bonus image unavailable: ' + src)); };
      img.src = src;
    })));
    this.images = images;
    this.ready = true;
  }

  async start({ debug = false, fromStory = false } = {}) {
    const e = this.engine;
    const canStart = () => this.canStart || (debug && this.debugEnabled);
    const sourceToken = e._advanceToken;
    const storyEntry = fromStory && e._gameActive && !this.active && e.currentLabel === 'chapter4_start';
    if (this.starting || (e._gameActive && !storyEntry) || (fromStory && !storyEntry) || !canStart() || !e.labels.bonus_start) return false;
    this.starting = true;
    const epoch = this.epoch;
    const language = e.currentLanguage;
    try {
      await this.preload();
      if (this.epoch !== epoch || language !== e.currentLanguage || (storyEntry ? (!e._gameActive || e._advanceToken !== sourceToken) : e._gameActive) || !canStart()
        || (!storyEntry && document.getElementById('title-screen').classList.contains('hidden'))
        || document.querySelector('.modal:not(.hidden)')) return false;
      const returnPoint = storyEntry ? {
        label: e.currentLabel, index: e.currentIndex, flags: JSON.parse(JSON.stringify(e.flags)),
        charState: JSON.parse(JSON.stringify(e.charState)), bg: e.currentBG, bgm: e.currentBGM,
        bgmLoop: e.currentBGMLoop, still: e.currentStill, windowColor: e.windowColor,
        textLog: JSON.parse(JSON.stringify(e.textLog)),
      } : null;
      e._resetGameState();
      e.flags.bonus_run = true;
      if (returnPoint) e.flags.bonus_return = returnPoint;
      this.active = true;
      this.setMode('meeting');
      e.titleFx.stop();
      e._gameActive = true;
      document.getElementById('title-screen').classList.add('hidden');
      this.screen.classList.remove('hidden');
      e._gotoLabel('bonus_start');
      return true;
    } catch (error) {
      console.warn('[Bonus]', error.message);
      e._showToast(this.text('おまけの画像を読み込めませんでした。もう一度お試しください。', 'The extra artwork could not load. Please try again.'));
      return false;
    } finally {
      this.starting = false;
    }
  }

  offer() {
    const e = this.engine;
    if (!this.canStart || this.active || !e._gameActive || e.currentLabel !== 'chapter4_start') {
      e._executeNext();
      return;
    }
    const token = e._advanceToken;
    e._displayChoices([
      { text: this.text('まずは、目の前の準備からだ', "Let's start with the preparations in front of us."), next: e.currentLabel, bonus: false },
      { text: this.text('いっそ、好きにやってみるか', "Let's just do whatever we want."), next: 'bonus_start', bonus: true },
    ], async option => {
      if (e._advanceToken !== token || !e._gameActive || this.active || this.starting) return;
      if (!option.bonus) { e._executeNext(); return; }
      e._inputLocked = true;
      const started = await this.start({ fromStory: true });
      if (!started && e._advanceToken === token && e._gameActive && !this.active) {
        e._inputLocked = false;
        this.offer();
      }
    });
  }

  returnToStory() {
    const e = this.engine;
    const point = e.flags.bonus_return;
    if (!point || !e.labels[point.label]) return false;
    e._resetGameState();
    e._gameActive = true;
    e.flags = point.flags;
    e.textLog = point.textLog;
    e.currentLabel = point.label;
    e.currentIndex = point.index;
    document.getElementById('title-screen').classList.add('hidden');
    this.screen.classList.remove('hidden');
    if (point.bg) e._changeBackground(point.bg, 'instant');
    if (point.bgm) e._playBGM(point.bgm, { loop: point.bgmLoop !== false });
    if (point.still) e._showStill(point.still, 'instant');
    e._setWindowColor(point.windowColor || 'reset');
    for (const [pos, state] of Object.entries(point.charState || {})) {
      if (state) e._showChar(state.charKey, pos, state.expr, 'instant');
    }
    e._executeNext();
    return true;
  }

  async startDebug(label = 'bonus_start') {
    if (!this.debugEnabled || !['bonus_start', 'bonus_library', 'bonus_table', 'bonus_board', 'bonus_yukkuri', 'bonus_aa', 'bonus_nobuhara_round', 'bonus_apology'].includes(label)) return false;
    if (this.engine._gameActive) {
      this.engine._resetGameState();
      this.engine._showTitleScreen();
    }
    if (!await this.start({ debug: true })) return false;
    if (label !== 'bonus_start') {
      this.engine._changeBackground('classroom_evening', 'instant');
      this.engine._playBGM('daily_life.mp3');
      this.engine._gotoLabel(label);
    }
    return true;
  }

  restore() {
    if (!this.engine.flags.bonus_run) return;
    this.active = true;
    this.setMode(this.engine.flags.bonus_mode || 'meeting');
    if (this.engine.flags.bonus_flash) this.flash(this.engine.flags.bonus_flash);
    if (this.engine.flags.bonus_board) this.board(this.engine.flags.bonus_board);
  }

  reset() {
    ++this.epoch;
    this.active = false;
    this.timers.forEach(clearTimeout);
    this.timers.clear();
    this.animations.forEach(a => a.cancel());
    this.animations.clear();
    this.releaseVideo();
    this.videoLayer?.remove();
    this.videoLayer = null;
    this.videoFinish = null;
    this.layer.replaceChildren();
    this.layer.setAttribute('aria-hidden', 'true');
    this.screen.classList.remove('bonus-running');
    delete this.screen.dataset.bonusMode;
    this.engine.fx?.setEffect('stop');
  }

  later(fn, ms) {
    const epoch = this.epoch;
    const timer = setTimeout(() => {
      this.timers.delete(timer);
      if (this.active && this.epoch === epoch) fn();
    }, ms);
    this.timers.add(timer);
    return timer;
  }

  animate(node, frames, options) {
    if (!node || this.engine.skipMode || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const animation = node.animate(frames, options);
    this.animations.add(animation);
    animation.finished.catch(() => {}).finally(() => this.animations.delete(animation));
  }

  setMode(mode) {
    const allowed = ['meeting', 'flash', 'manga', 'board', 'newspaper', 'yukkuri', 'aa', 'end'];
    if (!allowed.includes(mode)) return;
    this.engine.flags.bonus_mode = mode;
    this.screen.classList.add('bonus-running');
    this.screen.dataset.bonusMode = mode;
    this.layer.replaceChildren();
    this.layer.setAttribute('aria-hidden', 'true');
    if (mode !== 'flash') delete this.engine.flags.bonus_flash;
    if (mode !== 'board') delete this.engine.flags.bonus_board;
    if (mode === 'newspaper') {
      const picture = document.createElement('img');
      picture.className = 'bonus-board-picture bonus-newspaper-picture';
      picture.src = VN_BONUS.newspapers[this.english ? 'en' : 'ja'];
      picture.alt = this.text('学園新聞号外：実況者、選手転向直後に不正。写真提供・まひる。', 'School newspaper extra: Commentator caught cheating on debut. Photo by Mahiru.');
      this.layer.appendChild(picture);
    }
    if (mode === 'yukkuri' || mode === 'aa') {
      const heading = document.createElement('div');
      heading.className = 'bonus-format-heading';
      heading.textContent = mode === 'yukkuri'
        ? this.text('ゆっくり解説　文化祭が決まらない理由', 'Yukkuri explains: why nothing gets decided')
        : this.text('やる夫で学ぶ　文化祭の決め方', 'Yaruo learns: how to plan a festival');
      this.layer.appendChild(heading);
    }
  }

  board(view) {
    if (!['index', 'thread'].includes(view)) return;
    this.engine.flags.bonus_board = view;
    this.layer.replaceChildren();
    const picture = document.createElement('img');
    picture.className = 'bonus-board-picture';
    picture.src = VN_BONUS.boards[this.english ? 'en' : 'ja'][view];
    picture.alt = view === 'index'
      ? this.text('VIP風のスレッド一覧', 'Early imageboard thread index')
      : this.text('文化祭の相談スレ：詳細キボンヌとギコねこ', 'Anonymous festival thread: pics, sage and faces');
    this.layer.appendChild(picture);
  }

  flash(name) {
    if (!['gonorego', 'perry', 'files'].includes(name)) return;
    this.engine.flags.bonus_flash = name;
    this.layer.replaceChildren();
    const panel = document.createElement('div');
    panel.className = 'bonus-pc';
    const title = document.createElement('div');
    title.className = 'bonus-pc-title';
    title.textContent = this.text('図書室のPC — 参考動画', 'Library PC — Reference videos');
    const display = document.createElement('div');
    display.className = 'bonus-pc-display';
    const label = document.createElement('h2');
    const caption = document.createElement('p');
    if (name === 'gonorego') {
      label.textContent = this.text('ゴノレゴ', 'All Your Base');
      caption.textContent = this.text('「そんなことより聞いてくれよ、>>1よ」', '“All your base are belong to us.”');
      const face = document.createElement('pre');
      face.className = 'bonus-pc-aa';
      face.textContent = this.text('  ━━    ━━\n   ─     ─\n       /\n   ─────', '[ CATS ]\nINCOMING\nTRANSMISSION');
      display.appendChild(face);
    } else if (name === 'perry') {
      label.textContent = this.text('ペリーのお願い', 'Badgers');
      caption.textContent = this.text('「開国してくださいよぉ～。ねぇ～、いいでしょ～」', 'Badger badger badger…\nMushroom. Snake. Repeat.');
      display.classList.add('bonus-perry');
    } else {
      label.textContent = this.text('保存した参考動画', 'Saved reference videos');
      caption.textContent = this.text('▶ ゴノレゴ.mp4\n▶ ペリーのお願い.mp4\n▶ おわり.mp4', '▶ All Your Base.mp4\n▶ Badgers.mp4\n▶ ending.mp4');
    }
    display.append(label, caption);
    panel.append(title, display);
    this.layer.append(panel);
  }

  impact(kind) {
    if (this.engine.skipMode) return;
    const words = {
      ron: ['ロン！', 'RON!'], triple_ron: ['トリプルロン！', 'TRIPLE RON!'], gunya: ['ぐにゃあ〜', 'GU-NYAA…'],
      switch: ['画風が変わった！', 'STYLE CHANGED!'], apology: ['正直スマソかった。。。', 'Honestly, my bad…'],
      rights: ['購入権', 'RIGHT TO BUY'], bakuhai: ['爆牌！', 'BAKUHAI!'], chombo: ['チョンボ', 'CHOMBO'],
    };
    this.layer.querySelectorAll('.bonus-impact').forEach(node => node.remove());
    const word = document.createElement('div');
    word.className = 'bonus-impact bonus-impact-' + kind;
    word.textContent = (words[kind] || words.switch)[this.english ? 1 : 0];
    this.layer.appendChild(word);
    this.later(() => word.remove(), 900);
    this.animate(word, [{ transform: 'scale(2.2) rotate(-12deg)', opacity: 0 }, { transform: 'scale(1) rotate(-5deg)', opacity: 1, offset: .25 }, { transform: 'scale(1.08) rotate(-5deg)', opacity: 0 }], { duration: 900, easing: 'ease-out' });
    const target = this.engine.currentStill ? document.getElementById('still-layer') : document.getElementById('characters');
    const amplitude = kind === 'gunya' ? 15 : 7;
    this.animate(target, [{ transform: 'translateX(0) skewX(0)' }, { transform: `translateX(-${amplitude}px) skewX(-2deg)` }, { transform: `translateX(${amplitude}px) skewX(2deg)` }, { transform: `translateX(-${amplitude/2}px) skewX(-1deg)` }, { transform: 'translateX(0) skewX(0)' }], { duration: 700, easing: 'ease-in-out' });
  }

  bakuhai() {
    if (this.engine.skipMode) return;
    const stage = document.createElement('div');
    stage.className = 'bonus-bakuhai';
    const burst = document.createElement('div');
    burst.className = 'bonus-bakuhai-burst';
    const tile = document.createElement('div');
    tile.className = 'bonus-bakuhai-tile';
    tile.setAttribute('aria-label', this.text('六筒を打牌', 'Discard six of circles'));
    for (let i = 0; i < 6; i++) tile.appendChild(document.createElement('i'));
    stage.append(burst, tile);
    this.layer.appendChild(stage);
    this.impact('bakuhai');
    this.later(() => stage.remove(), 1050);
  }

  bow() {
    const state = this.engine.charState.center;
    const apply = () => {
      if (!state || this.engine.charState.center !== state) return;
      const actor = document.querySelector('#char-center .char-sprite');
      if (actor?._vnState !== state) { this.later(apply, 30); return; }
      this.animate(actor, [{ transform: 'translateY(0) rotate(0)' }, { transform: 'translateY(150px) rotate(76deg) scale(.83)' }], { duration: 650, fill: 'forwards', easing: 'ease-in' });
    };
    apply();
  }

  releaseVideo() {
    if (!this.videoElement) return;
    this.videoElement.pause();
    this.videoElement.removeAttribute('src');
    this.videoElement.load();
    this.videoElement = null;
  }

  video() {
    const e = this.engine;
    const epoch = this.epoch;
    const token = e._advanceToken;
    e._stopTypewriter();
    e.voice.stop();
    e._stopBGM();
    e._stopAllSE();
    e.skipMode = e.autoMode = false;
    e._inputLocked = true;
    e.waitingForInput = false;
    ['btn-skip', 'btn-auto'].forEach(id => document.getElementById(id).classList.remove('active'));
    const layer = document.createElement('section');
    layer.id = 'bonus-video';
    layer.setAttribute('aria-label', this.text('隕石衝突のオチ', 'The meteor punchline'));
    layer.addEventListener('click', event => event.stopPropagation());
    layer.addEventListener('keydown', event => event.stopPropagation());
    const video = document.createElement('video');
    video.id = 'bonus-video-player';
    video.src = 'assets/video/bonus-meteor.mp4';
    video.controls = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.volume = Math.max(0, Math.min(1, VN_CONFIG.settings.bgmVolume ?? .6));
    video.setAttribute('aria-label', this.text('隕石衝突・人類滅亡（最初から）', 'Meteor impact (from the beginning)'));
    const footer = document.createElement('div');
    footer.className = 'bonus-video-controls';
    const status = document.createElement('span');
    status.id = 'bonus-video-status';
    status.setAttribute('role', 'status');
    status.textContent = this.text('隕石、到着します。', 'The meteor is arriving.');
    const play = document.createElement('button');
    play.textContent = this.text('動画を再生', 'Play video');
    play.hidden = true;
    const skip = document.createElement('button');
    skip.id = 'bonus-video-skip';
    skip.textContent = this.text('動画をスキップ', 'Skip video');
    let finished = false;
    const current = () => !finished && this.active && epoch === this.epoch;
    const finish = () => {
      if (!current()) return;
      finished = true;
      this.releaseVideo();
      layer.remove();
      this.videoLayer = this.videoFinish = null;
      e._inputLocked = false;
      e._continueIfAdvanceTokenMatches(token);
    };
    const start = () => {
      if (!current()) return;
      if (video.error) video.load();
      video.play().catch(() => {
        if (!current()) return;
        play.hidden = false;
        status.textContent = this.text('再生ボタンを押してください。', 'Press Play to start.');
      });
    };
    play.onclick = start;
    skip.onclick = finish;
    video.onended = finish;
    video.onplaying = () => {
      if (!current()) return;
      play.hidden = true;
      status.textContent = this.text('隕石、到着します。', 'The meteor is arriving.');
    };
    video.onerror = () => {
      if (!current()) return;
      play.hidden = false;
      status.textContent = this.text('動画を読み込めませんでした。再生を試すか、スキップできます。', 'The video could not load. Retry or skip to continue.');
    };
    this.videoFinish = finish;
    footer.append(status, play, skip);
    layer.append(video, footer);
    this.screen.appendChild(layer);
    this.videoLayer = layer;
    this.videoElement = video;
    skip.focus({ preventScroll: true });
    start();
  }

  run(action, args = []) {
    const e = this.engine;
    if (action === 'offer') { this.offer(); return; }
    if (!this.active || !e.flags.bonus_run || !e.currentLabel.startsWith('bonus_')) {
      e._executeNext();
      return;
    }
    if (action === 'mode') this.setMode(args[0]);
    else if (action === 'flash') this.flash(args[0]);
    else if (action === 'board') this.board(args[0]);
    else if (action === 'impact') this.impact(args[0]);
    else if (action === 'bakuhai') this.bakuhai();
    else if (action === 'bow') this.bow();
    else if (action === 'video') { this.video(); return; }
    else if (action === 'endcard') { this.endcard(); return; }
    else if (action === 'finish') {
      if (e.currentLabel === 'bonus_leave' && this.returnToStory()) return;
      e._resetGameState();
      e.waitingForInput = false;
      e._showTitleScreen();
      return;
    }
    e._executeNext();
  }

  endcard() {
    const e = this.engine;
    e._stopTypewriter();
    e.voice.stop();
    e.skipMode = e.autoMode = false;
    e.waitingForInput = false;
    e._inputLocked = true;
    this.setMode('end');
    this.layer.removeAttribute('aria-hidden');
    this.screen.dataset.bonusMode = 'endcard';
    const epoch = this.epoch, token = e._advanceToken;
    const card = document.createElement('div');
    card.id = 'bonus-endcard';
    const image = document.createElement('img');
    image.src = VN_BONUS.endcard;
    image.alt = this.text('夕焼けの教室で笑い合う、さくら・ことは・まひる・勇・延原・先生の集合写真。', 'Sakura, Kotoha, Mahiru, Isamu, Nobuhara and their teacher sharing a smile in their sunset classroom.');
    const thanks = document.createElement('p');
    thanks.className = 'bonus-endcard-thanks';
    thanks.textContent = this.text('最後まで遊んでくれて、ありがとう。', 'Thank you for spending this afternoon with us.');
    const back = document.createElement('button');
    back.id = 'bonus-endcard-back';
    back.textContent = this.text('タイトルへ', 'Return to title');
    back.onclick = () => {
      if (!this.active || this.epoch !== epoch || e._advanceToken !== token) return;
      back.disabled = true;
      e._inputLocked = false;
      e._continueIfAdvanceTokenMatches(token);
    };
    card.append(image, thanks, back);
    this.layer.appendChild(card);
  }
}
