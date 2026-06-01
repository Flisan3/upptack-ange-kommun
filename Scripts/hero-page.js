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
        title: "Fiske i Gissjön",
        image: "/Bilder/pexels-aedrian-11817547.jpg",
        text: "Gissjön är en populär plats för fiske, känd för sina goda fångster av abborre, gädda och sik.",
        lat: 62.507165,
        lng: 16.207001,
        mapName: "Fiske i Gissjön",
        mapText: "Perfekt fiskeplats för både nybörjare och erfarna fiskare, med vackra omgivningar",
        category: "sport"
    },
    familj: {
        title: "Boda borg inomhusupplevelse",
        image: "/Bilder/pexels-190703726-29746597.jpg",
        text: "Perfekt aktivitet för familjen, där ni tillsammans kan lösa kluriga utmaningar och ha kul i en spännande miljö.",
        lat: 62.457768,
        lng: 16.377885,
        mapName: "Boda Borg Torpshammar",
        mapText: "En rolig och utmanande inomhusupplevelse för hela familjen, med kluriga banor och äventyr att utforska",
        category: "familj"
    },
    musik: {
        title: "Ånge musiksällskap",
        image: "/Bilder/pexels-zbigniew-bielecki-102835-1837767.jpg",
        text: "För dig som redan är musiker och vill utveckla ditt spelande. Ånge musiksällskap spelar tillsammans varje vecka och har konserter och evenemang under året.",
        lat: 62.525099,
        lng: 15.660089,
        mapName: "Ånge musiksällskap",
        mapText: "Ett levande musiksällskap i Ånge där medlemmarna möts en gång i veckan på medborgarhuset för att spela tillsammans och utveckla sitt musikaliska uttryck.",
        category: "musik"
    },
    utflykt: {
        title: "Vandring till Tjärnmyråsstugan",
        image: "/Bilder/pexels-sanmane-1365428.jpg",
        text: "Gå från Gammelbodavägen och följ den vackra stigen genom skog och över myrar fram till Tjärnmyråsstugan, en mysig stuga som erbjuder en perfekt paus med fika under vandringen.",
        lat: 62.530531,
        lng: 15.638228,
        mapName: "Vandring till Tjärnmyråsstugan",
        mapText: "En naturskön vandring genom skog och myrar som leder till Tjärnmyråsstugan, en perfekt plats för en fikapaus och att njuta av den vackra naturen i Ånge kommun.",
        category: "aktiviteter, natur"
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
                        <a href="/Sidor/karta.html"
                           class="map-btn-card"
                           data-lat="${data[type].lat}"
                           data-lng="${data[type].lng}"
                           data-name="${data[type].mapName}"
                           data-text="${data[type].mapText}"
                           data-category="${data[type].category}">
                           Visa på karta
                        </a>
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