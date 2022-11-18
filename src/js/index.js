
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

function scrollToRight() {
    popularMobilesSection.scrollLeft+=350;
}
function scrollToLeft() {
 popularMobilesSection.scrollLeft-=350;
}


let popularWatchesSection = document.querySelector(".popular-watches .container");
let arrowLeftWatches = document.querySelector(".popular-watches .arrow-left");
let arrowRighttWatches = document.querySelector(".popular-watches .arrow-right");


arrowRighttWatches.addEventListener("click",function () {
   popularWatchesSection.scrollLeft+=350;
});

arrowLeftWatches.addEventListener("click",function () {
   popularWatchesSection.scrollLeft-=350;
});
