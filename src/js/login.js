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
// //sign in
// let loginForm = document.querySelector(".login-form");
// let loginEmail = document.querySelector(".login-email");
// let loginPassword = document.querySelector(".login-password");
//
// async function logInFunction(user) {
//      let found= false;
//      let response = await fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/users.json`);
//      let users = await response.json();
//      let currentUser;
//      for(let i=0;i<users.length;i++){
//         if (users[i].email == loginEmail.value && users[i].password == loginPassword.value) {
//              found = true
//              currentUser=users[i];
//         }
//      }
//
//     switch (found) {
//       case true:
//              localStorage.login=true;
//              localStorage.electonicToken=users.indexOf(currentUser);
//              window.location="index.html";
//         break;
//       default:
//       alert("the user not found");
//
//     }
// }
// loginForm.addEventListener("submit",function(e){
//    e.preventDefault();
//    logInFunction();
// })

// register
let registForm = document.querySelector(".register-form");
let formUserName = document.querySelector(".register .register-user-name") ;
let formPassword = document.querySelector(".register .register-password");
let formEmail= document.querySelector(".register .register-email");
let submitBtn = document.querySelector(".register-form .submit-btn");


registForm.addEventListener("submit",function (e) {
         e.preventDefault();
          userFound(formEmail,formPassword).then((userCase) => {
                  if (userCase== false) {
                       doRedister(formUserName,formEmail,formPassword);
                    }else{
                    alert("the user is alerdy found")
                  }
               })
    });
// ************** do regiter function ********************
function doRedister(formUserName,formEmail,formPassword) {
  let user ={
   userName:formUserName.value,
   id:Math.floor(Math.random()*100000),
   email:formEmail.value,
   password:formPassword.value,
   tokens:[]

};

fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/users.json`).then((response) => {
   return response.json()
}).then((users) => {
    addUser(users,user)
    localStorage.login=true,
    localStorage.electonicToken=users.indexOf(user);
    console.log("done");


}).then(() => {
 formUserName.value='';
 formEmail.value = '';
 formPassword.value='';
 window.location="index.html";
})
}
// ************** form validation ********************
function formValidation(formUserName,formPassword,formEmail) {

    return true;
}
// ************** check user found  ********************
async function userFound(formEmail,formPassword) {
  let found= false;
  let response = await fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/users.json`);
  let users = await response.json();
  let currentUser;
  for(let i=0;i<users.length;i++){
     if (users[i].email == formEmail.value && users[i].password == formPassword.value) {
          found = true
          currentUser=users[i];
     }
  }

  return found;
}
// ************** add user to date base  ****************
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
