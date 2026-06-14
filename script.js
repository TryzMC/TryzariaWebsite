/* ============================================================
   script.js — Geoffrey Douaud Rénove Habitat
   Features: Preloader, Custom Cursor, Canvas Hero,
   Scroll Progress, Navbar, Mobile Menu,
   Intersection Observer, Counter Animation, Form
============================================================ */

// ============================================================
// 1. PRELOADER
// ============================================================
(function () {
  const preloader = document.getElementById('preloader');
  const fill      = document.getElementById('preloaderFill');
  const pct       = document.getElementById('preloaderPct');
  let progress    = 0;
  const interval  = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('done');
        // Trigger hero animations
        document.querySelectorAll('.reveal-up').forEach(el => {
          el.classList.add('visible');
        });
        startCounters();
      }, 300);
    }
    fill.style.width = progress + '%';
    pct.textContent  = Math.floor(progress) + '%';
  }, 60);
})();

// ============================================================
// 2. CUSTOM CURSOR
// ============================================================
(function () {
  if (window.innerWidth < 768) return;
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .svc-card, .af-item, .cli-item').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

// ============================================================
// 3. CANVAS HERO — Particle Network
// ============================================================
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;
  const COUNT = 70;
  const MAX_DIST = 140;
  const ORANGE = [255, 107, 26];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', () => { resize(); init(); });
  resize();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r  = Math.random() * 2 + 1;
      this.o  = Math.random() * 0.5 + 0.1;
      this.type = Math.random() > 0.8 ? 'orange' : 'gray';
    }
    move() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      if (this.type === 'orange') {
        ctx.fillStyle = `rgba(${ORANGE[0]},${ORANGE[1]},${ORANGE[2]},${this.o})`;
      } else {
        ctx.fillStyle = `rgba(100,100,100,${this.o * 0.5})`;
      }
      ctx.fill();
    }
  }

  function init() {
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          const alpha = (1 - d / MAX_DIST) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255,107,26,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.move(); p.draw(); });
    connect();
    requestAnimationFrame(loop);
  }

  init();
  loop();
})();

// ============================================================
// 4. SCROLL PROGRESS BAR
// ============================================================
(function () {
  const bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const max = document.body.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / max) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
})();

// ============================================================
// 5. NAVBAR SCROLL EFFECT
// ============================================================
(function () {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

// ============================================================
// 6. MOBILE BURGER MENU
// ============================================================
(function () {
  const burger  = document.getElementById('navBurger');
  const overlay = document.getElementById('mobileOverlay');
  const links   = document.querySelectorAll('.mob-link');

  function toggle() {
    burger.classList.toggle('active');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  }
  function close() {
    burger.classList.remove('active');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', toggle);
  links.forEach(l => l.addEventListener('click', close));
})();

// ============================================================
// 7. INTERSECTION OBSERVER — REVEAL
// ============================================================
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll(
    '.reveal-left, .reveal-right, .reveal-card, .section-label'
  ).forEach(el => observer.observe(el));
})();

// ============================================================
// 8. COUNTER ANIMATION
// ============================================================
function startCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = +el.getAttribute('data-target');
    const duration = 1800;
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      // ease out quad
      const eased = 1 - (1 - t) * (1 - t);
      el.textContent = Math.floor(eased * target);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  });
}

// Also trigger counters when about section enters viewport
(function () {
  let done = false;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !done) {
        done = true;
        // only re-run for about counters
        document.querySelectorAll('.avy-num').forEach(el => {
          const target = +el.getAttribute('data-target');
          const duration = 1600;
          const start = performance.now();
          function step(now) {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - (1 - t) * (1 - t);
            el.textContent = Math.floor(eased * target);
            if (t < 1) requestAnimationFrame(step);
            else el.textContent = target;
          }
          requestAnimationFrame(step);
        });
      }
    });
  }, { threshold: 0.4 });
  const about = document.getElementById('about');
  if (about) observer.observe(about);
})();

// ============================================================
// 9. HERO PARALLAX
// ============================================================
(function () {
  const heroContent = document.querySelector('.hero-content');
  const decoText    = document.querySelector('.hero-deco-text');
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight * 1.2) {
      const y = window.scrollY;
      if (heroContent) heroContent.style.transform = `translateY(${y * 0.25}px)`;
      if (decoText)    decoText.style.transform    = `translateY(${y * 0.15}px)`;
    }
  }, { passive: true });
})();

// ============================================================
// 10. SERVICE CARD SUBTLE 3D TILT
// ============================================================
(function () {
  document.querySelectorAll('.svc-card:not(.svc-card--cta)').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// ============================================================
// 11. CONTACT FORM
// ============================================================
(function () {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('cfSuccess');
  const btn     = document.getElementById('cfSubmit');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const origHTML = btn.innerHTML;
    btn.innerHTML = `<span class="cfs-text">Envoi en cours…</span><span class="cfs-icon"><i class="fas fa-circle-notch fa-spin"></i></span>`;
    btn.disabled = true;

    // Simulate async send (replace with EmailJS or Netlify Forms)
    setTimeout(() => {
      success.classList.add('show');
      form.reset();
      btn.innerHTML = origHTML;
      btn.disabled  = false;

      // Scroll to success
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });

      setTimeout(() => success.classList.remove('show'), 7000);
    }, 1600);
  });
})();

// ============================================================
// 12. SMOOTH ACTIVE NAV LINKS ON SCROLL
// ============================================================
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nm-link:not(.nm-cta)');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(l => {
      l.style.color = l.getAttribute('href') === `#${current}` ? 'var(--white)' : '';
    });
  }, { passive: true });
})();
