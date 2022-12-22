type productCart = {
    id:number,
    image:string,
    name:string,
    storage:number,
    ram:number,
    barnd:string,
    color:string,
    price:number,
    count:number
}


let productsSection = document.querySelector(".cart-page .products") as HTMLElement;

let allProducts :[]= [];
if (localStorage.cartElectronicProducts) {
  allProducts=JSON.parse(localStorage.cartElectronicProducts);
  productsSection.innerHTML='';
  allProducts.forEach((product, i:number) => {

      productsSection.innerHTML+=createCartItem(product)

  });

  console.log("found");
}else{
   productsSection.innerHTML=`<h1 class="cart-empty-msg">your cart is empty</h1>`;
}


function createCartItem(product:productCart) {
    return (
      `
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
let allIncrementBtns = document.querySelectorAll('.counter .increment');
let allDecrementBtns = document.querySelectorAll('.counter .decrement');
let allInputsCount = document.querySelectorAll(".counter input") ;
let allDeleteItemBtn = document.querySelectorAll(".delete-item");
console.log(allDeleteItemBtn);

allIncrementBtns.forEach((btn, i) => {
    btn.addEventListener("click",increment)
});

allDecrementBtns.forEach((btn, i) => {
    btn.addEventListener("click",decrement)
});

allDeleteItemBtn.forEach((btn, i) => {
    btn.addEventListener("click",deleteItem)
    btn.addEventListener("click",function () {
       console.log("clicked")
    })
});



function increment(e) {
  let id:string = e.target.parentNode.parentNode.parentNode.id;
  let parentElement= document.getElementById(id);
  let input = parentElement.querySelector(`input`);


   for(let i=0;i<allProducts.length;i++){
      if (allProducts[i].id == id) {
          allProducts[i].count+=1;
           localStorage.cartElectronicProducts=JSON.stringify(allProducts);
           input.value = allProducts[i].count;
           break;
      }
   }

}

function decrement(e) {
  let id = e.target.parentNode.parentNode.parentNode.id;
  let parentElement= document.getElementById(id);
  let input = parentElement.querySelector(`input`)


   for(let i=0;i<allProducts.length;i++){
      if (allProducts[i].id == id) {
          allProducts[i].count-=1;
           localStorage.cartElectronicProducts=JSON.stringify(allProducts);
           input.value = allProducts[i].count;
           break;
      }
   }

}

function deleteItem(e) {
   let id = e.target.parentNode.parentNode.parentNode.id;
    allProducts = allProducts.filter(ele => ele.id != id);
    localStorage.cartElectronicProducts=JSON.stringify(allProducts);
    productsSection.innerHTML='';

    if (localStorage.cartElectronicProducts != undefined) {
        JSON.parse(localStorage.cartElectronicProducts).forEach((product, i) => {
             productsSection.innerHTML+=createCartItem(product)
        });

    }else{
      alert("the cart is empty");
    }





}
