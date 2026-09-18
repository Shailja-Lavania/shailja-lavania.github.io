/* Plain JavaScript: mobile navigation, accessible slideshow and gentle reveals. */
(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  function closeMenu(returnFocus = false) {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  window.matchMedia('(min-width: 861px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });

  document.querySelectorAll('.slideshow').forEach(carousel => {
  const slides = [...carousel.querySelectorAll('.slide')];
  const pauseButton = carousel.querySelector('[data-slider="toggle-slideshow"]');
  const announcement = carousel.querySelector('[data-slider="slider-announcement"]');
  let current = 0;
  let paused = reducedMotion.matches;
  let timer;
  let hovering = false;
  let touching = false;
  let touchStart = null;
  function showSlide(index, announce = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.hidden = !active;
      slide.setAttribute('aria-hidden', String(!active));
      slide.classList.toggle('is-active', active);
      slide.classList.toggle('is-entering', active);
      if (active) slide.querySelector('img').loading = 'eager';
    });
    const selected = slides[current];
    carousel.querySelector('[data-slider="slide-title"]').textContent = selected.dataset.title;
    carousel.querySelector('[data-slider="slide-caption"]').textContent = selected.dataset.caption;
    carousel.querySelector('[data-slider="slide-number"]').textContent = String(current + 1).padStart(2, '0');
    if (announce) announcement.textContent = `Photograph ${current + 1} of ${slides.length}: ${selected.dataset.title}`;
  }
  function schedule() {
    window.clearInterval(timer);
    if (!paused && !hovering && !touching && !document.hidden && !carousel.contains(document.activeElement)) {
      timer = window.setInterval(() => showSlide(current + 1), 6500);
    }
  }
  function setPaused(value) {
    paused = value;
    pauseButton.textContent = paused ? 'Play' : 'Pause';
    pauseButton.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
    schedule();
  }
  function step(direction) {
    showSlide(current + direction, true);
    schedule();
  }
  carousel.querySelector('[data-slider="previous-slide"]').addEventListener('click', () => step(-1));
  carousel.querySelector('[data-slider="next-slide"]').addEventListener('click', () => step(1));
  pauseButton.addEventListener('click', () => setPaused(!paused));
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      step(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  carousel.addEventListener('mouseenter', () => { hovering = true; schedule(); });
  carousel.addEventListener('mouseleave', () => { hovering = false; schedule(); });
  carousel.addEventListener('focusin', schedule);
  carousel.addEventListener('focusout', () => window.setTimeout(schedule, 0));
  carousel.querySelector('.slides').addEventListener('touchstart', event => {
    touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    touching = true;
    schedule();
  }, { passive: true });
  carousel.querySelector('.slides').addEventListener('touchend', event => {
    if (touchStart) {
      const dx = event.changedTouches[0].clientX - touchStart.x;
      const dy = event.changedTouches[0].clientY - touchStart.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) step(dx < 0 ? 1 : -1);
    }
    touchStart = null;
    touching = false;
    schedule();
  }, { passive: true });
  carousel.querySelector('.slides').addEventListener('touchcancel', () => { touchStart = null; touching = false; schedule(); });
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', event => { if (event.matches) setPaused(true); });
  setPaused(paused);
  });

  if ('IntersectionObserver' in window) {
    if (!reducedMotion.matches) {
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.06 });
      document.querySelectorAll('.section-heading, .featured-research, .publication, .impact-numbers, .experience-heading, .contact-grid').forEach(element => {
        element.classList.add('reveal-ready');
        revealObserver.observe(element);
      });
    }
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navigation.querySelectorAll('a').forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -55% 0px' });
    document.querySelectorAll('main > section[id]').forEach(section => sectionObserver.observe(section));
  }
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
