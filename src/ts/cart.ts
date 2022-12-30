

let productsSection = document.querySelector(".cart-page .products") as HTMLElement;

let allProducts :[]= [];


if (localStorage.cartElectronicProducts != undefined && localStorage.cartElectronicProducts != "undefined") {
  allProducts=JSON.parse(localStorage.cartElectronicProducts);
  productsSection.innerHTML='';

  allProducts.forEach((product, i:number) => {

      productsSection.innerHTML+=createCartItem(product)

  });


}else{
   productsSection.innerHTML=`<h1 class="cart-empty-msg">your cart is empty</h1>`;
}


function createCartItem(product:productCart) :string{
    return (
      `
      <div class="cart-item" id=${product.id}>
           <div class="left">
                <div class="cart-item-image">
                     <img src=${product.image} alt="not found">
                </div>

                <div class="counter">
                    <button type="button" name="button" class="increment" onclick=${increment}>+</button>
                    <input type="number" name="" class="count-items" value=${product.count}>
                    <button type="button" name="button" class="decrement">-</button>
                </div>
           </div>


           <div class="right">
                 <h2 class="cart-item-title">${product.name}</h2>
                 <div class="price">
                      <table>
                          <tr>
                             <td class="key">price of one</td>
                             <td class="price-one value">${product.price}</td>
                          </tr>

                          <tr>
                             <td class="key">total price</td>
                             <td class="total-price value">${product.price*product.count}</td>
                          </tr>


                          <tr>
                             <td class="key">color</td>
                             <td class="color value">${product.color}</td>
                          </tr>



                      </table>

                      <button type="button" name="button" class="delete-item">delete</button>

                 </div>
           </div>
      </div>
      `
    );

};


// increment and decrement
function increment():void{
   console.log(true)
}
