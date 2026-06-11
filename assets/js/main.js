/* ============================================================
   main.js — Portfolio interactivity
   Handles: dark mode, mobile sidebar
============================================================ */

(function () {
  'use strict';

  // ── DOM refs ─────────────────────────────────────────────
  const html          = document.documentElement;
  const themeBtn      = document.getElementById('theme-toggle');
  const hamburger     = document.getElementById('hamburger');
  const sidebar       = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarClose  = document.getElementById('sidebar-close');
  const sidebarLinks  = sidebar.querySelectorAll('a');


  // ── Theme ─────────────────────────────────────────────────
  const STORAGE_KEY = 'portfolio-theme';

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    syncToggleState(theme);
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Fungsi tambahan untuk menyamakan posisi jepretan slider checkbox
  function syncToggleState(theme) {
    if (themeBtn) {
      themeBtn.checked = (theme === 'dark');
    }
  }

  // Sinkronisasi awal saat JavaScript selesai diunduh
  const currentAppliedTheme = html.getAttribute('data-theme') || getPreferredTheme();
  applyTheme(currentAppliedTheme);

  // Deteksi perubahan status slider (Checkbox)
  if (themeBtn) {
    themeBtn.addEventListener('change', function () {
      // Jika dicentang (checked) = mode gelap, jika tidak = mode terang
      applyTheme(this.checked ? 'dark' : 'light');
    });
  }

  // Antisipasi tombol Back/Forward browser agar posisi slider tidak macet
  window.addEventListener('pageshow', function () {
    const saved = localStorage.getItem(STORAGE_KEY) || getPreferredTheme();
    html.setAttribute('data-theme', saved);
    syncToggleState(saved);
  });

  // Sinkronisasi multi-tab real-time
  window.addEventListener('storage', function (event) {
    if (event.key === STORAGE_KEY) {
      const newTheme = event.newValue || 'light';
      html.setAttribute('data-theme', newTheme);
      syncToggleState(newTheme);
    }
  });


  // ── Mobile sidebar ────────────────────────────────────────
  function openSidebar() {
    sidebar.classList.add('is-open');
    sidebarOverlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeSidebar() {
    sidebar.classList.remove('is-open');
    sidebarOverlay.classList.remove('is-visible');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', openSidebar);
  sidebarClose.addEventListener('click', closeSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);

  // Close sidebar on link click (smooth scroll handles the rest)
  sidebarLinks.forEach(function (link) {
    link.addEventListener('click', closeSidebar);
  });

  // Close sidebar on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSidebar();
  });

})();