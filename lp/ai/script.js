(() => {
  const nodes = [...document.querySelectorAll('[data-en]')];
  const originals = new Map(nodes.map(node => [node, node.innerHTML]));
  const images = [...document.querySelectorAll('[data-alt-en]')];
  const originalAlts = new Map(images.map(node => [node, node.alt]));
  const toggle = document.querySelector('.language');
  const titles = {
    ja: document.title,
    en: 'One creator, spare moments, and AI. | After School Stella',
  };
  const descriptions = {
    ja: document.querySelector('meta[name="description"]').content,
    en: 'A visual novel made by one creator with AI, in spare moments. Discover the story, art, and opening movie. Play the complete game free in your browser.',
  };
  function apply(language) {
    document.documentElement.lang = language;
    document.title = titles[language];
    nodes.forEach(node => {
      if (language === 'en') node.textContent = node.dataset.en;
      else node.innerHTML = originals.get(node);
    });
    images.forEach(node => { node.alt = language === 'en' ? node.dataset.altEn : originalAlts.get(node); });
    for (const name of ['description', 'og:description', 'twitter:description']) {
      document.querySelector(`meta[name="${name}"],meta[property="${name}"]`).content = descriptions[language];
    }
    for (const name of ['og:title', 'twitter:title']) {
      document.querySelector(`meta[name="${name}"],meta[property="${name}"]`).content = titles[language];
    }
    toggle.textContent = language === 'ja' ? 'EN' : 'JP';
    toggle.setAttribute('aria-label', language === 'ja' ? 'Switch to English' : '日本語に切り替え');
    document.querySelector('nav').setAttribute('aria-label', language === 'ja' ? 'ページ内ナビゲーション' : 'Page navigation');
    document.querySelector('#lp-op').setAttribute('aria-label', language === 'ja' ? '放課後のステラ オープニングムービー' : 'After School Stella opening movie');
    try { localStorage.setItem('vn_language', language); } catch (_) {}
  }
  let initial = 'ja';
  try { if (localStorage.getItem('vn_language') === 'en') initial = 'en'; } catch (_) {}
  apply(initial);
  toggle.addEventListener('click', () => apply(document.documentElement.lang === 'ja' ? 'en' : 'ja'));
})();
