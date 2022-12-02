let watchesSecction = document.querySelector(".products");

async function getWatchesFromDb() {
    let response =  await fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/watches.json`);
    let watches = await response.json()  ;

    watches.forEach((watch, i) => {
          watchesSecction.innerHTML+=createProductWatch(i,watch.image,watch.title,watch.color,watch.price) ;
  });

  clickOnProduct()    ;
}

getWatchesFromDb();









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
}

function clickOnProduct() {
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
