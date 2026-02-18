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