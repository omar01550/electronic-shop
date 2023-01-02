"use strict";var __awaiter=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(a,c){function r(e){try{s(o.next(e))}catch(e){c(e)}}function m(e){try{s(o.throw(e))}catch(e){c(e)}}function s(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,m)}s((o=o.apply(e,t||[])).next())}))};function getProduct(){return __awaiter(this,void 0,void 0,(function*(){let e=yield fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/${localStorage.type}/${localStorage.currentId}.json`),t=yield e.json();handelDetails(t),AddToCart(t)}))}function handelDetails(e){handelCartCount(),document.querySelector(".product-name").innerHTML=e.name,document.querySelector(".product-price").innerHTML=e.price+" EGP",document.querySelector(".details-page .images").innerHTML=`\n      <div class="main-image">\n           <img src=${e.image} alt="not found">\n           ${e.smallImages?'<div class="small-images"><img src="https://www.elshennawy.com/Data/Products/26-11-2020-12-12-12-294.jpg" alt="not found"><img src="https://www.elshennawy.com/Data/Products/26-11-2020-01-07-28-415.jpg" alt="not found"></div>':""}\n      </div>\n\n  `}function AddToCart(e){let t=[];null!=localStorage.cartElectronicProducts&&null!=localStorage.cartElectronicProducts&&"undefined"!=localStorage.cartElectronicProducts&&(t=JSON.parse(localStorage.cartElectronicProducts)),document.querySelector(".add-to-cart").addEventListener("click",(function(){addItemToCartArray(e,t)}))}function addItemToCartArray(e,t){if(0==t.filter((t=>t.id==e.id)).length)t.push(Object.assign(Object.assign({},e),{count:1})),localStorage.cartElectronicProducts=JSON.stringify(t);else for(let n=0;n<t.length;n++)t[n].id==e.id&&(t[n].count+=1,localStorage.cartElectronicProducts=JSON.stringify(t))}getProduct();let commentForm=document.querySelector("form"),commentText=document.getElementById("comment-text"),formSubmit=document.getElementById("send"),commentSound=document.querySelector(".comment-sound");let productCommentsDiv=document.querySelector(".product-comments");function createComment(){}function getUser(){fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/users/${localStorage.electonicToken}.json`).then((e=>e.json())).then((e=>{localStorage.userName=e.userName})).catch((e=>{}))}function updateCommentsToDataBase(e){return fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/${localStorage.type}/${localStorage.currentId}/comments.json`,{method:"PUT",body:JSON.stringify(e)}).then((e=>e.json())).then((e=>{formSubmit.value="send"})).catch((()=>{alert("comment not puplished")}))}function handelArrayOfComments(){return __awaiter(this,void 0,void 0,(function*(){let e=yield fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/${localStorage.type}/${localStorage.currentId}/comments.json`),t=yield e.json();if(t instanceof Array){let e=yield[{userName:localStorage.userName,content:commentText.value,date:new Date},...t];updateCommentsToDataBase(e),updateCommentsToDataBase(e).then((()=>{displayComments();let e=document.getElementById("comment-text");e.value="",e.focus()}))}else{let e=[{userName:localStorage.userName,content:commentText.value,date:new Date}];yield updateCommentsToDataBase(e),updateCommentsToDataBase(e),updateCommentsToDataBase(e).then((()=>{displayComments();let e=document.getElementById("comment-text");e.value="",e.focus()}))}}))}function displayComments(){return __awaiter(this,void 0,void 0,(function*(){let e=yield fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/${localStorage.type}/${localStorage.currentId}/comments.json`);uiComment(yield e.json())}))}function uiComment(e){e?(productCommentsDiv.innerHTML="",e.forEach(((e,t)=>{let n=new Date(e.date);productCommentsDiv.innerHTML+=`\n            <div class="comment">\n                 <div class="comment-info">\n                   <i class="fa fa-user"></i>\n                   <span class="commrnt-user-name">${e.userName}</span>\n                   <div class="comment-date">\n                       <span>${n.getDate()}</span>/\n                       <span>${n.getMonth()+1}</span>/\n                       <span>${n.getFullYear()}</span>\n                   </div>\n                 </div>\n                 <div class="comment-content">\n                       <h1>${e.content}</h1>\n\n\n                 </div>\n            </div>\n            `}))):(productCommentsDiv.innerHTML="",productCommentsDiv.innerHTML+="\n                <h1>no commements</h1>\n            ")}commentForm.addEventListener("submit",(function(e){formSubmit.value="...",e.preventDefault(),"true"==localStorage.login?(getUser(),handelArrayOfComments()):(alert("you must be sign"),formSubmit.value="...")})),displayComments();
let addToCartBtn = document.querySelector(".add-to-cart");
addToCartBtn.addEventListener("click",function () {
    setTimeout(function () {
       handelCartCount()
    }, 500);
})