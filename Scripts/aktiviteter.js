document.addEventListener("DOMContentLoaded", () => {

    // Constanter för att hämta element från DOM:en
    const form = document.querySelector(".filter-form");
    const filterPanel = document.querySelector(".filter-panel");
    const mainLayout = document.querySelector(".activities-layout");
    const toggleButton = document.querySelector(".filter-toggle");
    const cards = document.querySelectorAll(".activity-card");
    const header = document.querySelector(".activities-content h1"); // Ny: används för att visa "Inga resultat"

    // Event listener för att hantera filterpanelen och dess responsivitet
    if (toggleButton && filterPanel && mainLayout) {
        toggleButton.addEventListener("click", () => {
            const isMobile = window.innerWidth <= 900;

            // För mobila enheter, öppna eller stäng filterpanelen och justera layouten
            if (isMobile) {
                filterPanel.classList.remove("closed");
                mainLayout.classList.remove("closed");
                const isOpen = filterPanel.classList.toggle("open");
                toggleButton.textContent = isOpen ? "Dölj filter" : "Visa filter";
                toggleButton.setAttribute("aria-expanded", String(isOpen));
            // Stäng filter
            } else {
                filterPanel.classList.remove("open");
                const isClosed = filterPanel.classList.toggle("closed");
                mainLayout.classList.toggle("closed", isClosed);
                toggleButton.textContent = isClosed ? "Visa filter" : "Dölj filter";
                toggleButton.setAttribute("aria-expanded", String(!isClosed));
            }
        });
    }

    // Funktion för att filtrera korten baserat på valda kriterier
    function filterCards() {
        const category = form.querySelector("select[name='category']").value.toLowerCase();
        const location = form.querySelector("select[name='location']").value.toLowerCase();
        const search = form.querySelector("input[name='search']").value.toLowerCase();

        // Räknar hur många kort som visas
        let visibleCount = 0; 

        // Filtrera korten baserat på valda kriterier
        cards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardLocation = card.dataset.location;
            const text = card.innerText.toLowerCase();

            // Kontrollera om kortet matchar de valda kriterierna
            const matchCategory = category === "alla" || category === "" || cardCategory === category;
            const matchLocation = location === "alla" || location === "" || cardLocation === location;
            const matchSearch = text.includes(search);

            // Visa eller dölj kortet baserat på om det matchar kriterierna
            const isVisible = (matchCategory && matchLocation && matchSearch);
            card.style.display = isVisible ? "block" : "none";

            if (isVisible) visibleCount++;
        });

        // Uppdatera header baserat på antal resultat
        if (header) {
            header.textContent = visibleCount === 0 ? "Inga resultat" : "Alla aktiviteter";
        }
    }

    // Event listener för att hantera formulärets submit-event och filtrera korten
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        filterCards();
    });

    // Event listener för att hantera reset-knappen och återställa alla filter
    const resetBtn = document.querySelector(".filter-reset");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            form.querySelectorAll("select").forEach(s => s.value = "alla");
            const search = form.querySelector("input[name='search']");
            if (search) search.value = "";
            filterCards();
        });
    }

    // Event listeners för att hantera klick och tangenttryckningar på korten för att expandera och visa mer information
    cards.forEach(card => {
        card.addEventListener("click", (event) => {
            if (event.target.closest(".map-btn-card")) return;

            // Toggle "expanded" classen på det klickade kortet och stäng andra kort
            const isExpanded = card.classList.toggle("expanded");

            // Stäng alla andra kort när ett kort expanderas
            cards.forEach(other => {
                if (other !== card) {
                    other.classList.remove("expanded");
                    other.setAttribute("aria-expanded", "false");
                }
            });

            // Uppdatera aria-expanded attributet för det klickade kortet
            card.setAttribute("aria-expanded", String(isExpanded));
        });

        // Lägg till tangentbordsnavigering för att expandera korten med Enter eller mellanslag
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                card.click();
            }
        });
    });

});
