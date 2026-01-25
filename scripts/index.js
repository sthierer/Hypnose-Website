/* =====================================================
   MOBILE NAV TOGGLE
   ===================================================== */

const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
}

/* =====================================================
   AKTIVE SEITE MARKIEREN
   ===================================================== */

const currentPage =
  location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.setAttribute('aria-current', 'page');
  } else {
    link.removeAttribute('aria-current');
  }
});

/* =====================================================
   NAV BEI DESKTOP RESETTEN
   ===================================================== */

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});




  document.querySelectorAll(".faq-card").forEach(card => {
    card.querySelector(".faq-question").addEventListener("click", () => {
      card.classList.toggle("active");
    });
  });