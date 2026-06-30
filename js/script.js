// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Insert current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Accessible gallery modal behavior
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalLink = document.getElementById('modal-link');
  const closeBtn = modal && modal.querySelector('.modal-close');

  function openModal(title, desc, href) {
    if (!modal) return;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalLink.href = href;
    modal.setAttribute('aria-hidden', 'false');
    // trap focus
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Attach click/keyboard handlers to project links that have data-title
  document.querySelectorAll('.project-link').forEach(link => {
    const title = link.dataset.title || link.getAttribute('aria-label') || 'Project';
    const desc = link.dataset.description || '';
    const href = link.href;

    // Open modal on Enter/Space when focused (prevent immediate navigation)
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(title, desc, href);
      }
    });

    // Also allow a small preview on click (left click) while still allowing target=_blank
    link.addEventListener('click', (e) => {
      // If user holds ctrl/meta or middle-click, let it open in new tab
      if (e.ctrlKey || e.metaKey || e.button === 1) return;
      // Prevent navigation and open modal instead
      e.preventDefault();
      openModal(title, desc, href);
    });
  });

  // Close modal handlers
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
    });
  }
});