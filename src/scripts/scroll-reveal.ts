/** One-shot decorative focal moments. Content itself is always visible without JS. */
function initDecorativeMotion(): void {
  const targets = [...document.querySelectorAll<HTMLElement>('[data-motion]')];
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let observer: IntersectionObserver | undefined;

  const stop = () => {
    observer?.disconnect();
    targets.forEach((target) => target.classList.remove('motion-playing'));
  };

  const start = () => {
    stop();
    if (preference.matches || !('IntersectionObserver' in window)) return;
    try {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (!isIntersecting) return;
          const el = target as HTMLElement;
          el.classList.add('motion-playing');
          observer?.unobserve(el);
          window.setTimeout(() => el.classList.remove('motion-playing'), 700);
        });
      }, { threshold: 0.25 });
      targets.forEach((target) => observer?.observe(target));
    } catch {
      stop();
    }
  };

  preference.addEventListener('change', start);
  start();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDecorativeMotion, { once: true });
} else {
  initDecorativeMotion();
}
