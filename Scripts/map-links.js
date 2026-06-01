document.addEventListener('click', (event) => {
  const anchor = event.target.closest('.map-btn-card');
  if (!anchor) return;

  const lat = anchor.dataset.lat;
  const lng = anchor.dataset.lng;
  if (lat && lng) {
    const name = anchor.dataset.name ? encodeURIComponent(anchor.dataset.name) : '';
    const text = anchor.dataset.text ? encodeURIComponent(anchor.dataset.text) : '';
    const category = anchor.dataset.category ? encodeURIComponent(anchor.dataset.category) : '';
    const zoom = anchor.dataset.zoom ? encodeURIComponent(anchor.dataset.zoom) : '';
    let url = `/Sidor/karta.html?lat=${lat}&lng=${lng}`;
    if (name) url += `&name=${name}`;
    if (text) url += `&text=${text}`;
    if (category) url += `&category=${category}`;
    if (zoom) url += `&zoom=${zoom}`;
    event.preventDefault();
    window.location.href = url;
  }
  // otherwise fall back to link's href (karta page)
});
