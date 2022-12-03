let productsSection = document.querySelector(".cart-page .products");
let allProducts = [];



if (localStorage.cartElectronicProducts) {
  allProducts=JSON.parse(localStorage.cartElectronicProducts);
  allProducts.forEach((product, i) => {
      productsSection.innerHTML+=`
      <div class="cart-item">
          <div class="content">
               <h2 class="cart-name">the name</h2>
               <h3 class="cart-brand">the brand</h3>
          </div>

          <div class="image">

          </div>
      </div>

      `;

  });

  console.log("found");
}else{
   productsSection.innerHTML=`<h1>your cart is empty</h1>`;
}



function handelCartCount() {
    let cartCount = document.querySelector(".cart-count");
    cartCount.innerHTML=localStorage.cartElectronicProducts?JSON.parse(localStorage.cartElectronicProducts).length:0;
}

handelCartCount()


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
