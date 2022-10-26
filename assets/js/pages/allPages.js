let sesion;
function validSesion() {
  sesion = sessionStorage.getItem("sesion");
  return sesion;
}
validSesion();
if (sesion !== "" && sesion !== "true") {
  toastEvent(
    "error",
    "No tiene permisos para visualizar esta página, debes iniciar sesión",
    1000,'fa-solid fa-bomb'
  );
  setTimeout(function () {
    window.location.href = "../index.html";
  }, 500);
}
function toastEvent(eventType, textEvent, time, icon) {
  let x = document.getElementById("snackbar");
  x.className = eventType;
  x.innerHTML = `<i class="${icon}"></i> ${textEvent}`;
  setTimeout(function () {
    x.className = x.className.replace(eventType, "");
  }, time);
}

const getUserLS = sessionStorage.getItem("Account");
//const logout = document.querySelector("#logout");
const getLogout = document
  .querySelector("#logout")
  .addEventListener("click", logout);

let sesionName = document.querySelector("#user-sesion");
let appensesionName = document.createElement("p");
appensesionName.classList.add("active-sesion");
appensesionName.textContent = getUserLS.replaceAll('"', "").toUpperCase();
sesionName.appendChild(appensesionName);

function logout() {
  sessionStorage.removeItem("IsThisFirstTime_Log_From_LiveServer");
  sessionStorage.removeItem("Account");
  sessionStorage.removeItem("sesion");
  location.reload();
}
