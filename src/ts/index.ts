type product = {
    id:number,
    image:string,
    name:string,
    storage:number,
    ram:number,
    barnd:string,
    color:string,
    price:number
}

type watch={
  id:number,
  image:string,
  name:string,
  brand:string,
  color:string,
  price:number
}

let popularMobiles = document.querySelector(".popular-mobiles .container") as HTMLElement ;// popular mobiles section in home page
let popularwatches = document.querySelector(".popular-watches .container") as HTMLElement;// popular watches section  in home page
let popularLoder=document.querySelector(".popular-loder") as HTMLElement;
getMobilesFromDb(); //get mobiles from data base
getWatchesFromDb(); //get watches from data base
mobilesSectionScrolling() //
watchesSectionScrolling();



//cart count

// **** functions ****

// create mobile html card
function createProductMobile(product:product) :string{

    return(
      `
        <div class="mobile product" id=${product.id}>
              <img src=${product.image} alt="not found image" class="mobile-image">
              <div class="details">
                  <h1 class="mobile-title">${product.name}</h1>
                  <small class="brand">${product.barnd}</small>
                  <span class="storage">storage ${product.storage} gb</span>
                  <span class="ram">ram ${product.ram} gb</span>
                  <span>color ${product.color}</span>
                  <div class="price">
                      <h3 class="real-price">${product.price} <small>EGP</small></h3>
                      <span>discount 0 egp</span>

                  </div>
                  <button type="button" name="button" class="add-to-cart">
                         <span>add to cart</span>
                         <i class="fa fa-cart-shopping"></i>
                  </button>
              </div>

        </div>

    `
    )

}
// create watch html card
function createProductWatch(id:string,img:string,title:string,color:string,price:string) :string{
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
};
//when click on any product watch or mobile
function clickOnProduct() {
  let allProducts = document.querySelectorAll(".product");
  allProducts.forEach((product) => {
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
//get mobiles feom data base
async function getMobilesFromDb() {
    popularLoder.classList.remove("hidden");
    let response =  await fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/mobiles.json`);
    let mobiles = await response.json()  ;

    if (response.status>=300 || response.status <200) {
        console.log("response not load "+response.status);
    }else{
      popularLoder.classList.add("hidden");
    }

    popularMobiles.innerHTML="";
    mobiles.forEach((mobile:product) => {
          popularMobiles.innerHTML+=createProductMobile(mobile);

    });

  clickOnProduct()


}
// get watches from data base
async function getWatchesFromDb() {
  let response =  await fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/products/watches.json`);
  let watches = await response.json()  ;
  popularwatches.innerHTML='';
  watches.forEach((watch:watch, i:number) => {
    popularwatches.innerHTML+=createProductWatch(i,watch.image,watch.brand,watch.color,watch.price) ;
    console.log(watch);

  });

   clickOnProduct()

}
// handel scrolling in mobiles section
function mobilesSectionScrolling() {
  // handel scrolling in sections
  let popularMobilesSection = document.querySelector(".popular-mobiles .container") as HTMLElement;
  let arrowLeft = document.querySelector(".popular-mobiles .arrow-left") as HTMLElement;
  let arrowRight = document.querySelector(".popular-mobiles .arrow-right") as HTMLElement;
  arrowLeft.addEventListener("click",function () {
      arrowLeft.style.backgroundColor=`var(--main-color)`;
      arrowLeft.style.color=`white`;
      setTimeout(function () {
         arrowLeft.style.backgroundColor=`rgba(0,0,0,0.3)`;
         arrowLeft.style.color=`var(--text-color)`;
      }, 50);

      popularMobilesSection.scrollTo({
         left:popularMobilesSection.scrollLeft-350,
         top:0
      })
  })

  arrowRight.addEventListener("click",function () {
    arrowRight.style.backgroundColor=`var(--main-color)`;
    arrowRight.style.color=`white`;

    setTimeout(function () {
       arrowRight.style.backgroundColor=`rgba(0,0,0,0.3)`;
       arrowRight.style.color=`var(--text-color)`;
    }, 50);

    popularMobilesSection.scrollTo({
       left:popularMobilesSection.scrollLeft+350,
       top:0
    })
  })

}
// handel scroll in popular watches section
function watchesSectionScrolling() {
  let popularWatchesSection = document.querySelector(".popular-watches .container") as HTMLElement;
  let arrowLeftWatches = document.querySelector(".popular-watches .arrow-left") as HTMLElement;
  let arrowRightWatches = document.querySelector(".popular-watches .arrow-right") as HTMLElement;
  arrowLeftWatches.addEventListener("click",function () {
      popularWatchesSection.scrollTo({
         left:popularWatchesSection.scrollLeft-350,
         top:0
      })
  })

  arrowRightWatches.addEventListener("click",function () {
    popularWatchesSection.scrollTo({
       left:popularWatchesSection.scrollLeft+350,
       top:0
    })
  })

}
