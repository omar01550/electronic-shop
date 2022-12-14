"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function handelRoutes() {
    let routes = document.querySelectorAll(".routes li");
    let signSection = document.querySelectorAll(".sign-content div");
    routes.forEach((route, i) => {
        route.addEventListener("click", function () {
            signSection.forEach((section, i) => {
                section.classList.add("hidden");
            });
            let currentSection = document.querySelector(route.dataset.target);
            currentSection.classList.remove("hidden");
        });
    });
}
function handelActiveSection() {
    let routes = document.querySelectorAll(".routes li");
    routes.forEach((route, i) => {
        route.addEventListener("click", function () {
            routes.forEach((route, i) => {
                route.classList.remove("active-section");
            });
            route.classList.add("active-section");
        });
    });
}
handelActiveSection();
handelRoutes();


// register
let registForm = document.querySelector(".register-form");
let formUserName = document.querySelector(".register .register-user-name");
let formPassword = document.querySelector(".register .register-password");
let formEmail = document.querySelector(".register .register-email");
let submitBtn = document.querySelector(".register-form .submit-btn");
registForm.addEventListener("submit", function (e) {
    e.preventDefault();
    userFound(formEmail, formPassword).then((userCase) => {
        if (userCase == false) {
            doRedister(formUserName, formEmail, formPassword);
            localStorage.userName = formUserName.value;
        }
        else {
            alert("the user is alerdy found");
        }
    });
});
// ************** do regiter function ********************
function doRedister(formUserName, formEmail, formPassword) {
    let user = {
        userName: formUserName.value,
        id: Math.floor(Math.random() * 100000),
        email: formEmail.value,
        password: formPassword.value,
        tokens: []
    };
    fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/users.json`).then((response) => {
        return response.json();
    }).then((users) => {
        addUser(users, user);
        localStorage.login = true,
            localStorage.electonicToken = users.indexOf(user);
        console.log("done");
    }).then(() => {
        formUserName.value = '';
        formEmail.value = '';
        formPassword.value = '';
        window.location = "index.html";
    });
}
// ************** form validation ********************
function formValidation(formUserName, formPassword, formEmail) {
    return true;
}
// ************** check user found  ********************
function userFound(formEmail, formPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        let found = false;
        let response = yield fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/users.json`);
        let users = yield response.json();
        let currentUser;
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == formEmail.value && users[i].password == formPassword.value) {
                found = true;
                currentUser = users[i];
            }
        }
        return found;
    });
}
// ************** add user to date base  ****************
function addUser(users, user) {
    users.push(user);
    fetch(`https://omarapp-72ea1-default-rtdb.firebaseio.com/users.json`, {
        method: "PUT",
        body: JSON.stringify(users)
    }).then((data) => {
        return data.json();
    }).then((data) => {
    });
}
