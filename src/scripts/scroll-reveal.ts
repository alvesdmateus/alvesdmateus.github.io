/**
 * Scroll-reveal — lightweight IntersectionObserver-based reveal animations.
 *
 * Usage:
 *   data-reveal              — marks an element for reveal (fade-up)
 *   data-reveal-delay="1"    — stagger index (each unit adds 100ms delay)
 *   data-reveal-delay="200"  — explicit ms delay (values >= 20 treated as ms)
 *
 * The observer adds the class `is-visible` when the element enters the viewport.
 * CSS handles the actual animation via [data-reveal] / [data-reveal].is-visible rules.
 */

function initScrollReveal(): void {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  if (prefersReducedMotion) {
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target as HTMLElement;

        const rawDelay = el.dataset.revealDelay;
        if (rawDelay) {
          const num = Number(rawDelay);
          const delayMs = num < 20 ? num * 100 : num;
          el.style.transitionDelay = `${delayMs}ms`;
        }

        el.classList.add('is-visible');

        el.addEventListener(
          'transitionend',
          () => {
            el.style.transitionDelay = '';
            el.style.willChange = '';
          },
          { once: true },
        );

        observer.unobserve(el);
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    },
  );

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    observer.observe(el);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}
