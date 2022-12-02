"use strict";
//sections
let popularMobiles = document.querySelector(".popular-mobiles .container") ;
let popularwatches = document.querySelector(".popular-watches .container") ;
//event listeners

//get mobiles data;
async function getMobilesFromDb() {
    let response =  await fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/mobiles.json`);
    let mobiles = await response.json()  ;
    mobiles.forEach((mobile, i) => {
      popularMobiles.innerHTML+=createProductMobile(i,
        mobile.image,mobile.name,mobile.brand,mobile.storage,mobile.ram,mobile.color,mobile.price)        ;
    });

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
getMobilesFromDb();

async function getWatchesFromDb() {
  let response =  await fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/watches.json`);
  let watches = await response.json()  ;
  watches.forEach((watch, i) => {
    popularwatches.innerHTML+=createProductWatch(i,watch.image,watch.title,watch.color,watch.price) ;
  });
}

getWatchesFromDb();
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

// scroling for watches
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
// end scrolling

//add data to local storage
async function getDataFromJson() {
   let res = await fetch("../../data.json");
   let data = await res.json();
   localStorage.setItem("products",JSON.stringify(data));
}

// craete mobile in popular watches
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
// craete watch in popular watches
function createProductWatch(id,img,title,color,price) {
      let product = `
                <div class="mobile product" id=${id}>
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

//loder animation
// let loder = document.querySelector(".loder");
// window.onload = function () {
//     loder.classList.add("hidden")
// }


// fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products.json`,{
//   method:"PUT",
//   body:JSON.stringify()
// }
// ).then((res) => {
//   return res.json();
// }).then((data) => {
//    console.log(data);
// });
