const btns = document.querySelectorAll<HTMLButtonElement>('[data-view-btn]');
const panels = document.querySelectorAll<HTMLElement>('[data-view-panel]');

btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.viewBtn as string;

    // Update button states
    btns.forEach((b) => {
      const isActive = b === btn;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-pressed', String(isActive));
    });

    // Show/hide panels
    panels.forEach((panel) => {
      if (panel.dataset.viewPanel === view) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });
  });
});
