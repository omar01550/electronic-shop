"use strict";
let themeToggler = document.querySelector(".theme-toggler");
let user = document.querySelector(".user");
let userCase = document.querySelector(".user-case");
function handelCartCount() {
    let cartCount = document.querySelector(".cart-count");
    cartCount.innerHTML = localStorage.cartElectronicProducts ? JSON.parse(localStorage.cartElectronicProducts).length : 0;
}
handelCartCount();
// handel navBas
function handelUl() {
    let navUl = document.querySelector("header nav ul");
    if (window.screen.availWidth <= 767) {
        navUl.classList.add("hidden-nav");
    }
    else {
        navUl.classList.remove("hidden-nav");
    }
    let menuToggler = document.querySelector(".menu-toggler");
    menuToggler.addEventListener("click", function () {
        navUl.classList.toggle("hidden-nav");
    });
}
// theme dark and light;
function handelTheme() {
    // handel icon sun and moon
    switch (localStorage.electronicTheme) {
        case "light":
            themeToggler.classList.remove("fa-sun");
            themeToggler.classList.add("fa-moon");
            break;
        case "dark":
            themeToggler.classList.remove("fa-moon");
            themeToggler.classList.add("fa-sun");
            break;
        default:
    }
    // change colors
    themeColors();
}
function changeTheme() {
    localStorage.electronicTheme == "light" ? localStorage.electronicTheme = "dark" : localStorage.electronicTheme = "light";
}
function themeColors() {
    switch (localStorage.electronicTheme) {
        case "light":
            document.documentElement.style.setProperty("--main-bg", "white");
            document.documentElement.style.setProperty("--text-color", "black");
            document.documentElement.style.setProperty("--product-bg", "white");
            document.documentElement.style.setProperty("--footer-bg", "var(--main-color)");
            break;
        case "dark":
            document.documentElement.style.setProperty("--main-bg", "hsl(216, 53%, 9%)");
            document.documentElement.style.setProperty("--text-color", "white");
            document.documentElement.style.setProperty("--product-bg", "rgba(4, 4, 44, 0.8)");
            document.documentElement.style.setProperty("--footer-bg", "hsl(216, 53%, 9%)");
            break;
        default:
    }
}
window.addEventListener("load", handelTheme);
themeToggler.addEventListener("click", function () {
    changeTheme();
    handelTheme();
});
user.addEventListener("click", function () {
    userCase.classList.toggle("hidden");
});
// hadel userIcon
function handelUserIcon() {
    if (localStorage.login == "true") {
        userCase.innerHTML = `
          <button class="logout-btn">logout</button>
      `;
    }
    else {
        userCase.innerHTML = `
        <a href="login.html" class="login-btn">login</a>
    `;
    }
    let logOutBtn = document.querySelector(".user-case >*");
    logOutBtn.addEventListener("click", logOut);
}
handelUserIcon();
// logOut
function logOut() {
    localStorage.login = false;
    localStorage.electonicToken = null;
    window.location = "index.html";
    console.log("done");
}
handelUl();
