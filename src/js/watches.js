let watchesSecction = document.querySelector(".products"); // product container
getWatchesFromDb();
// **** functions ****

//create watch card html
function createProductWatch(id,img,title,color,price) {
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

  `
  return product;
}
// get watches from data base
async function getWatchesFromDb() {
    let response =  await fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/watches.json`);
    let watches = await response.json()  ;

    watches.forEach((watch, i) => {
          watchesSecction.innerHTML+=createProductWatch(i,watch.image,watch.brand,watch.color,watch.price) ;

  });

  clickOnProduct()    ;
}
//when click on any product watch or mobile
function clickOnProduct() {
  let allProducts = document.querySelectorAll(".product");
  allProducts.forEach((product, i) => {
      product.addEventListener("click",function () {
          localStorage.currentId = product.id;
          // check type api
          localStorage.type="watches";
          window.location="details.html";
      })
  });
}
