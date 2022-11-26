let mobilesSecction = document.querySelector(".products");
let data = JSON.parse(localStorage.products);
let mobiles = data.mobiles;
console.log(mobilesSecction);
for(let i=0;i<mobiles.length;i++){
     mobilesSecction.innerHTML+= createProductMobile(mobiles[i].id,mobiles[i].image,mobiles[i].name,mobiles[i].barnd,mobiles[i].storage,mobiles[i].ram,mobiles[i].color,mobiles[i].price)

}


function createProductMobile(id,img,title,brand,storage,ram,color,price) {
      let product = `
                <div class="mobile product" id=${id}>
                <img src=${img} alt="not found image" class="mobile-image">
                <div class="details">
                    <h1 class="mobile-title">${title}</h1>
                    <small class="brand">${brand}</small>
                    <span class="storage">storage ${storage} gb</span>
                    <span class="ram">ram ${ram} gb</span>
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


let loder = document.querySelector(".loder");

window.onload = function () {
    loder.classList.add("hidden")
}
