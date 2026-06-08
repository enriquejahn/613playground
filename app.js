// 613 Playground — shared behaviour
document.addEventListener('DOMContentLoaded', () => {
  // mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  if (toggle && menu) toggle.addEventListener('click', () => menu.classList.toggle('open'));

  // dropdown menus (click to toggle; hover also works via CSS)
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dd => {
    const btn = dd.querySelector('.dropbtn');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdowns.forEach(o => { if (o !== dd) o.classList.remove('open'); });
      dd.classList.toggle('open');
    });
  });
  document.addEventListener('click', () => dropdowns.forEach(dd => dd.classList.remove('open')));

  // newsletter signup (placeholder until connected to an email tool)
  document.querySelectorAll('.news-form').forEach(f => {
    f.addEventListener('submit', e => {
      e.preventDefault();
      const email = f.querySelector('input[type="email"]');
      if (!email || !email.value || !email.checkValidity()) { email && email.focus(); return; }
      f.innerHTML = '<p class="news-msg">✓ Thanks! You\'re on the list.</p>';
    });
  });

  // lightbox for headshots & team photos
  const zoomables = document.querySelectorAll('.zoomable');
  if (zoomables.length) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    const lbImg = document.createElement('img');
    lb.appendChild(lbImg);
    document.body.appendChild(lb);
    const closeLb = () => lb.classList.remove('open');
    zoomables.forEach(img => img.addEventListener('click', () => {
      lbImg.onerror = () => { lbImg.onerror = null; lbImg.src = img.currentSrc || img.src; };
      lbImg.src = img.dataset.full || img.currentSrc || img.src;
      lb.classList.add('open');
    }));
    lb.addEventListener('click', closeLb);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
  }

  // scroll reveal
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  } else {
    els.forEach(el => el.classList.add('in'));
  }
});
