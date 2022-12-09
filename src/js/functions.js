// creat watch
function createProductWatch(id,img,title,color,price) {
  let product = `
            <div class="watch product" id=${id}>
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
