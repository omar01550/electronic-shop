let popularMobiles = document.querySelector(".popular-mobiles .container") ;// popular mobiles section in home page
let popularwatches = document.querySelector(".popular-watches .container") ;// popular watches section  in home page
getMobilesFromDb(); //get mobiles from data base
getWatchesFromDb(); //get watches from data base
mobilesSectionScrolling() //
watchesSectionScrolling()
window.addEventListener("load",handelCartCount);
window.addEventListener("load",handelUl);
//cart count

// **** functions ****

// create mobile html card
function createProductMobile(id,img,title,brand,storage,ram,color,price) {
      let product = `
                <div class="mobile product" id=${id}>
                <img src=${img} alt="not found image" class="mobile-image">
                <div class="details">
                    <h1 class="mobile-title">${title}</h1>
                    <small class="brand">${brand}</small>
                    <span class="storage">storage ${storage} gb</span>
                    <span class="ram">ram ${ram} gb</span>
                    <span>color ${color}</span>
                    <div class="price">
                        <h3 class="real-price">${price}</h3>
                        <span>discount 0 egp</span>

                    </div>
                    <button type="button" name="button" class="add-to-cart">
                           <span>add to cart</span>
                           <i class="fa fa-cart-shopping"></i>
                    </button>
                </div>

          </div>

      `
      return product;
}
// create watch html card
function createProductWatch(id,img,title,color,price) {
      let product = `
                <div class="watch product" id=${id}>
                <img src=${img} alt="not found image" class="mobile-image">
                <div class="details">
                    <h1 class="mobile-title">${title}</h1>

                    <span>color ${color}</span>
                    <div class="price">
                        <h3 class="real-price">${price}</h3>
                        <span>discount 0 egp</span>

                    </div>
                    <button type="button" name="button" class="add-to-cart">
                           <span>add to cart</span>
                           <i class="fa fa-cart-shopping"></i>
                    </button>
                </div>

          </div>

      `
      return product;
};
//when click on any product watch or mobile
function clickOnProduct() {
  let allProducts = document.querySelectorAll(".product");
  allProducts.forEach((product, i) => {
      product.addEventListener("click",function () {
          localStorage.currentId = product.id;
          // check type api
          if (product.classList.contains("mobile")) {
              localStorage.type="mobiles";
          }else{
            localStorage.type="watches";
          }
          window.location="details.html";
      })
  });
}
//get mobiles feom data base
async function getMobilesFromDb() {
    let response =  await fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/mobiles.json`);
    let mobiles = await response.json()  ;

    mobiles.forEach((mobile, i) => {
      popularMobiles.innerHTML+=createProductMobile(i,mobile.image,mobile.name,mobile.brand,mobile.storage,mobile.ram,mobile.color,mobile.price);

});

  clickOnProduct()


}
// get watches from data base
async function getWatchesFromDb() {
  let response =  await fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/watches.json`);
  let watches = await response.json()  ;
  watches.forEach((watch, i) => {
    popularwatches.innerHTML+=createProductWatch(i,watch.image,watch.title,watch.color,watch.price) ;

  });

   clickOnProduct()

}
// handel scrolling in mobiles section
function mobilesSectionScrolling() {
  // handel scrolling in sections
  let popularMobilesSection = document.querySelector(".popular-mobiles .container");
  let arrowLeft = document.querySelector(".popular-mobiles .arrow-left");
  let arrowRight = document.querySelector(".popular-mobiles .arrow-right");
  arrowLeft.addEventListener("click",function () {

      popularMobilesSection.scrollTo({
         left:popularMobilesSection.scrollLeft-350,
         top:0
      })
  })

  arrowRight.addEventListener("click",function () {
    popularMobilesSection.scrollTo({
       left:popularMobilesSection.scrollLeft+350,
       top:0
    })
  })

}
// handel scroll in popular watches section
function watchesSectionScrolling() {
  let popularWatchesSection = document.querySelector(".popular-watches .container");
  let arrowLeftWatches = document.querySelector(".popular-watches .arrow-left");
  let arrowRightWatches = document.querySelector(".popular-watches .arrow-right");
  arrowLeftWatches.addEventListener("click",function () {
      popularWatchesSection.scrollTo({
         left:popularWatchesSection.scrollLeft-350,
         top:0
      })
  })

  arrowRightWatches.addEventListener("click",function () {
    popularWatchesSection.scrollTo({
       left:popularWatchesSection.scrollLeft+350,
       top:0
    })
  })

}

function handelCartCount() {
    let cartCount = document.querySelector(".cart-count");
    cartCount.innerHTML=localStorage.cartElectronicProducts?JSON.parse(localStorage.cartElectronicProducts).length:0;
}

// handel navBas
function handelUl() {
    let navUl = document.querySelector("header nav ul");
    if (window.screen.availWidth <= 767) {
        navUl.classList.add("hidden");
    }else{
       navUl.classList.remove("hidden");
    }

    menuToggler = document.querySelector(".menu-toggler");
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
           console.log("light");
        break;

      case "dark":
        themeToggler.classList.remove("fa-moon")  ;
        themeToggler.classList.add("fa-sun")  ;
        console.log("dark");
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
           document.documentElement.style.setProperty("--main-bg","rgba(16, 7, 39, 0.93)");
           document.documentElement.style.setProperty("--text-color","white");
           document.documentElement.style.setProperty("--product-bg","rgba(4, 4, 44, 0.8)");

      break;
      default:

    }
}

let themeToggler = document.querySelector(".theme-toggler");
window.addEventListener("load",handelTheme);
themeToggler.addEventListener("click",function () {
    changeTheme();
    handelTheme();
});
