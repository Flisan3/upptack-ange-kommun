document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".hero-btn");
    const body = document.body;

    body.classList.add("lock-scroll");

    button.addEventListener("click", (e) => {
        e.preventDefault();
        body.classList.add("reveal");

        setTimeout(() => {
            body.classList.remove("lock-scroll");
        }, 800);
    });
});