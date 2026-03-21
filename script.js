/* ============================================================
   NDEIYA HOUSE — Shared JavaScript
   ============================================================ */

// ---- Nav scroll behaviour ----
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ---- Mobile nav toggle ----
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const mobile = document.querySelector('.nav-mobile');
  if (!toggle || !mobile) return;
  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    mobile.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  // Close on link click
  mobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobile.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ---- Active nav link ----
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ---- Scroll reveal ----
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

// ---- FAQ accordion ----
(function () {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

// ---- Enquiry form ----
(function () {
  const form = document.querySelector('.enquiry-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      showToast('Thank you! We\'ll be in touch within 24 hours.');
      form.reset();
      btn.textContent = 'Send Enquiry';
      btn.disabled = false;
    }, 1200);
  });
})();

// ---- Toast ----
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ---- Parallax hero (subtle) ----
(function () {
  const hero = document.querySelector('.hero-bg, .page-hero-bg');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    hero.style.transform = `translateY(${window.scrollY * 0.25}px)`;
  }, { passive: true });
})();

// ---- Gallery lightbox ----
(function () {
  const imgs = document.querySelectorAll('.gallery-img');
  if (!imgs.length) return;
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(44,36,22,0.95);z-index:999;display:none;align-items:center;justify-content:center;cursor:zoom-out;';
  const img = document.createElement('img');
  img.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;border-radius:4px;box-shadow:0 32px 80px rgba(0,0,0,0.6);';
  overlay.appendChild(img);
  document.body.appendChild(overlay);
  imgs.forEach(el => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => {
      img.src = el.src || el.querySelector('img')?.src || '';
      overlay.style.display = 'flex';
    });
  });
  overlay.addEventListener('click', () => { overlay.style.display = 'none'; });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') overlay.style.display = 'none'; });
})();
