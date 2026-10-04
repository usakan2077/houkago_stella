/* Startup OP and title-screen attract playback. Story intro remains separate. */
class OpeningMovie {
  constructor(engine) {
    this.engine = engine;
    this.screen = document.getElementById('op-movie-screen');
    this.video = document.getElementById('op-movie');
    this.playButton = document.getElementById('op-movie-play');
    this.skipButton = document.getElementById('op-movie-skip');
    this.phase = 'idle';
    this.idleSince = null;
    this.focused = document.hasFocus();
    this.failed = false;
    this.video.src = VN_CONFIG.openingMovie || '';
    this.video.addEventListener('ended', () => this.finish());
    this.video.addEventListener('error', () => this.fail());
    this.video.addEventListener('waiting', () => this.watchBuffering());
    this.video.addEventListener('playing', () => clearTimeout(this.bufferTimer));
    this.playButton.addEventListener('click', e => {
      e.stopPropagation();
      this.resume();
    });
    this.screen.addEventListener('click', e => {
      e.stopPropagation();
      this.finish();
    });
    document.addEventListener('keydown', e => {
      if (this.phase === 'idle') return;
      // Do not let skipping also activate a title button or a game shortcut.
      e.stopImmediatePropagation();
      if (['Space', 'Enter', 'Escape'].includes(e.code)) {
        e.preventDefault();
        if (e.repeat) return;
        if (e.code !== 'Escape' && !this.playButton.hidden) this.resume();
        else this.finish();
      } else if (e.code === 'Tab') {
        e.preventDefault();
        (this.playButton.hidden ? this.skipButton : this.playButton).focus();
      }
    }, true);
    for (const name of ['pointermove', 'pointerdown', 'keydown', 'wheel']) {
      document.addEventListener(name, () => this.resetIdle(), { capture: true, passive: true });
    }
    window.addEventListener('blur', () => { this.focused = false; this.resetIdle(); });
    window.addEventListener('focus', () => { this.focused = true; this.resetIdle(); });
    document.addEventListener('visibilitychange', () => {
      this.resetIdle();
      if (this.phase !== 'playing') return;
      if (document.hidden) {
        this.video.pause();
        clearTimeout(this.bufferTimer);
      } else this.resume();
    });
    // Poll eligibility too: modals, loading, gameplay and hidden tabs suspend
    // the countdown even when their state changes without user input.
    this.idleTimer = setInterval(() => {
      if (!this.canReplay()) { this.idleSince = null; return; }
      if (this.idleSince === null) this.idleSince = performance.now();
      if (performance.now() - this.idleSince >= (VN_CONFIG.openingMovieIdleMs ?? 10000)) this.play();
    }, 250);
  }

  canReplay() {
    return !!VN_CONFIG.openingMovie && !this.failed && this.phase === 'idle'
      && this.focused && !document.hidden && !this.engine._gameActive
      && !document.getElementById('title-screen').classList.contains('hidden')
      && !document.querySelector('.modal:not(.hidden), #debug-jump-overlay')
      && document.getElementById('loading-screen').classList.contains('hidden');
  }

  resetIdle() { this.idleSince = null; }

  play() {
    if (this.phase !== 'idle') return;
    if (!VN_CONFIG.openingMovie || this.failed) { this.engine._showTitleScreen(); return; }
    this.phase = 'playing';
    this.resetIdle();
    this.engine._stopBGM();
    this.engine.titleFx.stop();
    this.engine._gameActive = false;
    document.getElementById('title-screen').classList.add('hidden');
    this.screen.classList.remove('hidden', 'op-black', 'op-reveal');
    const english = this.engine.currentLanguage === 'en';
    this.playButton.textContent = english ? 'Play opening' : 'OPを再生';
    this.skipButton.textContent = english ? 'Skip to title' : 'タイトルへスキップ';
    this.video.currentTime = 0;
    this.video.muted = VN_CONFIG.settings.bgmVolume === 0;
    try { this.video.volume = Math.max(0, Math.min(1, VN_CONFIG.settings.bgmVolume)); } catch (_) {}
    this.skipButton.focus({ preventScroll: true });
    this.resume();
  }

  resume() {
    if (this.phase !== 'playing') return;
    this.playButton.hidden = true;
    this.watchBuffering();
    // Called directly from the loading OK / playback button gesture.
    this.video.play().catch(error => {
      if (this.phase !== 'playing' || document.hidden) return;
      clearTimeout(this.bufferTimer);
      if (error.name === 'NotAllowedError') {
        this.playButton.hidden = false;
        this.playButton.focus();
      } else if (error.name !== 'AbortError') this.fail();
    });
  }

  watchBuffering() {
    clearTimeout(this.bufferTimer);
    if (this.phase === 'playing' && !document.hidden) {
      this.bufferTimer = setTimeout(() => this.fail(), 20000);
    }
  }

  fail() {
    // A missing/unsupported movie must not trap the player in an attract loop.
    this.failed = true;
    if (this.phase === 'playing') this.finish();
  }

  finish() {
    if (this.phase !== 'playing') return;
    this.phase = 'fading';
    clearTimeout(this.bufferTimer);
    this.playButton.hidden = true;
    this.screen.classList.add('op-black');
    const began = performance.now();
    const volume = this.video.volume;
    const fadeSound = now => {
      if (this.phase !== 'fading') return;
      const p = Math.min(1, (now - began) / 650);
      try { this.video.volume = volume * (1 - p); } catch (_) {}
      if (p < 1) requestAnimationFrame(fadeSound);
    };
    requestAnimationFrame(fadeSound);
    setTimeout(() => {
      this.video.pause();
      // Show the title only after the video has faded completely to black.
      this.engine._showTitleScreen();
      this.screen.classList.add('op-reveal');
      this.phase = 'revealing';
      setTimeout(() => {
        this.screen.classList.add('hidden');
        this.phase = 'idle';
        this.resetIdle();
        document.getElementById('btn-newgame').focus({ preventScroll: true });
      }, 450);
    }, 650);
  }
}
