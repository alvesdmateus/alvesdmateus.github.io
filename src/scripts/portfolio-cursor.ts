/** Event-driven enhancement; preserve the native pointer and text selection. */
const cursor = document.querySelector<HTMLElement>('[data-cursor-overlay]');
if (cursor) {
  const fineMouse = matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const editable = 'input,textarea,select,[contenteditable]:not([contenteditable="false"])';
  let frame = 0;
  let dragging = false;
  const hide = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    cursor.classList.remove('is-enabled', 'is-action');
  };
  document.addEventListener('pointermove', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const action = target?.closest<HTMLElement>('a,button,[data-cursor]');
    const text = target?.closest('p,h1,h2,h3,h4,label,pre,code,li,span');
    if (!fineMouse.matches || reduced.matches || event.pointerType !== 'mouse' || dragging ||
      target?.closest(editable) || document.activeElement?.matches(editable) ||
      (text && !action) || window.getSelection()?.toString()) {
      hide();
      return;
    }
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      frame = 0;
      cursor.style.transform = `translate3d(${event.clientX - 20}px,${event.clientY - 20}px,0)`;
      cursor.dataset.theme = target?.closest<HTMLElement>('[data-cursor-theme]')?.dataset.cursorTheme
        ?? cursor.dataset.baseTheme ?? 'selector';
      cursor.classList.add('is-enabled');
      cursor.classList.toggle('is-action', Boolean(action));
    });
  }, { passive: true });
  document.addEventListener('pointerdown', () => { dragging = true; hide(); }, { passive: true });
  document.addEventListener('pointerup', () => { dragging = false; }, { passive: true });
  document.addEventListener('pointercancel', () => { dragging = false; hide(); });
  document.addEventListener('keydown', hide);
  document.addEventListener('focusin', hide);
  document.addEventListener('selectionchange', () => { if (window.getSelection()?.toString()) hide(); });
  document.addEventListener('visibilitychange', hide);
  document.addEventListener('scroll', hide, { passive: true });
  window.addEventListener('blur', () => { dragging = false; hide(); });
  document.documentElement.addEventListener('pointerleave', hide);
  fineMouse.addEventListener('change', hide);
  reduced.addEventListener('change', hide);
}