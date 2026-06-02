// Initialisera kartan med OpenStreetMap och Leaflet
const map = L.map('map').setView([62.5247, 15.6594], 9);

// Lägg till OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

const mapMarkers = [];

// Skapar och lägger till en markör på kartan
function addMarker(data) {
    // Skapar Leaflet markören baserat på koordinater
    const marker = L.marker(data.coords)
        .addTo(map)
        // Popup som visas när man klickar på markören
        .bindPopup(`<h3>${data.name}</h3><p>${data.text}</p>`);

    // Sparar både markören och dess data så de kan filtreras senare
    mapMarkers.push({ marker, data });
}

// Läser in markörer från HTML som redan finns på sidan
function loadFromDOM() {
    document.querySelectorAll('.map-btn-card[data-lat][data-lng]').forEach(el => {
        const lat = parseFloat(el.dataset.lat);
        const lng = parseFloat(el.dataset.lng);

        // Om koordinaterna inte är siffror så hoppas elementet över
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

        // Skickar vidare datan till addMarker så allt hanteras likadant
        addMarker({
            name: el.dataset.name || 'Plats',
            text: el.dataset.text || '',
            category: (el.dataset.category || 'alla').toLowerCase(),
            coords: [lat, lng]
        });
    });
}

// Hämtar data från andra HTML-sidor och plockar ut markörer därifrån
async function loadFromPage(url) {
    try {
        // Hämtar sidan som ren HTML-text
        const res = await fetch(url);
        const html = await res.text();

        // Gör om HTML-strängen till ett DOM-träd så querySelector fungerar
        const doc = new DOMParser().parseFromString(html, 'text/html');

        // Letar upp alla kartknappar i sidan
        doc.querySelectorAll('.map-btn-card[data-lat][data-lng]').forEach(el => {
            const lat = parseFloat(el.dataset.lat);
            const lng = parseFloat(el.dataset.lng);

            // Hoppar över om data är trasig eller saknas
            if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

            // Lägger till markören precis som på nuvarande sida
            addMarker({
                name: el.dataset.name || 'Plats',
                text: el.dataset.text || '',
                category: (el.dataset.category || 'alla').toLowerCase(),
                coords: [lat, lng]
            });
        });

    } catch (err) {
        // Om sidan inte går att hämta eller parsea loggas bara en varning
        console.warn('Kunde inte ladda:', url, err);
    }
}

// Flyttar kartan till en specifik plats och visar popup
function showLocation(coords, name = '', text = '', zoom = 15) {
    // Centrerar kartan på vald position
    map.setView(coords, zoom);

    // Försöker hitta en redan existerande markör med exakt samma koordinater
    const found = mapMarkers.find(m =>
        Math.abs(m.data.coords[0] - coords[0]) < 0.0001 &&
        Math.abs(m.data.coords[1] - coords[1]) < 0.0001
    );

    if (found) {
        // Om markören redan finns öppnas dess popup
        found.marker.openPopup();
    } else {
        // Annars skapas en tillfällig markör bara för visning
        const tmp = L.marker(coords)
            .addTo(map)
            .bindPopup(`<h3>${name}</h3><p>${text}</p>`);

        tmp.openPopup();

        // Tar bort den tillfälliga markören efter några sekunder
        setTimeout(() => map.removeLayer(tmp), 8000);
    }
}

// Läser URL-parametrar för att kunna öppna en plats direkt
const params = new URLSearchParams(window.location.search);

if (params.has('lat') && params.has('lng')) {
    const lat = parseFloat(params.get('lat'));
    const lng = parseFloat(params.get('lng'));

    // Säkerställer att koordinaterna är giltiga
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
        showLocation(
            [lat, lng],
            params.get('name') ? decodeURIComponent(params.get('name')) : '',
            params.get('text') ? decodeURIComponent(params.get('text')) : '',
            params.has('zoom') ? parseInt(params.get('zoom'), 10) : 15
        );
    }
}

// Hanterar klick på “Visa på karta” knappar
document.addEventListener('click', (e) => {
    const el = e.target.closest('.map-btn-card[data-lat][data-lng]');
    if (!el) return;

    e.preventDefault();

    const lat = parseFloat(el.dataset.lat);
    const lng = parseFloat(el.dataset.lng);

    // Säkerställer att det inte kraschar om data saknas
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

    showLocation([lat, lng], el.dataset.name, el.dataset.text);
});

// Uppdaterar vilka markörer som visas baserat på filter och sök
function updateMarkers() {
    const categoryEl = document.querySelector('.map-btn.active');
    const searchInput = document.querySelector('.map-search input');

    // Vilken kategori som är vald
    const activeCategory =
        categoryEl?.textContent?.trim().toLowerCase() || 'alla';

    // Vad användaren har skrivit i sökfältet
    const searchValue =
        searchInput?.value.trim().toLowerCase() || '';

    mapMarkers.forEach(({ marker, data }) => {
        const category = (data.category || 'alla').toLowerCase();

        // Slår ihop namn och text så sökning kan ske i båda
        const text =
            (data.name + ' ' + data.text).toLowerCase();

        // Kollar om markören matchar vald kategori
        const matchesCategory =
            activeCategory === 'alla' || category === activeCategory;

        // Kollar om markören matchar sökordet
        const matchesSearch =
            searchValue === '' || text.includes(searchValue);

        const visible = matchesCategory && matchesSearch;

        // Visar eller gömmer markören beroende på filter
        if (visible) {
            if (!map.hasLayer(marker)) marker.addTo(map);
        } else {
            if (map.hasLayer(marker)) map.removeLayer(marker);
        }
    });
}

// Kategoriknapparna styr filtret
document.querySelectorAll('.map-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Tar bort active från alla knappar
        document.querySelectorAll('.map-btn')
            .forEach(b => b.classList.remove('active'));

        // Sätter active på den klickade knappen
        btn.classList.add('active');

        // Uppdaterar kartan direkt
        updateMarkers();
    });
});

// Sökfältet uppdaterar kartan medan man skriver
const searchInput = document.querySelector('.map-search input');

if (searchInput) {
    searchInput.addEventListener('input', updateMarkers);
}

// Laddar data från DOM och sidor
loadFromDOM();
loadFromPage('/Sidor/aktiviteter.html');
loadFromPage('/Sidor/mat.html');
loadFromPage('/Sidor/evenemang.html');