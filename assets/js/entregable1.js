import { Grand, Cruiser, Sport } from "./recursos/modelos.js";
document.addEventListener("DOMContentLoaded", function () {
  const root = document.querySelector(".productos-contenido");

  let selectedProduct = {};

  function alertPrompt() {
    let getModel = prompt(
      "Ingrese un modelo : (Sport - Cruiser - Grand American Touring)",
      "Grand American Touring"
    );

    const allProduct = {
      "Grand American Touring": Grand,
      "Cruiser": Cruiser,
      "Sport": Sport,
    };

    return allProduct[getModel];
  }

  function start() {
    const products = alertPrompt();
    if (!products) {
      alert(
        `Debes ingresar un producto válido (Sport - Cruiser - Grand American Touring)`
      );
      start();
    } else {
      selectedProduct = products;
    console.log("🚀 ~ file: entregable1.js ~ line 20 ~ start ~ selectedProduct", selectedProduct)

    }
  }
  start();
 
  console.log("🚀 ~ file: entregable1.js ~ line 31 ~ start ~ selectedProduct", selectedProduct)

  root.innerHTML = '<h1 class="title">Lista de Artículos</h1>';

  let textHtml = "";
  if (selectedProduct) {
    for (let i = 0; i < selectedProduct.data.length; i++) {
      let child = `<div class="card" style="width: 18rem;">
  <img src="./assets/img/modelos/${selectedProduct.data[i].image}" alt="${selectedProduct.data[i].name}" >
  <div class="card-body">
    <h5 class="card-title">${selectedProduct.data[i].name}</h5>
    <p class="card-text">${selectedProduct.data[i].description}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`;
      textHtml = textHtml + child;
    }

    root.innerHTML = `<div class="productos-contenido">
  <h1>Modelos</h1>
  <div class="productos-containerA">
    <p class="p-titulo">${selectedProduct.title}</p>
    <p>Descubre algunos de los modelos más recientes.</p>
    <div class="row productos-section">
      ${textHtml}
    </div>
  </div>
</div>`;
  }
});
