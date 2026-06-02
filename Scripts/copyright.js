// Script för att uppdatera copyright-året i footern automatiskt
document.addEventListener("DOMContentLoaded", () => {
    const footers = document.querySelectorAll("footer p");
    const currentYear = new Date().getFullYear();

    // Uppdatera texten i footern med det aktuella året
    footers.forEach(footer => {
        footer.textContent = `© ${currentYear} Alex Flisager • Upptäck Ånge`;
    });
});
