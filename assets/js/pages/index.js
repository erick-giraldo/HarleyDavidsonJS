let sesion;

const loginPage = document.querySelector("#login-sesion");

function validSesion() {
  sesion = sessionStorage.getItem("sesion");
  return sesion;
}
validSesion();
if (sesion !== "" && sesion === "true") {
  loginPage.style.display = "none";
  toastEvent("warning", "Sesión ya iniciada", 1000,"fas fa-info-circle");
  setTimeout(function () {
    window.location.href = "./start.html";
  }, 1000);
}

function toastEvent(eventType, textEvent, time, icon) {  
  let x = document.getElementById("snackbar");
  x.className = eventType;
  x.innerHTML = `<i class="${icon}"></i> ${textEvent}`;
  setTimeout(function () {
    x.className = x.className.replace(eventType, "");
  }, time);
}
