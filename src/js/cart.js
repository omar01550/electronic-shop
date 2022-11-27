let CartData = JSON.parse(localStorage.getItem("products")).cart;
let products = document.querySelector(".products")
for (var i = 0; i < CartData.length; i++) {
    products .innerHTML+="<h1>all products</h1>    <hr/> ";

}
