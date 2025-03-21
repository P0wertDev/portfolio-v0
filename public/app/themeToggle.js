const themeModeCheck = document.querySelectorAll(".toggle-theme");
const moonViewCheck = document.querySelectorAll(".moon-button");

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);

    moonViewCheck.forEach(el => savedTheme === "dark" ? el.classList.add("moon-view") : el.classList.remove("moon-view"))

} else {
    const themeQuery = window.matchMedia("(prefers-color-scheme: dark)")

    if (themeQuery.matches) {
        setThemeQuery("dark")
        moonViewCheck.forEach(el => {
            el.classList.add("moon-view")
        })
    } else {
        moonViewCheck.forEach(el => {
            el.classList.remove("moon-view")
        })
    }

    themeQuery.addEventListener("change", (e) => {
        setThemeQuery(e.matches ? "dark" : "light")
    })

    function setThemeQuery(newTheme) {
        document.documentElement.setAttribute("data-theme", newTheme)
    }
}


themeModeCheck.forEach(el => {
    el.addEventListener("change", themeChange)
})

function themeChange() {
    let dataTheme = document.documentElement.getAttribute("data-theme");

    if (dataTheme === "light") {
        document.documentElement.setAttribute("data-theme", "dark")
        moonViewCheck.forEach(el => {
            el.classList.add("moon-view")
        });
    } else {
        document.documentElement.setAttribute("data-theme", "light")
        moonViewCheck.forEach(el => {
            el.classList.remove("moon-view")
        })
    }

    dataTheme = document.documentElement.getAttribute("data-theme");
    localStorage.setItem("theme", dataTheme);
}



