// get all products by id and type
async function getProduct() {
    let response = await fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/${localStorage.type}/${localStorage.currentId}.json`);
    let data = await response.json();
     handelDetails(data);
     AddToCart(data) //handel add to cart
}
getProduct()

//handel details inner sections
function handelDetails (data) {
// header cart count
  handelCartCount()   ;

  let productName= document.querySelector(".product-name");
  productName.innerHTML=data.name;
  let productPrice= document.querySelector('.product-price');
  productPrice.innerHTML=data.price;
  //handel images
  let imagesSection = document.querySelector(".details-page .images");
  imagesSection.innerHTML=`
      <div class="main-image">
           <img src=${data.image} alt="not found">
           ${data.smallImages?`<div class="small-images"><img src="https://www.elshennawy.com/Data/Products/26-11-2020-12-12-12-294.jpg" alt="not found"><img src="https://www.elshennawy.com/Data/Products/26-11-2020-01-07-28-415.jpg" alt="not found"></div>`:""}
      </div>

  `


  // handel counter

  let productsCountElement = document.querySelector(".count");

  let increment = document.querySelector(".increment");
  let decrement = document.querySelector(".decrement");

  increment.addEventListener("click",function () {
       count++;
       productsCountElement.innerHTML=count;
       productPrice.innerHTML=count*data.price;

  })
  decrement.addEventListener("click",function () {
    if (count>=1) {
      count--;
      productsCountElement.innerHTML=count;
      productPrice.innerHTML=count*data.price;
    }

  })

}


//handelcart
function AddToCart(product) {
    let cartData = [] ;
    if (localStorage.cartElectronicProducts) {
        cartData=JSON.parse(localStorage.cartElectronicProducts);
    }


    let addToCart = document.querySelector(".add-to-cart");
    addToCart.addEventListener("click",function () {
        for(let i=0;i<count;i++){
             cartData.push(product);
        }


        localStorage.cartElectronicProducts=JSON.stringify(cartData);
        handelCartCount();
    })
}

// count of products  in cart

let count = 1;

function handelCartCount() {
    let cartCount = document.querySelector(".cart-count");
    cartCount.innerHTML=localStorage.cartElectronicProducts?JSON.parse(localStorage.cartElectronicProducts).length:0;
}


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

window.addEventListener("load",handelUl);


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
