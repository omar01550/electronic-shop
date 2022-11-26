"use strict";
let data ;
if (!localStorage.getItem("products")) { // check if not have data
     getDataFromJson();
}
data = JSON.parse(localStorage.getItem("products")); // aplication data
//sections
let popularMobiles = document.querySelector(".popular-mobiles .container") ;
for(let i=0;i<data.mobiles.length;i++){
      let current = data.mobiles;
      popularMobiles.innerHTML+=createProductMobile(current[i].id,current[i].image,current[i].name,current[i].barnd,current[i].storage,current[i].ram,current[i].color,current[i].price);
}
//event listeners
let products = document.querySelectorAll(".product")
products.forEach((product, i) => {
    product.addEventListener("click",function () {
        window.location="details.html";
        console.log(true);
    })
});

//
// //handel categories Sectrion
// let allCatigories = document.querySelectorAll(".image");
// allCatigories.forEach((ele, i) => {
//     ele.addEventListener("click", function () {
//         window.location = ele.dataset.target;
//     });
// });
// let popularMobilesSection = document.querySelector(".popular-mobiles .container");
// let arrowLeft = document.querySelector(".popular-mobiles .arrow-left");
// let arrowRight = document.querySelector(".popular-mobiles .arrow-right");
// let mobilesCard = document.querySelectorAll(".product"); // all mobiles
//
// mobilesCard.forEach((mobile, i) => {
//     mobile.onclick = function () {
//         window.location = 'details.html';
//     };
// });
// arrowRight.addEventListener("click", scrollToRight);
// arrowLeft.addEventListener("click", scrollToLeft);
// function scrollToRight() {
//     popularMobilesSection.scrollLeft += 350;
// }
// function scrollToLeft() {
//     popularMobilesSection.scrollLeft -= 350;
// }
// let popularWatchesSection = document.querySelector(".popular-watches .container");
// let arrowLeftWatches = document.querySelector(".popular-watches .arrow-left");
// let arrowRighttWatches = document.querySelector(".popular-watches .arrow-right");
// arrowRighttWatches.addEventListener("click", function () {
//     popularWatchesSection.scrollLeft += 350;
// });
// arrowLeftWatches.addEventListener("click", function () {
//     popularWatchesSection.scrollLeft -= 350;
// });



//add data to local storage
async function getDataFromJson() {
   let res = await fetch("../../data.json");
   let data = await res.json();
   localStorage.setItem("products",JSON.stringify(data));
}


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

//loder animation
let loder = document.querySelector(".loder");
window.onload = function () {
    loder.classList.add("hidden")
}
