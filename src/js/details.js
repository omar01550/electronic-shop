async function getProduct() {
    let response = await fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/${localStorage.type}/${localStorage.currentId}.json`);
    let data = await response.json();
     handelDetails(data);
}

getProduct()


function handelDetails (data) {

  let productName= document.querySelector(".product-name");
  productName.innerHTML=data.name;
  let productPrice= document.querySelector('.product-price');
  productPrice.innerHTML=data.price;
  //handel images
  let mainImage = document.querySelector(".main-image img");
  let smallImages= document.querySelectorAll('.small-images img');
  mainImage.src=data.image
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
       productPrice.innerHTML=count*data.price;

  })
  decrement.addEventListener("click",function () {
    if (count>=1) {
      count--;
      productsCountElement.innerHTML=count;
      productPrice.innerHTML=count*data.price;
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

}
