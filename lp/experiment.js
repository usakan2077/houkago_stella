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
  movie?.addEventListener('playing', () => send('lp_op_play'), { once: true });
})();
