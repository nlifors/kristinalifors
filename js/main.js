// Header solid-on-scroll
(function() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Mobile nav toggle
(function() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
    document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// Hero slider — fade between slides
(function() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length < 2) return;

  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
  }, 6000);
})();

// Enquiry form — friendly client-side acknowledgement
(function() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;
  const btn = form.querySelector('button[type="submit"]');
  const original = btn ? btn.textContent : '';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (btn) {
      btn.textContent = "Thank you — we'll be in touch";
      btn.disabled = true;
    }
    form.reset();
    setTimeout(() => {
      if (btn) { btn.textContent = original; btn.disabled = false; }
    }, 6000);
  });
})();

// Scroll reveal
(function() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => io.observe(el));
})();
