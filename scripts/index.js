
/* =====================================================
   MOBILE NAV TOGGLE + AUTOSCHLIESSEN
   ===================================================== */

const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
const header = document.querySelector('.header');

/** Helfer: Navigation öffnen/schließen + ARIA Zustand setzen */
function openNav() {
  nav.classList.add('open');
  toggle.setAttribute('aria-expanded', 'true');
}

function closeNav() {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}

function isNavOpen() {
  return nav.classList.contains('open');
}

if (toggle && nav && header) {
  // Toggle per Button
  toggle.addEventListener('click', (e) => {
    const willOpen = !isNavOpen();
    if (willOpen) {
      openNav();
    } else {
      closeNav();
    }
  });

  // 1) Beim Klick auf einen Nav-Link: schließen
  nav.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) {
      // Nur im mobilen Zustand schließen (optional, aber sinnvoll)
      if (window.innerWidth < 1024) {
        closeNav();
      }
    }
  });

  // 2) Klick außerhalb von Header/Nav: schließen
  document.addEventListener('click', (e) => {
    // Wenn Nav offen ist und der Klick NICHT im Header/Toggler stattfindet → schließen
    if (isNavOpen() && !header.contains(e.target)) {
      closeNav();
    }
  });

  // 3) ESC zum Schließen
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isNavOpen()) {
      closeNav();
      // Fokus zurück auf Toggle, damit Tastaturnutzer:innen nicht „verloren“ sind
      toggle.focus();
    }
  });

  /* =====================================================
     AKTIVE SEITE MARKIEREN
     ===================================================== */
  // const currentPage = location.pathname.split('/').pop() || 'index.html';
  const currentPage = location.pathname.split('/')[1];

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
  const DESKTOP_BP = 1024;

  function handleResize() {
    if (window.innerWidth >= DESKTOP_BP) {
      // Auf Desktop: offenen mobilen Zustand zurücksetzen
      closeNav();
    }
  }
  window.addEventListener('resize', handleResize, { passive: true });

  // Optional: beim initialen Laden Zustand konsistent halten
  handleResize();

  /* =====================================================
     FAQ TOGGLE
     ===================================================== */
  document.querySelectorAll(".faq-card").forEach(card => {
    const btn = card.querySelector(".faq-question");
    if (!btn) return;
    btn.addEventListener("click", () => {
      card.classList.toggle("active");
    });
  });
}
