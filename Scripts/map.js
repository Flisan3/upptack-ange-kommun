const map = L.map('map').setView([62.5247, 15.6594], 9);

L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '&copy; OpenStreetMap'
    }
).addTo(map);

const places = [

    {
        name: "Flataklocken",
        coords: [62.418, 16.051],
        text: "Utsiktsplats"
    },

    {
        name: "Borgsjö Hembygdsgård",
        coords: [62.629, 16.078],
        text: "Kultur och historia"
    },

    {
        name: "Ånge Camping",
        coords: [62.524, 15.657],
        text: "Camping och natur"
    }

];

places.forEach(place => {

    L.marker(place.coords)
        .addTo(map)
        .bindPopup(`
            <h3>${place.name}</h3>
            <p>${place.text}</p>
        `);

});