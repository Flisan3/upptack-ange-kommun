document.addEventListener("DOMContentLoaded", () => {

    // Hämtar navbar-element
    const toggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    const links = navLinks ? navLinks.querySelectorAll("a") : [];

    // Gör länkarna tangentbords-aktiverbara
    toggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            toggle.click();
        }
    });

    // Gör länkarna tangentbords-aktiverbara
    links.forEach(link => {
        link.setAttribute("tabindex", "0");

        link.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                link.click();
            }
        });
    });
});
