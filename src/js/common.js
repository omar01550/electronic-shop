

let themeToggler = document.querySelector(".theme-toggler");
let user = document.querySelector(".user");
let userCase = document.querySelector(".user-case");


function handelCartCount() {
    let cartCount = document.querySelector(".cart-count");
    cartCount.innerHTML=localStorage.cartElectronicProducts?JSON.parse(localStorage.cartElectronicProducts).length:0;
}

handelCartCount()

// handel navBas
function handelUl() {
    let navUl = document.querySelector("header nav ul");
    if (window.screen.availWidth <= 767) {
        navUl.classList.add("hidden");
    }else{
       navUl.classList.remove("hidden");
    }

    let menuToggler = document.querySelector(".menu-toggler");

    menuToggler.addEventListener("click",function () {
        navUl.classList.toggle("hidden");
    });
}



// theme dark and light;
function handelTheme() {
    // handel icon sun and moon
    switch (localStorage.electronicTheme) {
      case "light":
           themeToggler.classList.remove("fa-sun")  ;
           themeToggler.classList.add("fa-moon")  ;

        break;

      case "dark":
        themeToggler.classList.remove("fa-moon")  ;
        themeToggler.classList.add("fa-sun")  ;

        break;
      default:

    }

    // change colors
    themeColors();
}

function changeTheme() {
    localStorage.electronicTheme=="light"?localStorage.electronicTheme="dark":localStorage.electronicTheme="light";
}

function themeColors() {
    switch (localStorage.electronicTheme) {
      case "light":
            document.documentElement.style.setProperty("--main-bg","white");
            document.documentElement.style.setProperty("--text-color","black");
            document.documentElement.style.setProperty("--product-bg","white");
      break;

      case "dark":
           document.documentElement.style.setProperty("--main-bg","rgba(30, 32, 41, 1)");
           document.documentElement.style.setProperty("--text-color","white");
           document.documentElement.style.setProperty("--product-bg","rgba(4, 4, 44, 0.8)");

      break;
      default:

    }
}


window.addEventListener("load",handelTheme);
themeToggler.addEventListener("click",function () {
    changeTheme();
    handelTheme();
});




user.addEventListener("click",function () {
    userCase.classList.toggle("hidden");
})


// hadel userIcon
function handelUserIcon() {
  if (localStorage.login == "true") {
      userCase.innerHTML=`
          <p class="logout-btn">logout</p>
      `;
  }else{
    userCase.innerHTML=`
        <a href="login.html">login</a>
    `;
  }

  let logOutBtn = document.querySelector(".user-case >*");
  logOutBtn.addEventListener("click",logOut)

}
handelUserIcon();
// logOut
function logOut() {
     localStorage.login=false;
     localStorage.electonicToken=null;
     window.location="index.html";
     console.log("done");
}

handelUl()
