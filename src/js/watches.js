let watchesSecction = document.querySelector(".products");
let data = JSON.parse(localStorage.products);
let watches = data.watches;
console.log(watchesSecction);
for(let i=0;i<watches.length;i++){
     watchesSecction.innerHTML+= createProductWatch(watches[i].id,watches[i].image,watches[i].name,watches[i].color,watches[i].price)

}


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


let products = document.querySelectorAll(".product")
products.forEach((product, i) => {
    product.addEventListener("click",function () {
        console.log(product.id);
        localStorage.productId=product.id;
        window.location="details.html";


    })
});
