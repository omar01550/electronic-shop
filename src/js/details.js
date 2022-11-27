let allData = JSON.parse(localStorage.products);
let product =JSON.parse(localStorage.products).mobiles.filter(mobile => mobile.id == localStorage.productId);

//handel product

let productName= document.querySelector(".product-name");
productName.innerHTML=product[0].name;
let productPrice= document.querySelector('.product-price');
productPrice.innerHTML=product[0].price;
//handel images
let mainImage = document.querySelector(".main-image img");
let smallImages= document.querySelectorAll('.small-images img');
mainImage.src=product[0].image
smallImages.forEach((img, i) => {
    img.addEventListener("click",function () {
        mainImage.src=this.src;
    })
});


// handel counter
let count = 1;
let productsCountElement = document.querySelector(".count");

let increment = document.querySelector(".increment");
let decrement = document.querySelector(".decrement");

increment.addEventListener("click",function () {
     count++;
     productsCountElement.innerHTML=count;
     productPrice.innerHTML=count*product[0].price;

})
decrement.addEventListener("click",function () {
  if (count>=1) {
    count--;
    productsCountElement.innerHTML=count;
    productPrice.innerHTML=count*product[0].price;
  }

})



// handel add to cart
let addToCart = document.querySelector(".add-to-cart");

addToCart.addEventListener("click",function () {
    if(count > 0){
         for(let i=0;i<count;i++){
             allData.cart.push(product);
         }
      }
      localStorage.setItem("products",JSON.stringify(allData));
      window.location="cart.html";
})
