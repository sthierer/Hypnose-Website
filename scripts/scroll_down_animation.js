// Wähle alle animierbaren Elemente
const elements = document.querySelectorAll(".animation");

let observer;

/**
 * Erstellt einen IntersectionObserver und registriert nur Elemente,
 * die noch nicht sichtbar waren (kein .show).
 */
function createObserver() {
  // Falls schon vorhanden, zunächst sauber beenden
  if (observer) {
    observer.disconnect();
  }

  observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      const el = entry.target;

      if (entry.isIntersecting) {
        // Einblenden
        el.classList.add("show");
        // Markieren als einmal gezeigt (optional, falls du es abfragen willst)
        el.setAttribute('data-revealed', 'true');

        // Einmaliges Verhalten: Beobachtung beenden
        obs.unobserve(el);
      }
      // else: NICHT ausblenden – „reveal once“-Verhalten
    });
  }, {
    threshold: 0.3,
    // Du kannst rootMargin anpassen, um früher/später zu triggern, z. B.:
    // rootMargin: "0px 0px -10% 0px"
  });

  // Nur Elemente beobachten, die noch nicht gezeigt wurden
  elements.forEach(el => {
    if (!el.classList.contains("show")) {
      observer.observe(el);
    }
  });
}

/**
 * Bei Resize: NICHTS zurücksetzen.
 * Wir registrieren lediglich weiterhin alle noch nicht gezeigten Elemente.
 * Bereits sichtbare bleiben sichtbar und werden nicht angerührt.
 */
let resizeTimeout;
function onResize() {
  clearTimeout(resizeTimeout);
  // Debounce, um Neuberechnungen zu reduzieren
  resizeTimeout = setTimeout(() => {
    // Nur neu initialisieren/registrieren – kein Reset.
    createObserver();
  }, 200);
}

// Initial starten
document.addEventListener("DOMContentLoaded", createObserver);

// Resize → nur re-observieren (kein Reset)
window.addEventListener("resize", onResize);
