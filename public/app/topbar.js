let navbar = document.querySelector('.topheader');

let lastScroll = window.scrollY;

window.onscroll = function() {
    let currentScroll = window.scrollY;

    if(navbar.classList.contains('scrolled-navbar-up')){
        navbar.classList.replace('scrolled-navbar-up', 'scrolled-navbar-down')
    }

    if (currentScroll > lastScroll) {
        navbar.classList.add('scrolled-navbar-down')
        
    } else {
        navbar.classList.replace('scrolled-navbar-down', 'scrolled-navbar-up')
    }

    lastScroll = currentScroll;

    document.addEventListener("scrollend", () => {
        setTimeout(() => {
            navbar.classList.remove('scrolled-navbar-down')
        }, 10000)
    })

    if(currentScroll + window.innerHeight >= document.documentElement.scrollHeight) {
        navbar.classList.remove('scrolled-navbar-down','scrolled-navbar-up')
    }

    if(currentScroll == 0) {
        navbar.classList.remove('scrolled-navbar-down');
        navbar.classList.remove('scrolled-navbar-up');
    }
    
}
