document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".hero-btn");
    const body = document.body;

    body.classList.add("lock-scroll");

    button.addEventListener("click", (e) => {
        e.preventDefault();
        body.classList.add("reveal");

        setTimeout(() => {
            body.classList.remove("lock-scroll");
        }, 800);
    });
});

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

function initializeActivityCard(card) {
    if (!card) return;

    if (!card.hasAttribute("role")) card.setAttribute("role", "button");
    if (!card.hasAttribute("tabindex")) card.setAttribute("tabindex", "0");
    if (!card.hasAttribute("aria-expanded")) card.setAttribute("aria-expanded", "false");

    card.addEventListener("click", (e) => {
        if (e.target.closest(".map-btn-card")) {
            return;
        }

        document.querySelectorAll(".activity-card").forEach(other => {
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
}

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".activity-card");

    cards.forEach(card => initializeActivityCard(card));

});

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".category-card");
    const result = document.getElementById("category-result");

    cards.forEach(card => {
        if (!card.hasAttribute("role")) card.setAttribute("role", "button");
        if (!card.hasAttribute("tabindex")) card.setAttribute("tabindex", "0");
        if (!card.hasAttribute("aria-expanded")) card.setAttribute("aria-expanded", "false");
    });

   const data = {
    fiske: {
        title: "Fiske i Ljungan",
        image: "/Bilder/pexels-kpaukshtite-4256560.jpg",
        text: "Ljungan erbjuder fantastiskt fiske efter öring och harr."
    },
    familj: {
        title: "Familjedag i naturen",
        image: "/Bilder/pexels-scott-neil-302581859-13608734.jpg",
        text: "Perfekt för picknick, lek och naturupplevelser."
    },
    musik: {
        title: "Musik i Ånge",
        image: "/Bilder/pexels-roemag-34992091.jpg",
        text: "Lokala konserter och evenemang året runt."
    },
    utflykt: {
        title: "Utflykter i Norrland",
        image: "/Bilder/pexels-roemag-34992091.jpg",
        text: "Upptäck fantastiska platser och utsikter."
    }
    };


    cards.forEach(card => {

        card.addEventListener("click", () => {

            const type = card.dataset.category;

            cards.forEach(c => {
                c.classList.remove("active", "inactive");
                c.setAttribute("aria-expanded", "false");

                if (c !== card) c.classList.add("inactive");
            });

            card.classList.add("active");
            card.setAttribute("aria-expanded", "true");

            result.innerHTML = `
                <div class="category-activity activity-card" role="button" tabindex="0" aria-expanded="false">
                    <img src="${data[type].image}" alt="${data[type].title}">
                    <h3>${data[type].title}</h3>
                    <p>${data[type].text}</p>
                    <div class="activity-expanded">
                        <p>Utforska mer om denna kategori med detaljerade tips och kartan över närliggande platser.</p>
                        <a href="/Sidor/karta.html" class="map-btn-card">Visa på karta</a>
                    </div>
                </div>
            `;

            const resultCard = result.querySelector('.activity-card');
            initializeActivityCard(resultCard);
        });

        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                card.click();
            }
        });

    });

});