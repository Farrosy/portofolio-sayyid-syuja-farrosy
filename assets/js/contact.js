/* ============================================================
   contact.js — Contact form handler & toast notifications
   Features: Local Storage (Auto-Save 5s), Web3Forms API, Live Phone Filter
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form-table');
  const phoneNumberInput = document.getElementById('phone-number');
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  // ── 1. REAL-TIME PHONE NUMBER FILTER ──
  if (phoneNumberInput) {
    phoneNumberInput.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
  }

  // ── 2. DRAFT AUTO-SAVE TO LOCAL STORAGE ──
  function simpanDraf(statusKirim = 'Belum dikirim') {
    if (!contactForm) return;

    const nameInput = contactForm.querySelector('#name');
    const emailInput = contactForm.querySelector('#email');
    const messageInput = contactForm.querySelector('#message');

    const dataKontak = {
      nama: nameInput ? nameInput.value.trim() : '',
      telepon: phoneNumberInput ? phoneNumberInput.value.trim() : '',
      email: emailInput ? emailInput.value.trim() : '',
      pesan: messageInput ? messageInput.value.trim() : '',
      status: statusKirim,
      diperbaruiPada: new Date().toLocaleString('id-ID')
    };

    if (dataKontak.nama || dataKontak.telepon || dataKontak.email || dataKontak.pesan) {
      localStorage.setItem('kontak_user', JSON.stringify(dataKontak));
      console.log('Draf otomatis disimpan:', dataKontak.diperbaruiPada);
    }
  }

  if (contactForm) {
    // ── 3. LOAD DATA FROM LOCAL STORAGE ──
    const dataTersimpan = localStorage.getItem('kontak_user');
    
    if (dataTersimpan) {
      const kontak = JSON.parse(dataTersimpan);

      if (contactForm.querySelector('#name')) contactForm.querySelector('#name').value = kontak.nama || '';
      if (phoneNumberInput) phoneNumberInput.value = kontak.telepon || '';
      if (contactForm.querySelector('#email')) contactForm.querySelector('#email').value = kontak.email || '';
      if (contactForm.querySelector('#message')) contactForm.querySelector('#message').value = kontak.pesan || '';
    }

    // ── 4. AUTO-SAVE INTERVAL (EVERY 5 SECONDS) ──
    setInterval(() => {
      simpanDraf('Belum dikirim (Auto-Save)');
    }, 5000);

    // ── 5. FORM SUBMIT HANDLER (WEB3FORMS API) ──
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault(); 
      
      const submitBtn = contactForm.querySelector('.btn--submit');
      const originalBtnText = submitBtn.innerText;
      
      submitBtn.innerText = 'Mengirim...';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        const result = await response.json();

        if (response.ok && result.success) {
          showToast('Pesan Anda berhasil dikirim!', '#10b981');
          simpanDraf('Sukses Terkirim');
        } else {
          showToast(result.message || 'Gagal mengirim pesan. Silakan coba lagi.', '#ef4444');
        }
      } catch (error) {
        showToast('Terjadi kesalahan koneksi internet.', '#ef4444');
      } finally {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }

  // ── 6. TOAST NOTIFICATIONS UI ──
  function showToast(message, bgColor) {
    if (!toast || !toastMessage) return;

    toastMessage.innerText = message;
    toast.style.backgroundColor = bgColor;
    
    toast.classList.remove('toast-hidden');
    toast.classList.add('toast-visible');

    setTimeout(() => {
      toast.classList.remove('toast-visible');
      toast.classList.add('toast-hidden');
    }, 4000);
  }
});