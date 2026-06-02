// Script för att hantera interaktionen på hero-sidan, inklusive att låsa scrollning och visa en avslöjande animation när knappen klickas
document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".hero-btn");
    const body = document.body;

    // Lås scrollning när sidan laddas
    body.classList.add("lock-scroll");

    // Event listener för att hantera klick på knappen och visa avslöjande animation
    button.addEventListener("click", (e) => {
        e.preventDefault();
        body.classList.add("reveal");

        // Ta bort lock scroll efter en kort fördröjning för att tillåta scrollning igen
        setTimeout(() => {
            body.classList.remove("lock-scroll");
        }, 800);
    });
});

// Förhindra att webbläsaren automatiskt återställer scrollpositionen när användaren navigerar tillbaka till sidan 
// för att förhindra att sidan låser sig i en oönskad scrollposition.
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Se till att sidan alltid startar i toppen när den laddas
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Funktion för att initialisera interaktionen på ett aktivitetkort, inklusive att expandera och visa mer information
function initializeActivityCard(card) {
    if (!card) return;

    // Lägg till aria attribut för att förbättra tillgängligheten
    if (!card.hasAttribute("role")) card.setAttribute("role", "button");
    if (!card.hasAttribute("tabindex")) card.setAttribute("tabindex", "0");
    if (!card.hasAttribute("aria-expanded")) card.setAttribute("aria-expanded", "false");

    // Förhindra att klick på kartknappen expanderar kortet
    card.addEventListener("click", (e) => {
        if (e.target.closest(".map-btn-card")) {
            return;
        }

        // Toggle "expanded" classen på det klickade kortet och stäng andra kort
        document.querySelectorAll(".activity-card").forEach(other => {
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
}

// Initialisera interaktionen på alla aktivitetkort när sidan laddas
document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".activity-card");

    cards.forEach(card => initializeActivityCard(card));

});

// Event listener för att hantera klick på kartknappen och visa platsen på kartan
document.addEventListener("DOMContentLoaded", () => {

    // Lägg till event listener på alla kartknappar
    const cards = document.querySelectorAll(".category-card");
    const result = document.getElementById("category-result");

    // Lägg till aria-attributet för att förbättra tillgängligheten
    cards.forEach(card => {
        if (!card.hasAttribute("role")) card.setAttribute("role", "button");
        if (!card.hasAttribute("tabindex")) card.setAttribute("tabindex", "0");
        if (!card.hasAttribute("aria-expanded")) card.setAttribute("aria-expanded", "false");
    });

    // Data för varje snabbkategori, inklusive titel, bild, text och kartinformation
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


    // Event listener för att hantera klick på varje kort och visa detaljerad information i result-sektionen
    cards.forEach(card => {

        // Förhindra att klick på kartknappen expanderar kortet
        card.addEventListener("click", () => {

            const type = card.dataset.category;

            // Ta bort "active" och "inactive" klasser från alla kort och lägg till "inactive" på alla andra kort än det klickade
            cards.forEach(c => {
                c.classList.remove("active", "inactive");
                c.setAttribute("aria-expanded", "false");

                if (c !== card) c.classList.add("inactive");
            });

            // Lägg till "active" klassen på det klickade kortet och uppdatera aria-expanded attributet
            card.classList.add("active");
            card.setAttribute("aria-expanded", "true");

            // Uppdatera result-sektionen med detaljerad information baserat på det klickade kortets kategori
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

            // Initialisera interaktionen på det nya aktivitetkortet i result-sektionen
            const resultCard = result.querySelector('.activity-card');
            initializeActivityCard(resultCard);
        });

        // Lägg till tangentbordsnavigering för att aktivera korten med Enter eller mellanslag
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                card.click();
            }
        });

    });

});