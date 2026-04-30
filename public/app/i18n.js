let translations = {}

async function changeLanguage(lang) {
    try {
        // 1. Fetch del JSON correspondiente
        const response = await fetch(`public/locales/${lang}.json`);
        translations = await response.json();

        // 2. Se busca todos los elementos que tengan el atributo data-i18n
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            // reduce para navegar en objetos anidados (ej: "projectsSection.recipePage.title")
            const text = key.split('.').reduce((obj, i) => obj[i], translations);

            if (text) {
                // 3. Lógica especial para los links
                if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') el.setAttribute('placeholder', text)

                else if (text.includes('{{linkFM}}')) renderWithLink(el, text, translations.projectsSection.frontendMentor);

                else
                    el.textContent = text;
            }

            if (key === "profileWelcoming.btnCV") {
                const cvLink = document.getElementById('cv-link');
                const cvPath = translations.profileWelcoming.cvPath;
                cvLink.setAttribute('href', cvPath);
            }

        });

        // Guardar preferencia para la próxima visita
        localStorage.setItem('preferredLang', lang);
        document.documentElement.lang = lang;

    } catch (error) {
        console.error("Hubo un error al intentar cargar las traducciones:", error);
    }
}

export function getTranslation(key) {
    console.log("traducciones actuales:", translations);

    try {
        return key.split('.').reduce((obj, i) => obj[i], translations);
    } catch (error) {
        return key;
    }
}

// Función auxiliar para ensamblar el link de forma segura
function renderWithLink(container, fullText, linkLabel) {
    const parts = fullText.split('{{linkFM}}');
    container.textContent = ''; // Limpiar

    container.append(parts[0]);

    const anchor = document.createElement('a');
    anchor.href = "https://www.frontendmentor.io/"; // Puedes parametrizar esto también
    anchor.textContent = linkLabel;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";

    container.append(anchor);
    if (parts[1]) container.append(parts[1]);
}

const languageBtn = document.getElementById('translate-btn');

languageBtn.addEventListener('click', () => {
    const currentLang = localStorage.getItem('preferredLang') || 'es';
    const newLang = currentLang === 'es' ? 'en' : 'es';

    languageBtn.textContent = currentLang.toUpperCase();
    changeLanguage(newLang);
});

// Cargar idioma preferido al iniciar
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'es';
    changeLanguage(savedLang);
});