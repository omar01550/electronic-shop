let cartCount = document.querySelector(".cart-count");
cartCount.innerHTML=JSON.parse(localStorage.products).cart.length;
