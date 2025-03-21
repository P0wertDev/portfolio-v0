const observerElement = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.5 });

const elements = document.querySelectorAll(".parallax");
elements.forEach(el => observerElement.observe(el));
