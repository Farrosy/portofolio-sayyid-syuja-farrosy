/* ============================================================
   contact.js — Contact form handler & toast notifications
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form');
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Mencegah halaman reload
      
      const submitBtn = contactForm.querySelector('.btn--submit');
      const originalBtnText = submitBtn.innerText;
      
      // Mengubah teks tombol saat loading
      submitBtn.innerText = 'Mengirim...';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      try {
        // Jalankan pengiriman data ke Formspree / Web3Forms
        const response = await fetch(contactForm.action || 'https://formspree.io/f/YOUR_ID', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          // Jika sukses
          showToast('Pesan Anda berhasil dikirim!', '#10b981');
          contactForm.reset(); // Mengosongkan form kembali
        } else {
          // Jika server merespon tapi ada error
          showToast('Gagal mengirim pesan. Silakan coba lagi.', '#ef4444');
        }
      } catch (error) {
        // Jika ada masalah jaringan / internet
        showToast('Terjadi kesalahan koneksi internet.', '#ef4444');
      } finally {
        // Mengembalikan status tombol utama
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }

  // Fungsi internal untuk memunculkan dan menyembunyikan toast
  function showToast(message, bgColor) {
    if (!toast || !toastMessage) return;

    toastMessage.innerText = message;
    toast.style.backgroundColor = bgColor;
    
    toast.classList.remove('toast-hidden');
    toast.classList.add('toast-visible');

    // Toast otomatis hilang setelah 4 detik
    setTimeout(() => {
      toast.classList.remove('toast-visible');
      toast.classList.add('toast-hidden');
    }, 4000);
  }
});