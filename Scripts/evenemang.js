// Script för att hantera interaktionen med evenemangskorten, inklusive att expandera och visa mer information
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".event-card.activity-card");

    // Lägg till aria-attributet för att förbättra tillgängligheten
    cards.forEach(card => {
        if (!card.hasAttribute("role")) card.setAttribute("role", "button");
        if (!card.hasAttribute("tabindex")) card.setAttribute("tabindex", "0");
        if (!card.hasAttribute("aria-expanded")) card.setAttribute("aria-expanded", "false");

        // Förhindra att klick på kartknappen expanderar kortet
        card.addEventListener("click", (event) => {
            if (event.target.closest(".map-btn-card")) {
                return;
            }

            // Toggle "expanded" classen på det klickade kortet och stäng andra kort
            cards.forEach(other => {
                if (other !== card) {
                    other.classList.remove("expanded");
                    other.setAttribute("aria-expanded", "false");
                }
            });

            // Toggle "expanded" classen på det klickade kortet och uppdatera aria-expanded attributet
            const isExpanded = card.classList.toggle("expanded");
            card.setAttribute("aria-expanded", isExpanded ? "true" : "false");
        });

        // Lägg till tangentbordsnavigering för att expandera korten med Enter eller mellanslag
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                card.click();
            }
        });
    });
});
