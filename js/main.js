
document.addEventListener('DOMContentLoaded', function () {

  /* ---------------- Navbar: scrolled state + mobile toggle ---------------- */
  let nav = document.querySelector('.site-nav');
  let toggle = document.querySelector('.nav-toggle');

  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 12) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');

    let backTop = document.querySelector('.back-to-top');
    if (backTop) {
      if (window.scrollY > 480) backTop.classList.add('is-visible');
      else backTop.classList.remove('is-visible');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('nav-open');
    });
    // Close mobile menu when a link is tapped
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () { nav.classList.remove('nav-open'); });
    });
  }

  let backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------- Animated stat counters ---------------- */
  let counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    let counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        let el = entry.target;
        let target = parseFloat(el.getAttribute('data-count'));
        let suffix = el.getAttribute('data-suffix') || '';
        let duration = 1400;
        let start = null;

        function step(ts) {
          if (!start) start = ts;
          let progress = Math.min((ts - start) / duration, 1);
          let eased = 1 - Math.pow(1 - progress, 3);
          let value = target * eased;
          el.textContent = (target % 1 === 0 ? Math.round(value) : value.toFixed(1)) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ---------------- Blog category filter ---------------- */

  let filterButtons = document.querySelectorAll('.blog-filter button');
  let blogCards = document.querySelectorAll('[data-category]');
  if (filterButtons.length && blogCards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        let cat = btn.getAttribute('data-filter');
        blogCards.forEach(function (card) {
          let match = cat === 'all' || card.getAttribute('data-category') === cat;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }


  /* ---------------- Set active nav link based on current page ---------------- */
    let path = window.location.pathname.split('/').pop();

    // Treat the root URL as index.html
    if (!path || path === '/') {
      path = 'index.html';
    }

    document.querySelectorAll('.nav-links a').forEach(function (link) {
      let href = link.getAttribute('href');

      link.classList.toggle('is-active', href === path);
    });

});
