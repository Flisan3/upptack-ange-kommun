document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".food-card.activity-card, .activity-card");

    cards.forEach(card => {
        if (!card.hasAttribute("role")) card.setAttribute("role", "button");
        if (!card.hasAttribute("tabindex")) card.setAttribute("tabindex", "0");
        if (!card.hasAttribute("aria-expanded")) card.setAttribute("aria-expanded", "false");

        card.addEventListener("click", (event) => {
            if (event.target.closest(".map-btn-card")) {
                return;
            }

            cards.forEach(other => {
                if (other !== card) {
                    other.classList.remove("expanded");
                    other.setAttribute("aria-expanded", "false");
                }
            });

            const isExpanded = card.classList.toggle("expanded");
            card.setAttribute("aria-expanded", isExpanded ? "true" : "false");
        });

        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                card.click();
            }
        });
    });
});
