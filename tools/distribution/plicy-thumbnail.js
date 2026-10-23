/* PLiCy reads the first canvas; the VN itself keeps its normal HTML renderer. */
(() => {
  const canvas = document.createElement('canvas');
  canvas.id = 'plicy-thumbnail';
  canvas.width = 1280;
  canvas.height = 720;
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:fixed;left:-10000px;top:0;pointer-events:none;width:1280px;height:720px';
  document.body.prepend(canvas);
  const image = new Image();
  image.onload = () => {
    const ctx = canvas.getContext('2d');
    const scale = Math.min(canvas.width / image.width, canvas.height / image.height);
    ctx.fillStyle = '#100d23';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, (canvas.width - image.width * scale) / 2,
      (canvas.height - image.height * scale) / 2, image.width * scale, image.height * scale);
    canvas.dataset.ready = 'true';
  };
  image.src = 'portal-thumbnail.jpg';
})();
