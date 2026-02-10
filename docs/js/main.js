/* ===== Stoked DS Landing Page ===== */

(function () {
  'use strict';

  // --- Theme Toggle ---
  var toggle = document.getElementById('theme-toggle');
  var html = document.documentElement;

  function getTheme() {
    return html.getAttribute('data-theme') || 'dark';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = getTheme() === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('stoked-theme', next);
    });
  }

  // --- Copy to Clipboard ---
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (!text) return;

      navigator.clipboard.writeText(text).then(function () {
        var iconCopy = btn.querySelector('.icon-copy');
        var iconCheck = btn.querySelector('.icon-check');
        if (iconCopy) iconCopy.style.display = 'none';
        if (iconCheck) iconCheck.style.display = 'block';
        btn.setAttribute('data-copied', 'true');

        setTimeout(function () {
          if (iconCopy) iconCopy.style.display = '';
          if (iconCheck) iconCheck.style.display = 'none';
          btn.removeAttribute('data-copied');
        }, 2000);
      });
    });
  });

  // --- Smooth Scroll + Active Nav ---
  var navLinks = document.querySelectorAll('.navbar-links a');
  var sections = document.querySelectorAll('section[id]');

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            if (link.getAttribute('href') === '#' + id) {
              link.setAttribute('data-active', 'true');
            } else {
              link.removeAttribute('data-active');
            }
          });
        }
      });
    },
    { rootMargin: '-20% 0px -60% 0px' }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });

  // --- Mobile Nav ---
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.setAttribute('data-open', String(!isOpen));
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('data-open', 'false');
      });
    });

    // Close on click outside
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('data-open', 'false');
      }
    });
  }
})();
