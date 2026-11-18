/* Fetch the optional X widget only when its section approaches the viewport. */
(() => {
  const host = document.querySelector('.x-embed-shell');
  if (!host) return;
  let loaded = false;
  function load() {
    if (loaded) return;
    loaded = true;
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    document.body.append(script);
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      load();
    }, {rootMargin: '400px'});
    observer.observe(host);
  } else if (document.readyState === 'complete') load();
  else window.addEventListener('load', load, {once: true});
})();
