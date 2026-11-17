(() => {
  const section = document.querySelector('[data-voice-samples]');
  if (!section) return;
  const buttons = [...section.querySelectorAll('.voice-play')];
  const translations = [...section.querySelectorAll('[data-en]')];
  const japanese = new Map(translations.map(node => [node, node.innerHTML]));
  const images = [...section.querySelectorAll('[data-alt-en]')];
  const japaneseAlts = new Map(images.map(node => [node, node.alt]));
  const audio = new Audio();
  audio.preload = 'none';
  audio.volume = 0.85;
  let active = null, sequence = 0, context = null, gain = null;
  const language = () => document.documentElement.lang;
  const audioLanguage = () => language().startsWith('zh-') ? language() : language() === 'en' ? 'en' : 'ja';
  const labelLanguage = () => language() === 'en' ? 'en' : 'ja';
  const labels = {ja: {play:'声を聴く', stop:'停止する', loading:'読み込み中', error:'音声を再生できませんでした。もう一度お試しください。'}, en: {play:'Listen', stop:'Stop', loading:'Loading', error:'Unable to play the sample. Please try again.'}};
  const status = section.querySelector('.voice-status');
  function updateButtons() {
    const text = Object.fromEntries(Object.entries(labels[labelLanguage()]).map(([key, value]) => [key, globalThis.StellaI18n?.text(value, language()) ?? value]));
    buttons.forEach(button => {
      const selected = active === button;
      button.setAttribute('aria-pressed', String(selected));
      const loading = selected && button.dataset.state === 'loading';
      button.querySelector('.voice-play-label').textContent = loading ? text.loading : selected ? text.stop : text.play;
      button.querySelector('.voice-play-icon').textContent = selected ? '■' : '▶';
      const card = button.closest('[data-voice-character]');
      const name = audioLanguage() === 'en' ? card.dataset.nameEn : (globalThis.StellaI18n?.text(card.dataset.nameJa, language()) ?? card.dataset.nameJa);
      button.setAttribute('aria-label', name + ': ' + (selected ? text.stop : text.play));
    });
  }
  function stop() {
    sequence++;
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    if (active) delete active.dataset.state;
    active = null;
    updateButtons();
  }
  function localize() {
    stop();
    const en = language() === 'en';
    translations.forEach(node => {if (en) node.textContent = node.dataset.en; else node.innerHTML = japanese.get(node);});
    images.forEach(node => {node.alt = en ? node.dataset.altEn : japaneseAlts.get(node);});
    status.textContent = '';
    globalThis.StellaI18n?.localizeDocument(language());
    updateButtons();
  }
  buttons.forEach(button => button.addEventListener('click', async () => {
    if (active === button) {stop(); return;}
    stop();
    document.querySelectorAll('video').forEach(video => video.pause());
    const ticket = sequence;
    active = button;
    button.dataset.state = 'loading';
    status.textContent = '';
    globalThis.StellaI18n?.localizeDocument(language());
    updateButtons();
    try {
      const Context = window.AudioContext || window.webkitAudioContext;
      if (!context && Context) {
        context = new Context();
        gain = context.createGain();
        context.createMediaElementSource(audio).connect(gain);
        gain.connect(context.destination);
      }
      const lang = audioLanguage();
      let src = button.dataset[lang + 'Src'], gainDb = Number(button.dataset[lang + 'Gain'] || 0);
      if (lang.startsWith('zh-')) {
        const base = new URL(document.currentScript?.src || document.querySelector('script[src*="voice-preview.js"]').src);
        const root = new URL('../', base);
        const response = await fetch(new URL(`assets/voice/${lang}/manifest.json`, root));
        if (!response.ok) throw new Error('Voice manifest unavailable');
        const manifest = await response.json();
        if (manifest.language !== lang) throw new Error('Wrong voice language');
        const clip = manifest.clips[button.dataset.voiceId];
        if (!clip) throw new Error('Voice sample unavailable');
        src = new URL(clip.src, root).href; gainDb = clip.gainDb || 0;
      }
      if (ticket !== sequence) return;
      if (gain) gain.gain.value = 10 ** (gainDb / 20);
      audio.src = src;
      if (context) await context.resume();
      if (ticket !== sequence) return;
      await audio.play();
      if (ticket !== sequence) return;
      button.dataset.state = 'playing';
      updateButtons();
    } catch (error) {
      if (ticket !== sequence) return;
      stop();
      status.textContent = globalThis.StellaI18n?.text(labels[labelLanguage()].error, language()) ?? labels[labelLanguage()].error;
    }
  }));
  audio.addEventListener('ended', stop);
  audio.addEventListener('error', () => {
    if (!active) return;
    stop(); status.textContent = globalThis.StellaI18n?.text(labels[labelLanguage()].error, language()) ?? labels[labelLanguage()].error;
  });
  document.addEventListener('lp-language-change', localize);
  document.addEventListener('visibilitychange', () => {if (document.hidden) stop();});
  window.addEventListener('pagehide', stop);
  document.querySelectorAll('video').forEach(video => video.addEventListener('play', stop));
  document.addEventListener('click', event => {if (event.target.closest('a[href]') && !event.target.closest('a[href^="#"]')) stop();});
  localize();
})();
