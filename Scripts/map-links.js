// Script för att hantera klick på kartknappar och navigera till kartsidan med rätt parametrar
document.addEventListener('click', (event) => {
  const anchor = event.target.closest('.map-btn-card');
  if (!anchor) return;

  // Hämta latitud och longitud från data-attributen på den klickade knappen
  const lat = anchor.dataset.lat;
  const lng = anchor.dataset.lng;
  // Om både latitud och longitud finns, navigera till kartsidan med dessa som URL parametrar
  if (lat && lng) {
    // Hämta eventuella ytterligare data-attribut och inkludera dem som URL parametrar
    const name = anchor.dataset.name ? encodeURIComponent(anchor.dataset.name) : '';
    const text = anchor.dataset.text ? encodeURIComponent(anchor.dataset.text) : '';
    const category = anchor.dataset.category ? encodeURIComponent(anchor.dataset.category) : '';
    const zoom = anchor.dataset.zoom ? encodeURIComponent(anchor.dataset.zoom) : '';
    let url = `/Sidor/karta.html?lat=${lat}&lng=${lng}`;
    if (name) url += `&name=${name}`;
    if (text) url += `&text=${text}`;
    if (category) url += `&category=${category}`;
    if (zoom) url += `&zoom=${zoom}`;
    // Navigera till den genererade URL:en
    event.preventDefault();
    window.location.href = url;
  }
});
