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
getProduct();
// functions ****************  **** ******
// getProduct function
function getProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/${localStorage.type}/${localStorage.currentId}.json`);
        let data = yield response.json();
        handelDetails(data);
        AddToCart(data);
    });
}
//handel details inner sections
function handelDetails(data) {
    // header cart count
    handelCartCount();
    let productName = document.querySelector(".product-name");
    productName.innerHTML = data.name;
    let productPrice = document.querySelector('.product-price');
    productPrice.innerHTML = data.price + " EGP";
    //handel images
    let imagesSection = document.querySelector(".details-page .images");
    imagesSection.innerHTML = `
      <div class="main-image">
           <img src=${data.image} alt="not found">
           ${data.smallImages ? `<div class="small-images"><img src="https://www.elshennawy.com/Data/Products/26-11-2020-12-12-12-294.jpg" alt="not found"><img src="https://www.elshennawy.com/Data/Products/26-11-2020-01-07-28-415.jpg" alt="not found"></div>` : ""}
      </div>

  `;
    // handel
}
// add to cart function
function AddToCart(product) {
    let allCartData = [];
    if (localStorage.cartElectronicProducts != undefined && localStorage.cartElectronicProducts != null && localStorage.cartElectronicProducts != 'undefined') {
        allCartData = JSON.parse(localStorage.cartElectronicProducts);
    }
    let addToCartBtn = document.querySelector(".add-to-cart");
    addToCartBtn.addEventListener("click", function () {
        addItemToCartArray(product, allCartData);
    });
}
function addItemToCartArray(product, allCartData) {
    if (allCartData.filter(ele => ele.id == product.id).length == 0) {
        console.log("not found product");
        allCartData.push(Object.assign(Object.assign({}, product), { count: 1 }));
        localStorage.cartElectronicProducts = JSON.stringify(allCartData);
    }
    else {
        for (let i = 0; i < allCartData.length; i++) {
            if (allCartData[i].id == product.id) {
                allCartData[i].count += 1;
                localStorage.cartElectronicProducts = JSON.stringify(allCartData);
            }
        }
    }
}
//************* comments section **********************
// fuction that atke all comment after update and push to data base;
let commentForm = document.querySelector("form");
let commentText = document.getElementById("comment-text");
let formSubmit = document.getElementById("send");
let commentSound = document.querySelector(".comment-sound");
console.log(formSubmit);
let productCommentsDiv = document.querySelector(".product-comments");
//function createComment;
function createComment() {
}
;
function getUser() {
    fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/users/${localStorage.electonicToken}.json`).then((response) => {
        return response.json();
    }).then((user) => {
        localStorage.userName = user.userName;
    }).catch((user) => {
    });
}
function updateCommentsToDataBase(comments) {
    return (fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/${localStorage.type}/${localStorage.currentId}/comments.json`, {
        method: "PUT",
        body: JSON.stringify(comments)
    }).then((response) => {
        return response.json();
    }).then((data) => {
        formSubmit.value = "send";
    })).catch(() => {
        alert("comment not puplished");
    });
}
;
function handelArrayOfComments() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/${localStorage.type}/${localStorage.currentId}/comments.json`);
        let productComments = yield response.json();
        if (productComments instanceof Array) {
            let commentsAfterUpdate = yield [{ userName: localStorage.userName, content: commentText.value, date: new Date() }, ...productComments];
            updateCommentsToDataBase(commentsAfterUpdate);
            updateCommentsToDataBase(commentsAfterUpdate).then(() => {
                displayComments();
                let commentText = document.getElementById("comment-text");
                commentText.value = '';
                commentText.focus();
            });
        }
        else {
            let commentsAfterUpdate = [{ userName: localStorage.userName, content: commentText.value, date: new Date() }];
            yield updateCommentsToDataBase(commentsAfterUpdate);
            updateCommentsToDataBase(commentsAfterUpdate);
            updateCommentsToDataBase(commentsAfterUpdate).then(() => {
                displayComments();
                let commentText = document.getElementById("comment-text");
                commentText.value = '';
                commentText.focus();
            });
        }
    });
}
commentForm.addEventListener("submit", function (e) {
    formSubmit.value = `...`;
    e.preventDefault();
    if (localStorage.login == "true") {
        getUser();
        handelArrayOfComments();
    }
    else {
        alert("you must be sign");
    }
});
function displayComments() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/${localStorage.type}/${localStorage.currentId}/comments.json`);
        let comments = yield response.json();
        uiComment(comments);
    });
}
displayComments();
function uiComment(comments) {
    if (comments) {
        productCommentsDiv.innerHTML = ``;
        comments.forEach((comment, i) => {
            let commentDate = new Date(comment.date);
            productCommentsDiv.innerHTML += `
            <div class="comment">
                 <div class="comment-info">
                   <i class="fa fa-user"></i>
                   <span class="commrnt-user-name">${comment.userName}</span>
                   <div class="comment-date">
                       <span>${commentDate.getDate()}</span>/
                       <span>${commentDate.getMonth() + 1}</span>/
                       <span>${commentDate.getFullYear()}</span>
                   </div>
                 </div>
                 <div class="comment-content">
                       <h1>${comment.content}</h1>


                 </div>
            </div>
            `;
        });
    }
    else {
        productCommentsDiv.innerHTML = ``;
        productCommentsDiv.innerHTML += `
                <h1>no commements</h1>
            `;
    }
}
