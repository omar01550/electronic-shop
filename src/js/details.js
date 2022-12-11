let count =1;
// get all products by id and type
  //to get username;
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
  productPrice.innerHTML=data.price+" EGP";
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

     let count=1;
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


//************* comments section **********************
// fuction that atke all comment after update and push to data base;

let commentForm = document.querySelector("form");
let commentText= document.getElementById("comment-text");
let formSubmit = document.getElementById("send");
let commentSound = document.querySelector(".comment-sound");
console.log(formSubmit);
let  productCommentsDiv = document.querySelector(".product-comments");
//function createComment;
function createComment() {

};


function getUser() {
     fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/users/${localStorage.electonicToken}.json`).then((response) => {
         return response.json();

     }).then((user) => {
         localStorage.userName = user.userName;

     }).catch((user) => {

     })

}
function updateCommentsToDataBase(comments) {
   return (fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/${localStorage.type}/${localStorage.currentId}/comments.json`,{
      method:"PUT",
      body:JSON.stringify(comments)
   }).then((response) => {
       return response.json()
   }).then((data) => {
      formSubmit.value= "send";

   })).catch(() => {
       alert("comment not puplished")
   })

};

async function handelArrayOfComments() {
  let response = await fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/${localStorage.type}/${localStorage.currentId}/comments.json`);
  let productComments = await response.json();

  if (productComments instanceof Array) {
        let commentsAfterUpdate = await [{userName:localStorage.userName,content:commentText.value,date:new Date()},...productComments];
         updateCommentsToDataBase(commentsAfterUpdate);
         updateCommentsToDataBase(commentsAfterUpdate).then(() => {
            displayComments();
            let commentText = document.getElementById("comment-text");
            commentText.value=''
            commentText.focus();
         })



  }else{
       let commentsAfterUpdate = [{userName:localStorage.userName,content:commentText.value,date:new Date()}];
       await updateCommentsToDataBase(commentsAfterUpdate);
       updateCommentsToDataBase(commentsAfterUpdate)
       updateCommentsToDataBase(commentsAfterUpdate).then(() => {
          displayComments();
          let commentText = document.getElementById("comment-text");
          commentText.value=''
          commentText.focus();

       })
}

}


commentForm.addEventListener("submit",function (e) {
    formSubmit.value=`...`;
    e.preventDefault()
        if (localStorage.login == "true") {
          getUser();
          handelArrayOfComments();
        }else{
           alert("you must be sign")
        }




})


async function displayComments() {


     let response = await fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/${localStorage.type}/${localStorage.currentId}/comments.json`);
     let comments = await response.json();


      uiComment(comments);

}

displayComments();
function uiComment(comments){
  if (comments) {
         productCommentsDiv.innerHTML=``;
          comments.forEach((comment, i) => {
           let commentDate = new Date(comment.date);

            productCommentsDiv.innerHTML+=`
            <div class="comment">
                 <div class="comment-info">
                   <i class="fa fa-user"></i>
                   <span class="commrnt-user-name">${comment.userName}</span>
                   <div class="comment-date">
                       <span>${commentDate.getDate()-1}</span>/
                       <span>${commentDate.getMonth()+1}</span>/
                       <span>${commentDate.getFullYear()}</span>
                   </div>
                 </div>
                 <div class="comment-content">
                       <h1>${comment.content}</h1>


                 </div>
            </div>
            `
          });
       }else{
             productCommentsDiv.innerHTML=``;
            productCommentsDiv.innerHTML+=`
                <h1>no commements</h1>
            `;
       }


}
