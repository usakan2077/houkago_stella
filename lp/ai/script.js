(() => {
  const nodes = [...document.querySelectorAll('[data-en]')];
  const originals = new Map(nodes.map(node => [node, node.dataset.ja ?? node.innerHTML]));
  const images = [...document.querySelectorAll('[data-alt-en]')];
  const originalAlts = new Map(images.map(node => [node, node.dataset.jaAlt ?? node.alt]));
  const toggle = document.querySelector('.stella-language-select');
  const titles = {
    ja: document.documentElement.dataset.jaTitle || document.title,
    en: 'One creator, spare moments, and AI. | After School Stella',
  };
  const descriptions = {
    ja: document.documentElement.dataset.jaDescription || document.querySelector('meta[name="description"]').content,
    en: 'A visual novel made by one creator with AI, in spare moments. Discover the story, art, and opening movie. Play the complete game free in your browser.',
  };
  function apply(language) {
    language = StellaI18n.normalize(language);
    const source = language === 'en' ? 'en' : 'ja';
    const localize = text => StellaI18n.text(text, language);
    document.documentElement.lang = language;
    document.dispatchEvent(new CustomEvent("lp-language-change", {detail:{language}}));
    document.title = localize(titles[source]);
    nodes.forEach(node => {
      if (language === 'en') node.textContent = node.dataset.en;
      else node.innerHTML = originals.get(node);
    });
    images.forEach(node => { node.alt = language === 'en' ? node.dataset.altEn : originalAlts.get(node); });
    for (const name of ['description', 'og:description', 'twitter:description']) {
      document.querySelector(`meta[name="${name}"],meta[property="${name}"]`).content = localize(descriptions[source]);
    }
    for (const name of ['og:title', 'twitter:title']) {
      document.querySelector(`meta[name="${name}"],meta[property="${name}"]`).content = localize(titles[source]);
    }
    toggle.value = language;
    StellaMedia.apply(language, {updateUrl:true});
    StellaI18n.localizeDocument(language);
    toggle.setAttribute('aria-label', language === 'en' ? 'Language' : localize('言語を選択'));
    document.querySelector('nav').setAttribute('aria-label', language === 'en' ? 'Page navigation' : localize('ページ内ナビゲーション'));
    document.querySelector('#lp-op').setAttribute('aria-label', language === 'en' ? 'After School Stella opening movie' : localize('放課後のステラ オープニングムービー'));
    try { localStorage.setItem('vn_language', language); } catch (_) {}
  }
  let initial = StellaMedia.initialLanguage();
  apply(initial);
  toggle.addEventListener('change', () => apply(toggle.value));
})();
