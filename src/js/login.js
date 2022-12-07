function handelRoutes() {
    let routes = document.querySelectorAll(".routes li");
    let  signSection = document.querySelectorAll(".sign-content div");

    routes.forEach((route, i) => {
        route.addEventListener("click",function () {
             signSection.forEach((section, i) => {
                 section.classList.add("hidden");
             });

             let currentSection = document.querySelector(route.dataset.target);
             currentSection.classList.remove("hidden");


        })
    });

}

function handelActiveSection() {
    let routes = document.querySelectorAll(".routes li");

    routes.forEach((route, i) => {
         route.addEventListener("click",function () {
             routes.forEach((route, i) => {
                 route.classList.remove("active-section");
             });
             route.classList.add("active-section");
         })
    });

}
handelActiveSection()
handelRoutes()


   register();

function register() {
    let registForm = document.querySelector(".register-form");
    let formUserName = document.querySelector(".register .register-user-name") ;
    let formPassword = document.querySelector(".register .register-password");
    let formEmail= document.querySelector(".register .register-email");
    let userImage = document.querySelector(".user-image");

    registForm.addEventListener("submit",function (e) {
         e.preventDefault();
        let user ={
            userName:formUserName.value,
            id:Math.floor(Math.random()*100000),
            email:formEmail.value,
            password:formPassword.value,
            image:userImage.value,
            tokens:[]

        };

         fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/users.json`).then((response) => {
             return response.json()
         }).then((users) => {
              addUser(users,user)
              localStorage.login=true,
              localStorage.electonicToken=users.indexOf(user);
              console.log("done");


         })

          formUserName.value='';
          formEmail.value = '';
          formPassword.value='';
          window.location="index.html";

    });


}


function addUser(users,user) {
     users.push(user);

     fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/users.json`,{
        method:"PUT",
        body:JSON.stringify(users)
     }).then((data) => {
         return data.json()
     }).then((data) => {

     })
}


// sign in
let loginForm = document.querySelector(".login-form");
let loginEmail = document.querySelector(".login-email");
let loginPassword = document.querySelector(".login-password");
async function logInFunction(user) {
     let found= false;
     let response = await fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/users.json`);
     let users = await response.json();
     let currentUser;
     for(let i=0;i<users.length;i++){
        if (users[i].email == loginEmail.value && users[i].password == loginPassword.value) {
             found = true
             currentUser=users[i];
        }
     }

    switch (found) {
      case true:
             localStorage.login=true;
             localStorage.electonicToken=users.indexOf(currentUser);
             window.location="index.html";
        break;
      default:
      alert("the user not found");

    }
}

loginForm.addEventListener("submit",function(e){
   e.preventDefault();
   logInFunction();
})
