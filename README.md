# Personal Portfolio — Sayyid Syuja Farrosy

[![Role](https://img.shields.io/badge/Role-Software_Engineer-blue?style=flat-flat)](https://www.linkedin.com/in/sayyid-syuja-farrosy/)
[![Tech](https://img.shields.io/badge/Stack-HTML5_|_CSS3_|_JavaScript-orange?style=flat-flat)]()
[![License](https://img.shields.io/badge/License-MIT-green.svg)]()

Repositori ini berisi kode sumber untuk website portofolio profesional saya. Website ini dirancang dengan arsitektur CSS berlapis (*layered CSS*) yang bersih, mendukung fitur *Dark/Light Mode* otomatis, responsif di semua ukuran perangkat, serta dilengkapi dengan pengiriman formulir kontak berbasis AJAX dengan *Toast Notification*.

---

## 🚀 Fitur Utama

* **Sistem Tema Dinamis (*Dark/Light Mode*):** Sinkronisasi otomatis berdasarkan preferensi sistem operasi pengguna, dilengkapi integrasi `localStorage` dan pelacakan multi-tab secara *real-time*.
* **Arsitektur CSS Berlapis:** Pemisahan fungsionalitas gaya yang rapi (`base.css`, `layout.css`, `components.css`, `pages.css`) untuk kemudahan pemeliharaan (*maintainability*).
* **Asynchronous Contact Form:** Pengiriman pesan langsung ke backend Formspree tanpa memicu *reload* halaman.
* **Custom Toast Alert:** Sistem notifikasi berbasis Vanilla JS yang muncul presisi di bawah bar navigasi dengan animasi transisi *slide-in* yang halus.
* **Navigasi Seluler Ringan:** *Sidebar mobile* interaktif yang ramah aksesibilitas (*Aria-expanded control* & pintasan tombol `Escape`).
* **Optimasi Performa & Aksesibilitas:** Memanfaatkan fungsi `prefers-reduced-motion` untuk kenyamanan aksesibilitas visual dan bebas ketergantungan dari *library* pihak ketiga yang berat.

---

## 📁 Struktur Direktori

```text
portofolio-sayyid-syuja-farrosy/
├── assets/
│   ├── css/
│   │   ├── base.css          # Reset CSS, variabel warna (Light/Dark), & utility
│   │   ├── layout.css        # Struktur makro (Header, Nav, Sidebar, Footer)
│   │   ├── components.css    # Komponen reusable (Buttons, Cards, Timeline, Toast)
│   │   └── pages.css         # Gaya spesifik per halaman (Hero, Contact section)
│   ├── js/
│   │   ├── theme-init.js     # Pencegah flash screen putih sebelum tema dimuat
│   │   ├── main.js           # Logika Dark Mode dan sidebar navigasi
│   │   └── contact.js        # Handler formulir kontak AJAX & pemicu Toast Alert
│   ├── img/
│   │   ├── home/             # Foto profil utama
│   │   ├── icons/            # Ikon SVG teknologi & media sosial
│   │   ├── project/          # Tangkapan layar proyek portofolio
│   │   └── sertifikat/       # Berkas gambar sertifikasi kredensial
│   └── pdf/
│       └── CV_ATS_SAYYID_SYUJA_FARROSY.pdf
├── index.html                # Halaman Beranda / Landing Page
├── projects.html             # Halaman Daftar Proyek
├── experience.html           # Halaman Riwayat Pengalaman & Pendidikan
└── certificates.html         # Halaman Sertifikasi & Pelatihan