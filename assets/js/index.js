document.querySelector("#register-btn").addEventListener("click", viewRegister);
document.querySelector("#login-btn").addEventListener("click", viewLogin);

let dataUsers = [];
let sesion;
let userSesion = sessionStorage.getItem("Account");
const loginPage = document.querySelector("#login-sesion");
// Validando sesion con Toast
const Toast = Swal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

function validSesion() {
  sesion = sessionStorage.getItem("sesion");
  return sesion;
}
validSesion();
if (sesion !== "" && sesion === "true") {
  loginPage.style.display = "none";

  Toast.fire({
    icon: "info",
    html: `Sesión ya iniciada con <b style="text-transform: uppercase">${userSesion.replace(
      /['"]+/g,
      ""
    )}</b>`,
  });
  setTimeout(function () {
    window.location.href = "./pages/start.html";
  }, 1000);
}
//////////

//Declaramos variables para el cambio login y Registro
const loginId = document.querySelector("#login");
const registerId = document.querySelector("#register");
const spinnerReg = document.querySelector(".spinnerReg");
const spinnerLog = document.querySelector(".spinnerLog");
document.querySelector("#register-btn").addEventListener("click", viewRegister);
document.querySelector("#login-btn").addEventListener("click", viewLogin);

//Declaramos variables para el ingeso de datos del Registro
const userReg = document.getElementById("user-reg");
const passReg = document.getElementById("pass-reg");
let buttonRegister = document.getElementById("btn-reg-submit");
//Declaramos variables para el ingeso de datos del login
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

buttonLogin.addEventListener("click", (e) => {
  e.preventDefault();
  const dataLogin = {
    user: userLog.value,
    pass: passLog.value,
  };
  login(dataLogin);
});

function toLogin() {
  window.location.href = "./";
}

function toStart() {
  window.location.href = "./pages/start.html";
}

function viewLogin() {
  registerId.style.display = "none";
  loginId.style.display = "block";
}

function viewRegister() {
  loginId.style.display = "none";
  registerId.style.display = "block";
}
// Obtenemos los datos de usuarios desde el API
// Funcion con AJAX <=================== OJO ==================
// const getUsers = async ()=>{
//   try {
//     const http = new XMLHttpRequest();
//     const url = `https://api-harley-davidson.herokuapp.com/users`;
//       http.onreadystatechange = function(){
//         if(this.readyState === 4 && this.status === 200){
//           let data = JSON.parse(this.responseText)
//           console.log("xxxxxx",data);
//           dataUsers.push(data);
//           insertUsersDom(data);
//         }
//       }
//       http.open("GET", url);
//       http.send();
//   } catch (error) {
//     Swal.fire({
//       icon: "error",
//       showConfirmButton: false,
//       title: "Oops... no se pudo obtener data de usuarios",
//       text: `${error}`,
//     });
//   }
 
// }

// Funcion con fetch <=================== OJO ==================

const getUsers = async () => {
  try {
    const response = await fetch(
      `https://api-harley-davidson.herokuapp.com/users`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    dataUsers.push(data);
    insertUsersDom(data);
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      showConfirmButton: false,
      title: "Oops... no se pudo obtener data de usuarios",
      text: `${error}`,
    });
  }
};
getUsers();

const addUsers = async (data) => {
  let payload = {
    id: "",
    usuario: data.usuario,
    password: data.password,
  };
  console.log("🚀 ~ file: inicio.js ~ line 74 ~ addUsers ~ payload", payload);
  fetch(`https://api-harley-davidson.herokuapp.com/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then(() => {
    Swal.fire({
      icon: "success",
      title: "Great!!",
      showConfirmButton: false,
      text: "Usuario registrado satisfactoriamente",
    });
    setTimeout(toLogin, 2000);
  });
};

const insertUsersDom = (data) => {
  let usersText = document.querySelector("#users-text");
  let loadCredentials = document.querySelector(".load-credentials");
  setTimeout(function () {
    loadCredentials.style.display = "none";
    let appenUsersText = document.createElement("p");
    appenUsersText.textContent =
      "Debes iniciar sesión con estas credenciales o crear un nuevo usuario ===>";
    usersText.appendChild(appenUsersText);
    let tooltipText = document.querySelector("#tooltip-text");
    let appenTooltipText = document.createElement("li");
    appenTooltipText.classList.add("text-tp");
    data.map((element) => {
      appenTooltipText.innerHTML += `<li><strong>usuario:</strong> ${element.usuario} <strong>password: </strong> ${element.password}</li> `;
    });
    tooltipText.appendChild(appenTooltipText);
  }, 2000);
};

function register(dataRegister) {
  const { usuario, password } = dataRegister;
  const data = dataUsers[0].map((element) => element);
  const textReg = document.querySelector(".reg-submit");

  if (usuario !== "" && password !== "") {
    const isAccount = data.find((element) => element.usuario === usuario);
    if (isAccount === undefined) {
      addUsers(dataRegister);
      textReg.style.display = "none";
      spinnerReg.style.display = "block";
      userReg.disabled = true;
      passReg.disabled = true;
    } else {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        showConfirmButton: false,
        text: "Usuario ya existre en DB!",
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      showConfirmButton: false,
      text: "por favor ingesar usuario i/o password!",
    });
  }
}

function login(dataLogin) {
  const { user, pass } = dataLogin;
  const data = dataUsers[0].map((element) => element);
  const textLog = document.querySelector(".log-submit");

  if (user !== "" && pass !== "") {
    const isAccount = data.find((element) => element.usuario === user);
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
        setTimeout(function () {
          Swal.fire({
            icon: "success",
            title: "Great...",
            showConfirmButton: false,
            html: `Bienvenido <b style="text-transform: uppercase">${isAccount.usuario}</b>`,
          });
        }, 2000);
        setTimeout(toStart, 3000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          showConfirmButton: false,
          text: "Credenciales invalidas!",
        });
      }
    } else {
      //toastEvent("error", "no exixten datos de usuarios", 3000,'fa-solid fa-bomb');
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        showConfirmButton: false,
        text: "no exixten datos de usuarios!",
      });
    }
  } else {
    //toastEvent("error", "por favor ingesar usuario i/o password", 3000,'fa-solid fa-bomb');
    Swal.fire({
      icon: "error",
      title: "Oops...",
      showConfirmButton: false,
      text: "por favor ingesar usuario i/o password!",
    });
  }
}
