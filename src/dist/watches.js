"use strict";var __awaiter=this&&this.__awaiter||function(t,n,c,e){return new(c||(c=Promise))((function(a,o){function i(t){try{s(e.next(t))}catch(t){o(t)}}function r(t){try{s(e.throw(t))}catch(t){o(t)}}function s(t){var n;t.done?a(t.value):(n=t.value,n instanceof c?n:new c((function(t){t(n)}))).then(i,r)}s((e=e.apply(t,n||[])).next())}))};let watchesSecction=document.querySelector(".products");function createProductWatch(t,n,c,e,a){return`\n            <div class="watch product" id=${t}>\n            <img src=${n} alt="not found image" class="watch-image">\n            <div class="details">\n                <h1 class="mobile-title">${c}</h1>\n\n                <span>color ${e}</span>\n                <div class="price">\n                    <h3 class="real-price">${a}</h3>\n                    <span>discount 0 egp</span>\n\n                </div>\n                <button type="button" name="button" class="add-to-cart">\n                       <span>add to cart</span>\n                       <i class="fa fa-cart-shopping"></i>\n                </button>\n            </div>\n\n      </div>\n\n  `}function getWatchesFromDb(){return __awaiter(this,void 0,void 0,(function*(){let t=yield fetch("https://omarapp-72ea1-default-rtdb.firebaseio.com/products/watches.json");(yield t.json()).forEach(((t,n)=>{watchesSecction.innerHTML+=createProductWatch(n,t.image,t.brand,t.color,t.price)})),clickOnProduct()}))}function clickOnProduct(){document.querySelectorAll(".product").forEach(((t,n)=>{t.addEventListener("click",(function(){localStorage.currentId=t.id,localStorage.type="watches",window.location="details.html"}))}))}getWatchesFromDb();
