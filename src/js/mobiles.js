let mobilesSection = document.querySelector(".products");
// header cart count
let cartCount = document.querySelector(".cart-count");
console.log(cartCount);
cartCount.innerHTML=localStorage.cartElectronicProducts?JSON.parse(localStorage.cartElectronicProducts).length:0;

loading();
getMobilesFromDb()
window.addEventListener("load",handelCartCount);
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
// get mobiles from data base
async function getMobilesFromDb() {
    let response =  await fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/mobiles.json`);
    let mobiles = await response.json()  ;

    mobiles.forEach((mobile, i) => {
          mobilesSection.innerHTML+=createProductMobile(i,mobile.image,mobile.name,mobile.brand,mobile.storage,mobile.ram,mobile.color,mobile.price);
  });

  clickOnProduct();


}
//when click on any product
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
// loder
function loading(){
  // let loder = document.querySelector(".loder");
  //  window.addEventListener("load",function () {
  //       loder.classList.add("hidden");
  //  })
}
