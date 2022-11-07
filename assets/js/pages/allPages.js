let sesion;
function validSesion() {
  sesion = sessionStorage.getItem("sesion");
  return sesion;
}
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

validSesion();
if (sesion !== "" && sesion !== "true") {
  Toast.fire({
    icon: 'info',
    html:
    `No tiene permisos para visualizar esta página, debes iniciar sesión.`
  })
  setTimeout(function () {
    window.location.href = "../index.html";
  }, 500);
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
  Toast.fire({
    icon: 'success',
    html:
    `Sesión cerrada correctamente.`
  })
  setTimeout(function () {
    window.location.href = "../index.html";
  }, 2000);
}
