// Hantering av den speciella nav-baren som ändrar utseende när man scrollar
const nav = document.querySelector("nav");

    // Lägg till en scroll-event listener som ändrar nav-barens klass baserat på scrollpositionen
    window.addEventListener("scroll", () => {

        if(window.scrollY > 50){
            nav.classList.add("scrolled");
        }
        else{
            nav.classList.remove("scrolled");
        }

    });

// Se till att sidan alltid startar i toppen när den laddas
window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");

    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});