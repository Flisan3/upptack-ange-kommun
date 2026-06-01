const map = L.map('map').setView([62.5247, 15.6594], 9);

L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '&copy; OpenStreetMap'
    }
).addTo(map);

// Collect marker data from DOM `.location-card` elements.
const markerData = [];

document.querySelectorAll('.location-card[data-lat][data-lng]').forEach(el => {
    const lat = parseFloat(el.dataset.lat);
    const lng = parseFloat(el.dataset.lng);
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
        markerData.push({
            name: el.dataset.name || el.querySelector('h3')?.innerText || 'Plats',
            coords: [lat, lng],
            text: el.dataset.text || el.querySelector('p')?.innerText || '',
            category: (el.dataset.category || 'alla').toLowerCase(),
            domEl: el
        });
    }
});

// Create Leaflet markers and keep references for filtering.
const mapMarkers = [];

markerData.forEach(data => {
    const marker = L.marker(data.coords).addTo(map).bindPopup(`<h3>${data.name}</h3><p>${data.text}</p>`);
    mapMarkers.push({ marker, data });
});

// Helper to show a specific location and open its popup
function showLocation(coords, name, text, zoom = 15) {
    map.setView(coords, zoom);
    // find marker at coords and open popup if exists
    const found = mapMarkers.find(m => Math.abs(m.data.coords[0] - coords[0]) < 0.0001 && Math.abs(m.data.coords[1] - coords[1]) < 0.0001);
    if (found) {
        found.marker.openPopup();
    } else {
        // temporary marker
        const tmp = L.marker(coords).addTo(map).bindPopup(`<h3>${name || ''}</h3><p>${text || ''}</p>`);
        tmp.openPopup();
        setTimeout(() => map.removeLayer(tmp), 8000);
    }
}

// Read URL parameters to center on a specific place when provided.
const params = new URLSearchParams(window.location.search);
if (params.has('lat') && params.has('lng')) {
    const lat = parseFloat(params.get('lat'));
    const lng = parseFloat(params.get('lng'));
    const name = params.get('name') ? decodeURIComponent(params.get('name')) : '';
    const text = params.get('text') ? decodeURIComponent(params.get('text')) : '';
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
        showLocation([lat, lng], name, text, params.has('zoom') ? parseInt(params.get('zoom'), 10) : 15);
    }
}

// Map filter & search UI
const mapBtns = document.querySelectorAll('.map-buttons .map-btn');
const searchInput = document.querySelector('.map-search input');

function updateMarkers(filterCat, searchText) {
    const lowerSearch = (searchText || '').toLowerCase();
    mapMarkers.forEach(({ marker, data }) => {
        const matchesCat = !filterCat || filterCat === 'alla' || (data.category && data.category.toLowerCase() === filterCat.toLowerCase());
        const matchesSearch = !lowerSearch || (data.name && data.name.toLowerCase().includes(lowerSearch)) || (data.text && data.text.toLowerCase().includes(lowerSearch));
        if (matchesCat && matchesSearch) {
            if (!map.hasLayer(marker)) marker.addTo(map);
        } else {
            if (map.hasLayer(marker)) map.removeLayer(marker);
        }
    });
}

// Wire up filter buttons
mapBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        mapBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.innerText.trim().toLowerCase();
        updateMarkers(cat === 'alla' ? 'alla' : cat, searchInput?.value || '');
    });
});

// Wire up search
if (searchInput) {
    searchInput.addEventListener('input', () => {
        const activeBtn = document.querySelector('.map-buttons .map-btn.active');
        const cat = activeBtn ? activeBtn.innerText.trim().toLowerCase() : 'alla';
        updateMarkers(cat === 'alla' ? 'alla' : cat, searchInput.value);
    });
}

// Clicking a location card centers the map
document.querySelectorAll('.location-card[data-lat][data-lng]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
        const lat = parseFloat(el.dataset.lat);
        const lng = parseFloat(el.dataset.lng);
        showLocation([lat, lng], el.dataset.name, el.dataset.text);
    });
});

// Initialize markers (show all)
updateMarkers('alla', '');