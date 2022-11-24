// nav bar
let ul = document.querySelector("nav > ul");
console.log(ul)
let menuToggler = document.querySelector(".menu-toggler") as HTMLUListElement;

menuToggler.addEventListener("click",function() :void{
    ul.classList.toggle("hidden");
})

if(window.screen.width > 767){
   ul.classList.remove("hidden");
}else{
   ul.classList.add("hidden");
}







//handel categories Sectrion

let allCatigories = document.querySelectorAll(".image");

allCatigories.forEach((ele, i) => {
    ele.addEventListener("click",function () {
        window.location=ele.dataset.target;
    })
});



let popularMobilesSection = document.querySelector(".popular-mobiles .container");
let arrowLeft = document.querySelector(".popular-mobiles .arrow-left");
let arrowRight = document.querySelector(".popular-mobiles .arrow-right");
let mobilesCard = document.querySelectorAll(".mobile"); // all mobiles


mobilesCard.forEach((mobile, i) => {
    mobile.onclick=function () {
        window.location= 'details.html';
    }
});

arrowRight.addEventListener("click",scrollToRight);
arrowLeft.addEventListener("click",scrollToLeft);

function scrollToRight() :void{
    popularMobilesSection.scrollLeft+=350;
}
function scrollToLeft() :void{
 popularMobilesSection.scrollLeft-=350;
}


let popularWatchesSection = document.querySelector(".popular-watches .container");
let arrowLeftWatches = document.querySelector(".popular-watches .arrow-left");
let arrowRighttWatches = document.querySelector(".popular-watches .arrow-right");


arrowRighttWatches.addEventListener("click",function () :void{
   popularWatchesSection.scrollLeft+=350;
});

arrowLeftWatches.addEventListener("click",function () :void{
   popularWatchesSection.scrollLeft-=350;
});
