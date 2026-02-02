
/* =====================================================
   MOBILE NAV TOGGLE + AUTOSCHLIESSEN
   ===================================================== */

const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
const header = document.querySelector('.header');

if (!toggle || !nav || !header) {
  console.warn('Navigation nicht vorhanden – Script übersprungen');
}

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

// Toggle per Button
toggle.addEventListener('click', (e) => {
  console.log("Toggle per Button: "+e)
  const willOpen = !isNavOpen();
  if (willOpen) {
    openNav();
    console.log("openNav")
  } else {
    closeNav();
    console.log("closeNav")
  }
});

// 1) Beim Klick auf einen Nav-Link: schließen
nav.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  console.log("click: "+e)
  if (link) {
    // Nur im mobilen Zustand schließen (optional, aber sinnvoll)
    if (window.innerWidth < 1024) {
      closeNav();
      console.log("closeNav")
    }
  }
});

// 2) Klick außerhalb von Header/Nav: schließen
document.addEventListener('click', (e) => {
  console.log("Klick außerhalb von Header/Nav: schließen: "+e)
  console.log("header: "+e.target)
  // Wenn Nav offen ist und der Klick NICHT im Header/Toggler stattfindet → schließen
  if (isNavOpen() && !header.contains(e.target)) {
    closeNav();
     console.log("closeNav")
  }
});

// 3) ESC zum Schließen
document.addEventListener('keydown', (e) => {
  console.log("ESC zum Schließen: "+e)
  if (e.key === 'Escape' && isNavOpen()) {
    closeNav();
    // Fokus zurück auf Toggle, damit Tastaturnutzer:innen nicht „verloren“ sind
    toggle.focus();
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
