/* HAMBURGUESA */

const nav = document.querySelector('.hamburger-btn');
nav.addEventListener('click', () => {
    nav.classList.toggle('menu_opened');
});

/* DESPLIEGUE DEL MENÚ EN EL TLF */

const menu = document.querySelector(".header-menu");
const openMenu = document.querySelector(".hamburger-btn");


function toggleMenu() {
    menu.classList.toggle("menu_opened")
}

openMenu.addEventListener("click", toggleMenu);

/* SECCIÓN PARA CERRAR EL MENÚ DE HAMBURGUESA AL SELECCIONARSE */

const menuLinks = document.querySelectorAll('.header-menu a[href^="#"]')

/* COMANDO PARA IR CAMBIANDO AUTOMÁTICAMENTE LAS SECCIONES EN LA BARRA DE NAVEGACIÓN */

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute("id");
            const menuLink = document.querySelector(`.header-menu a[href="#${id}"]`);

            if (entry.isIntersecting) {
                document.querySelector(".header-menu a.selected").classList.remove("selected")
                menuLink.classList.add("selected");
            }
        });
    },
    { rootMargin: "-50% 0px -70% 0px" }
);


menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", function () {
        menu.classList.remove("menu_opened");
        nav.classList.remove("menu_opened");
    })

    const hash = menuLink.getAttribute("href")
    const target = document.querySelector(hash);
    if (target) {
        observer.observe(target);
    }
})

const bubbleHello = document.querySelector(".profile-hello")
const myName = document.querySelector(".profile-name");
setTimeout(() => {
    myName.classList.add('flicker-active')
}, 6000)

myName.addEventListener("mouseover", () => {
    myName.innerText = "P0wert.Dev    ";
});

myName.addEventListener("mouseout", () => {
    myName.innerHTML = "Rowert Méndez";
})


const emoji = document.querySelector(".resume-emoji");
const emojiList = ["😁", "😀", "😄", "😎", "🙂", "😊", "😏", "🙃"];
let emojiCount = 0;

function updateEmoji() {
    emoji.classList.remove("resume-emoji");
    void emoji.offsetWidth;
    emoji.classList.add("resume-emoji");

    emoji.innerHTML = emojiList[emojiCount];
    emojiCount = (emojiCount + 1) % emojiList.length;

    setTimeout(updateEmoji, 6000);
}

updateEmoji();