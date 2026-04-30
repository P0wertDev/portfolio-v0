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

/* ANIMACIÓN Y ANCHO FIJO PARA EL NOMBRE PRINCIPAL */

const bubbleHello = document.querySelector(".profile-hello")
const myName = document.querySelector(".profile-name");
const longestText = "Rowert Méndez";
const shortestText = "P0wert.Dev";

let maxWidth = 0;
maxWidth = myName.getBoundingClientRect().width;

setTimeout(() => {
    myName.classList.add('flicker-active')
}, 6000)

myName.addEventListener("mouseenter", () => {
    myName.style.width = maxWidth + "px";
    myName.innerText = shortestText;
});

myName.addEventListener("mouseleave", () => {
    myName.innerHTML = longestText;
    myName.style.width = "";
    maxWidth = myName.getBoundingClientRect().width;
})

/* SECUENCIA DE EMOJIS */

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

/* FORMULARIO DE CONTACTO */

const mailForm = document.getElementById("mail-form");

mailForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const notification = document.getElementById("notification-message");
    notification.innerHTML = "";
    notification.style.display = "block";
    notification.classList.remove("animation-msg-out");

    const submitBtn = document.querySelector(".contact-submit");

    const formData = new FormData(mailForm);
    const dataForm = Object.fromEntries(formData.entries());

    //NOTE - Deshabilitar el botón mientras se procesa para evitar envíos dobles

    submitBtn.disable = true;
    submitBtn.textContent = "Enviando...";

    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify(dataForm),
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.text();
        // const responseText = await response.text()

        if (response.status > 300) {
            notification.innerHTML = data.message;
            notification.style.color = "rgb(255, 233, 207)";
            notification.classList.add("animation-msg-in");

            setTimeout(() => {
                notification.classList.remove("animation-msg-in");
                notification.classList.add("animation-msg-out");
            }, 5000);

            setTimeout(() => {
                notification.style.display = "none";
            }, 6000);
            return;

            // notification.textContent = data.message;
            // notification.style.color = "green";
            // mailForm.reset();
        }

        if (response.status >= 200 && response.status < 300) {
            notification.innerHTML = data.message;
            notification.classList.add("animation-msg-in");

            setTimeout(() => {
                notification.classList.remove("animation-msg-in");
                notification.classList.add("animation-msg-out");
            }, 5000);

            setTimeout(() => {
                notification.style.display = "none";
            }, 6000)
        }

    } catch (err) {
        console.error("Error al enviar:", err.message);
        // notification.textContent = "No se pudo conectar. Por favor, inténtalo de nuevo.";
        // notification.style.color = "red";
    } finally {
        //NOTE - Habilito de nuevo el botón, se envíe o no el mensaje

        submitBtn.disable = false;
        submitBtn.textContent = "Enviar";
    }

    mailForm.reset();
});