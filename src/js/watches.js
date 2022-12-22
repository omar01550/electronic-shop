"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let watchesSecction = document.querySelector(".products"); // product container
getWatchesFromDb();
// **** functions ****
//create watch card html
function createProductWatch(id, img, title, color, price) {
    let product = `
            <div class="watch product" id=${id}>
            <img src=${img} alt="not found image" class="watch-image">
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

  `;
    return product;
}
// get watches from data base
function getWatchesFromDb() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/watches.json`);
        let watches = yield response.json();
        watches.forEach((watch, i) => {
            watchesSecction.innerHTML += createProductWatch(i, watch.image, watch.brand, watch.color, watch.price);
        });
        clickOnProduct();
    });
}
//when click on any product watch or mobile
function clickOnProduct() {
    let allProducts = document.querySelectorAll(".product");
    allProducts.forEach((product, i) => {
        product.addEventListener("click", function () {
            localStorage.currentId = product.id;
            // check type api
            localStorage.type = "watches";
            window.location = "details.html";
        });
    });
}
