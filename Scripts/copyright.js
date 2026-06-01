document.addEventListener("DOMContentLoaded", () => {
    const footers = document.querySelectorAll("footer p");
    const currentYear = new Date().getFullYear();

    footers.forEach(footer => {
        footer.textContent = `© ${currentYear} Alex Flisager • Upptäck Ånge`;
    });
});
