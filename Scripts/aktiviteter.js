document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".filter-form");
    const filterSidebar = document.querySelector(".filter-sidebar");
    const toggleButton = document.querySelector(".filter-toggle");
    const cards = document.querySelectorAll(".activity-card");

    if (toggleButton && filterSidebar) {
        toggleButton.addEventListener("click", () => {
            const isOpen = filterSidebar.classList.toggle("open");
            toggleButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        document.addEventListener("click", (event) => {
            if (!filterSidebar.contains(event.target) && !toggleButton.contains(event.target) && filterSidebar.classList.contains("open")) {
                filterSidebar.classList.remove("open");
                toggleButton.setAttribute("aria-expanded", "false");
            }
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

    form.addEventListener("input", filterCards);

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