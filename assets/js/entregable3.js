import { dataUsuarios } from "./recursos/usuarios.js";
const getRegisterID = document
  .querySelector("#register-btn")
  .addEventListener("click", viewLoginRegister);
const getLoginID = document
  .querySelector("#login-btn")
  .addEventListener("click", viewLogin);
//Declaramos variables para el cambio login y Registro
const loginId = document.querySelector("#login");
const registerId = document.querySelector("#register");
const spinnerReg = document.querySelector(".spinnerReg");
const spinnerLog = document.querySelector(".spinnerLog");

let usersText = document.querySelector("#users-text");
let appenUsersText = document.createElement("p");
appenUsersText.textContent =
  "Debes iniciar sesión con estas credenciales o crear un nuevo usuario ===>";
usersText.appendChild(appenUsersText);

let tooltipText = document.querySelector("#tooltip-text");
let appenTooltipText = document.createElement("li");
appenTooltipText.classList.add("text-tp");
let dataUsers = dataUsuarios.data;
dataUsers.forEach((element) => {
  appenTooltipText.innerHTML += `<li><strong>usuario:</strong> ${element.usuario} <strong>password: </strong> ${element.password}</li> `;
});
tooltipText.appendChild(appenTooltipText);

const textReg = document.querySelector(".reg-submit");
const textLog = document.querySelector(".log-submit");

function viewLogin() {
  registerId.style.display = "none";
  loginId.style.display = "block";
}

function viewLoginRegister() {
  loginId.style.display = "none";
  registerId.style.display = "block";
}
let userList = dataUsuarios.data;
//Declaramos variables para el ingeso de datos  login y Registro
const userReg = document.getElementById("user-reg");
const passReg = document.getElementById("pass-reg");
let buttonRegister = document.getElementById("btn-reg-submit");

const userLog = document.getElementById("user");
const passLog = document.getElementById("pass");
let buttonLogin = document.getElementById("btn-log-submit");

buttonRegister.addEventListener("click", (e) => {
  e.preventDefault();
  const dataRegister = {
    usuario: userReg.value,
    password: passReg.value,
  };
  register(dataRegister);
});

function toastEvent(eventType, textEvent, time,icon ) {
  let x = document.getElementById("snackbar");
  x.className = eventType;
  x.innerHTML = `<i class="${icon}"></i> ${textEvent}`;
  setTimeout(function () {
    x.className = x.className.replace(eventType, "");
  }, time);
}

// Proceso de Regisro
function register(dataRegister) {
  const { usuario, password } = dataRegister;
  localStorage.setItem("usersList", JSON.stringify(userList));
  userList = JSON.parse(localStorage.getItem("usersList"));
  if (user !== "" && pass !== "") {
    const isAccount = userList.find((element) => element.usuario === usuario);
    if (usuario !== "" && password !== "") {
      if (isAccount === undefined) {
        userList = JSON.parse(localStorage.getItem("usersList"));
        userList.push(dataRegister);
        localStorage.setItem("usersList", JSON.stringify(userList));
        textReg.style.display = "none";
        spinnerReg.style.display = "block";
        userReg.disabled = true;
        passReg.disabled = true;
        toastEvent("sucess", "Usuario registrado satisfactoriamente", 3000,'fas fa-check');
        setTimeout(toLogin, 2000);
      } else {
        toastEvent("error", "Usuario ya existre en DB", 3000,'fa-solid fa-bomb');
      }
    } else {
      toastEvent("error", "Por favor ingesar usuario i/o password", 3000,'fa-solid fa-bomb');
    }
  }
}

function toLogin() {
  window.location.href = "./";
}

function toStart() {
  window.location.href = "./start.html";
}

buttonLogin.addEventListener("click", (e) => {
  e.preventDefault();
  const dataLogin = {
    user: userLog.value,
    pass: passLog.value,
  };
  login(dataLogin);
});

const validLS = JSON.parse(localStorage.getItem("usersList")) === null;

function login(dataLogin) {
  const { user, pass } = dataLogin;
  if (validLS) {
    localStorage.setItem("usersList", JSON.stringify(userList));
  }
  userList = JSON.parse(localStorage.getItem("usersList"));
  if (user !== "" && pass !== "") {
    const isAccount = userList.find((element) => element.usuario === user);
    if (isAccount !== "") {
      const findAccountApi = isAccount !== undefined && true;
      const validateAccountApi =
        findAccountApi &&
        isAccount.usuario == user &&
        isAccount.password == pass;
      if (validateAccountApi) {
        console.log("inicio Sesion Api");
        sessionStorage.setItem("sesion", true);
        sessionStorage.setItem("Account", JSON.stringify(isAccount.usuario));
        textLog.style.display = "none";
        spinnerLog.style.display = "block";
        userLog.disabled = true;
        passLog.disabled = true;
        toastEvent(
          "sucess",
          `Bienvenido ${JSON.stringify(isAccount.usuario)}`,
          5000,'fas fa-check'
        );
        setTimeout(toStart, 2000);
      } else {
        toastEvent("error", "Credenciales invalidas", 3000,'fa-solid fa-bomb');
      }
    } else {
      toastEvent("error", "no exixten datos de usuarios", 3000,'fa-solid fa-bomb');
    }
  } else {
    toastEvent("error", "por favor ingesar usuario i/o password", 3000,'fa-solid fa-bomb');
  }
}
