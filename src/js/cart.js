"use strict";
let productsSection = document.querySelector(".cart-page .products");
let allProducts = [];
if (localStorage.cartElectronicProducts) {
    allProducts = JSON.parse(localStorage.cartElectronicProducts);
    productsSection.innerHTML = '';
    allProducts.forEach((product, i) => {
        productsSection.innerHTML += createCartItem(product);
    });

}
else {
    productsSection.innerHTML = `<h1 class="cart-empty-msg">your cart is empty</h1>`;
}
function createCartItem(product) {
    return (`
      <div class="cart-item" id=${product.id}>
           <div class="left">
                <div class="cart-item-image">
                     <img src=${product.image} alt="not found">
                </div>

                <div class="counter">
                    <button type="button" name="button" class="increment">+</button>
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
                             <td class="total-price value">${product.price * product.count}</td>
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
      `);
}
;
// increment and decrement
document.documentElement.addEventListener("click",function (e) {
     if (e.target.classList.contains("increment")) {
         let id = e.target.parentNode.parentNode.parentNode.id;
          increment(id);
     }
})



//decrement card

document.documentElement.addEventListener("click",function (e) {
     if (e.target.classList.contains("decrement")) {
         let id = e.target.parentNode.parentNode.parentNode.id;
          decrement(id);
     }
})

//delete

document.documentElement.addEventListener("click",function (e) {
     if (e.target.classList.contains("delete-item")) {
         let id = e.target.parentNode.parentNode.parentNode.id;
          deleteItem(id)
     }
})

function increment(id) {
  for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].id == id) {
            allProducts[i].count+=1;
              document.getElementById(id).querySelector("input").value=allProducts[i].count;
             localStorage.cartElectronicProducts=JSON.stringify(allProducts);
        }
  }
}

function decrement(id) {
  for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].id == id) {
            if (allProducts[i].count >= 1) {
              allProducts[i].count-=1;
                document.getElementById(id).querySelector("input").value--;
               localStorage.cartElectronicProducts=JSON.stringify(allProducts);
            }
        }
  }
}




function deleteItem(id) {
  for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].id == id) {
           allProducts = allProducts.filter(ele => ele.id != id);
           localStorage.cartElectronicProducts=JSON.stringify(allProducts);
           addCartsToPage();


     }
}
}

function addCartsToPage() {
    productsSection.innerHTML='';
    allProducts.forEach((product, i) => {
          productsSection.innerHTML+=createCartItem(product);

    });

}
