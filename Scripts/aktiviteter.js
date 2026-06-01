document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".filter-form");
    const filterPanel = document.querySelector(".filter-panel");
    const mainLayout = document.querySelector(".activities-layout");
    const toggleButton = document.querySelector(".filter-toggle");
    const cards = document.querySelectorAll(".activity-card");

    if (toggleButton && filterPanel && mainLayout) {
        toggleButton.addEventListener("click", () => {
            const isClosed = filterPanel.classList.toggle("closed");
            mainLayout.classList.toggle("closed", isClosed);
            toggleButton.setAttribute("aria-expanded", String(!isClosed));
            toggleButton.setAttribute("aria-label", isClosed ? "Visa filter" : "Dölj filter");
            toggleButton.textContent = isClosed ? "Visa" : "Dölj filter";
        });
    }

    function filterCards() {

        const category = form.querySelector("select[name='category']").value.toLowerCase();
        const location = form.querySelector("select[name='location']").value.toLowerCase();
        const search = form.querySelector("input[name='search']").value.toLowerCase();

        cards.forEach(card => {

            const cardCategory = card.dataset.category;
            const cardLocation = card.dataset.location;

            const text = card.innerText.toLowerCase();

            const matchCategory =
                category === "alla" || category === "" || cardCategory === category;

            const matchLocation =
                location === "alla" || location === "" || cardLocation === location;

            const matchSearch =
                text.includes(search);

            if (matchCategory && matchLocation && matchSearch) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        filterCards();
    });

    // Remove live filtering; apply filters only when user clicks "Filtrera".
    const resetBtn = document.querySelector('.filter-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            const selects = form.querySelectorAll('select');
            selects.forEach(s => s.value = 'alla');
            const search = form.querySelector('input[name="search"]');
            if (search) search.value = '';
            filterCards();
        });
    }

    cards.forEach(card => {
        card.addEventListener("click", (event) => {
            if (event.target.closest(".map-btn-card")) {
                return;
            }

            const isExpanded = card.classList.toggle("expanded");

            cards.forEach(other => {
                if (other !== card) {
                    other.classList.remove("expanded");
                    other.setAttribute("aria-expanded", "false");
                }
            });

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