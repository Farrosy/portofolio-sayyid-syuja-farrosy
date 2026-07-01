/* ============================================================
   contact.js — Contact form handler & toast notifications
   Integrated with Local Storage
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form-table');
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  if (contactForm) {
    const dataTersimpan = localStorage.getItem('kontak_user');
    
    if (dataTersimpan) {
      const kontak = JSON.parse(dataTersimpan);

      if (contactForm.querySelector('#name')) contactForm.querySelector('#name').value = kontak.nama || '';
      if (contactForm.querySelector('#phone-number')) contactForm.querySelector('#phone-number').value = kontak.telepon || '';
      if (contactForm.querySelector('#email')) contactForm.querySelector('#email').value = kontak.email || '';
      if (contactForm.querySelector('#message')) contactForm.querySelector('#message').value = kontak.pesan || '';
    }

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

          const dataKontak = {
            nama: contactForm.querySelector('#name').value.trim(),
            telepon: contactForm.querySelector('#phone-number').value.trim(),
            email: contactForm.querySelector('#email').value.trim(),
            pesan: contactForm.querySelector('#message').value.trim(),
            dikirimPada: new Date().toLocaleString('id-ID')
          };

          localStorage.setItem('kontak_user', JSON.stringify(dataKontak));
          
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