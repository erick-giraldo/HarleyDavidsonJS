// ***********Registro********************* //
class Usuario {
  constructor(userName, userPass) {
    this._userName = function () {
      return userName;
    };
    this._userPass = function () {
      return userPass;
    };
  }

  getUserName() {
    return this._userName();
  }
  setUserName(new_userName) {
    this._userName = function () {
      return new_userName;
    };
  }
  getUserPass() {
    return this._userPass();
  }
  setUserPass(new_userPass) {
    this._userPass = function () {
      return new_userPass;
    };
  }
}

class ListaUsuarios {
  constructor(listaUsuarios) {
    this.listaUsuarios = listaUsuarios || [];
  }
  getListaUsuarios() {
    return this.listaUsuarios;
  }

  setListaUsuarios(listaUsuarios) {
    this.listaUsuarios = function () {
      return listaUsuarios;
    };
  }

  addUsuario(usuario) {
    this.listaUsuarios.push(usuario);
  }

  getLista() {
    this.listaUsuarios.forEach(function (elemento, index) {
      console.log("-------------------------");
      console.log("salida getlista-usuario ::::>>", elemento.getUserName());
      console.log("salida getlista-pass :::>>", elemento.getUserPass());
    });
  }

//   buscarUsuario(nombre) {
//     let usuario = this.listaUsuarios.find(
//       (item) => item.getUserName() == nombre
//     );
//     if (usuario == undefined) {
//       alert("El usuario no pudo ser encontrado");
//       return buscarOtroUsuario();
//     } else {
//       console.log("-------------------------------");
//       console.log("Salida de buscarUsuario - usuario", usuario.getUserName());
//       console.log("Salida de buscarUsuario - password", usuario.getUserPass());
//     }
//   }

  login() {
    let ingresar = false;
    let intentos = false;
    do {
      let usuarioN = prompt("Ingresá tu usuario:");
      let usuario = this.listaUsuarios.find(
        (item) => item.getUserName() == usuarioN
      );
      if (usuario == undefined) {
        alert("El usuario no existe.");
        ingresar = false;
      } else {
        for (let i = 2; i >= 0; i--) {
          let passwordN = prompt("Ingresá tu contraseña.");
          if (passwordN == usuario.getUserPass()) {
            // alert("¡Bienvenido/a!:" + " " + `${usuario.getUserName()}`);
            let h2 = root.innerHTML = `<h3>¡Bienvenido/a!: ${usuario.getUserName()}</h3>`
            ingresar = true;
            break;
          } else {
            alert("Contraseña incorrecta. Tenés " + i + " intentos más.");
          }
          if (i == 0) {
            intentos = true;
          }
        }
      }
    } while (ingresar != true && intentos != true);
    return ingresar;
  }
}

// function buscarOtroUsuario() {
//   let segundoUsuario = prompt("Desea ingresar otra busqueda?");
//   if (segundoUsuario == "") {
//     alert("Debes ingresar una respuesta");
//     return buscarOtroUsuario();
//   } else if (segundoUsuario.toLowerCase() == "si") {
//     return buscarUsuario();
//   } else {
//     alert("debes empezar un nuevo registro");
//     contador = 0;
//     numeroUsuarios = Number(prompt("Cuentos usuarios deseas agregar?"));
//     return validarNumeroUsuarios();
//   }
// }

let numeroUsuarios = Number(prompt("Cuentos usuarios deseas agregar?"));
let nombreRegistro;
let passRegistro;
let contador = 0;
let nuevaListaUsuarios = new ListaUsuarios([]);

function validarNumeroUsuarios() {
  if (isNaN(numeroUsuarios) || numeroUsuarios == "") {
    alert("No es un número valido");
    numeroUsuarios = Number(prompt("Cuentos usuarios deseas agregar?"));
    return validarNumeroUsuarios();
  } else {
    while (contador < numeroUsuarios) {
      nombreRegistro = prompt(
        "Ingrese el nombre de usuario para registrarse: "
      );
      validarRegistro(nombreRegistro);
      contador++;
    }
  }
}
validarNumeroUsuarios();

function validarRegistro(name) {
  if (name == "") {
    alert("Debe ingresar un nombre valido");
    nombreRegistro = prompt("Ingrese el nombre de usuario para registrarse");
    return validarRegistro(nombreRegistro);
  } else {
    passRegistro = prompt("Ingrese contraseña: ");
    while (passRegistro == "") {
      alert("Debe ingresar una contraseña valida");
      passRegistro = prompt("Ingrese contraseña de usuario para registrarse: ");
    }
    alert("Registro Exitoso");
    let newUser = new Usuario(nombreRegistro, passRegistro);
    nuevaListaUsuarios.addUsuario(newUser);
  }
}

nuevaListaUsuarios.getLista();
//***********Buscar Usuario********************* //
// function buscarUsuario() {
//   let buscarusuarioRegistro = prompt("Ingresa el usuario que deseas buscar");
//   nuevaListaUsuarios.buscarUsuario(buscarusuarioRegistro);
// }
// buscarUsuario();

//***********Login********************* //
// Función para iniciar sesión:
alert("Por favor loguearse para acceder a los productos");

//validar intentos de sesion
let ingreso = nuevaListaUsuarios.login();
while (!ingreso) {
  alert(
    "Alcanzaste el maximo de intentos, ingrese su nombre de usuario nuevamente"
  );
  ingreso = nuevaListaUsuarios.login();
}
