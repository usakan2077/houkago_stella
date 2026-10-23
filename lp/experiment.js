/* Compare separately shared URLs; this does not randomly redirect visitors. */
(() => {
  const variant = document.body.dataset.lpVariant || 'story';
  const gamePath = new URL('../index.html', document.currentScript.src).pathname;
  const send = (name, params = {}) => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, {
      lp_variant: variant,
      language: document.documentElement.lang,
      transport_type: 'beacon',
      ...params,
    });
  };
  send('lp_view');
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const target = new URL(link.href);
    if (target.origin !== location.origin || target.pathname !== gamePath) return;
    const position = link.dataset.cta || (link.closest('.hero') ? 'hero' : link.closest('.final-cta') ? 'footer' : 'other');
    send('lp_play_click', { cta_position: position });
  });
  const movie = document.querySelector('#lp-op');
  const syncMovieLanguage = () => {
    if (!movie) return;
    const source = movie.querySelector('source');
    const language = document.documentElement.lang === 'en' ? 'en' : 'ja';
    const target = movie.dataset[language === 'en' ? 'srcEn' : 'srcJa'];
    if (!source || !target || source.getAttribute('src') === target) return;
    const time = movie.currentTime;
    movie.pause();
    source.src = target;
    const link = movie.querySelector('a');
    if (link) link.href = target;
    if (time > 0) movie.addEventListener('loadedmetadata', () => {
      movie.currentTime = Math.min(time, movie.duration || time);
    }, { once: true });
    movie.load();
  };
  document.addEventListener('lp-language-change', syncMovieLanguage);
  syncMovieLanguage();
  movie?.addEventListener('playing', () => send('lp_op_play'), { once: true });
})();
