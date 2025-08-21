// Animasi scroll untuk kartu
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.2 });
cards.forEach(card => observer.observe(card));

// Form AJAX agar tetap di halaman
const form = document.getElementById('daftarForm');
const message = document.getElementById('formMessage');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // hentikan redirect

  const formData = new FormData(form);

  fetch('https://formspree.io/f/xanbgkvb', {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if(response.ok){
      form.reset(); // kosongkan input
      message.style.display = 'block'; // tampilkan pesan sukses
      setTimeout(()=> message.style.display='none', 4000); // hilang otomatis
    } else {
      response.json().then(data => {
        alert('Gagal mengirim: ' + (data.error || 'Coba lagi nanti.'));
      })
    }
  })
  .catch(error => {
    alert('Terjadi error: ' + error);
  });
});