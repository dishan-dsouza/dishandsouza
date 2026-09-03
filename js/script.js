/* =========================================================
   DISHAN VINOY D SOUZA — PORTFOLIO INTERACTIONS
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll cue ---------- */
  const scrollCue = document.getElementById('scroll-cue');
  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- Active section highlighting ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinkMap = {};
  document.querySelectorAll('.nav-link').forEach(link => {
    navLinkMap[link.dataset.section] = link;
  });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        Object.values(navLinkMap).forEach(l => l.classList.remove('active'));
        const link = navLinkMap[entry.target.id];
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('in-view'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
      revealObserver.observe(el);
    });
  }

  /* ---------- Stat counters ---------- */
  const statEls = document.querySelectorAll('.stat-number');
  const animateStat = (el) => {
    const target = parseInt(el.dataset.target, 10);
    if (prefersReducedMotion) { el.textContent = target; return; }
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  statEls.forEach(el => statObserver.observe(el));

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('back-to-top');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  /* ---------- Ambient ledger-grid background ---------- */
  const gridCanvas = document.getElementById('ledger-grid');
  if (gridCanvas && !prefersReducedMotion) {
    const ctx = gridCanvas.getContext('2d');
    let w, h, offset = 0;

    const resizeGrid = () => {
      w = gridCanvas.width = window.innerWidth;
      h = gridCanvas.height = window.innerHeight;
    };
    resizeGrid();
    window.addEventListener('resize', resizeGrid);

    const cell = 64;
    const drawGrid = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.045)';
      ctx.lineWidth = 1;

      for (let x = -cell + (offset % cell); x < w + cell; x += cell) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = -cell + (offset % cell); y < h + cell; y += cell) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      offset += 0.06;
      requestAnimationFrame(drawGrid);
    };
    drawGrid();
  } else if (gridCanvas) {
    // Static grid for reduced-motion users
    const ctx = gridCanvas.getContext('2d');
    const w = gridCanvas.width = window.innerWidth;
    const h = gridCanvas.height = window.innerHeight;
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.045)';
    const cell = 64;
    for (let x = 0; x < w; x += cell) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke(); }
    for (let y = 0; y < h; y += cell) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }
  }

  /* ---------- Hero: animated financial data stream ---------- */
  const chartCanvas = document.getElementById('ledger-chart');
  if (chartCanvas) {
    const ctx = chartCanvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resizeChart = () => {
      const rect = chartCanvas.getBoundingClientRect();
      chartCanvas.width = rect.width * dpr;
      chartCanvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeChart();
    window.addEventListener('resize', resizeChart);

    // Generate a plausible upward "financial growth" series with noise
    const points = 42;
    const series = [];
    let val = 40;
    for (let i = 0; i < points; i++) {
      val += (Math.random() - 0.35) * 8;
      val = Math.max(20, Math.min(90, val));
      series.push(val);
    }

    let progress = 0;
    const drawChart = () => {
      const rect = chartCanvas.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const visiblePoints = prefersReducedMotion ? points : Math.floor(points * progress);
      if (visiblePoints < 2) {
        if (!prefersReducedMotion) { progress += 0.012; requestAnimationFrame(drawChart); }
        return;
      }

      const stepX = w / (points - 1);
      const toY = (v) => h - (v / 100) * h * 0.82 - h * 0.06;

      // Grid baseline ticks (ledger feel)
      ctx.strokeStyle = 'rgba(148, 163, 194, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 1; i < 4; i++) {
        const y = (h / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Area fill
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, 'rgba(34, 211, 238, 0.22)');
      gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');

      ctx.beginPath();
      ctx.moveTo(0, toY(series[0]));
      for (let i = 1; i < visiblePoints; i++) {
        ctx.lineTo(i * stepX, toY(series[i]));
      }
      ctx.lineTo((visiblePoints - 1) * stepX, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Line
      ctx.beginPath();
      ctx.moveTo(0, toY(series[0]));
      for (let i = 1; i < visiblePoints; i++) {
        ctx.lineTo(i * stepX, toY(series[i]));
      }
      ctx.strokeStyle = '#22D3EE';
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Leading point glow
      if (visiblePoints < points) {
        const lastX = (visiblePoints - 1) * stepX;
        const lastY = toY(series[visiblePoints - 1]);
        ctx.beginPath();
        ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#F0B429';
        ctx.shadowColor = '#F0B429';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (!prefersReducedMotion && visiblePoints < points) {
        progress += 0.012;
        requestAnimationFrame(drawChart);
      }
    };
    drawChart();
  }
});
