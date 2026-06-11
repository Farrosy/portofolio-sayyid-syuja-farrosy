/* ============================================================
   theme-init.js — Early theme detection & Tailwind config
============================================================ */

// 1. Konfigurasi awal Tailwind CSS agar mendukung Selector data-theme
if (window.tailwind) {
  window.tailwind.config = {
    darkMode: ['selector', '[data-theme="dark"]'],
  };
}

// 2. Eksekusi instan pendeteksi tema (mencegah layar berkedip putih)
(function () {
  'use strict';
  const STORAGE_KEY = 'portfolio-theme';
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
})();