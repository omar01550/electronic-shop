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
