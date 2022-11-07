//import { Grand, Cruiser, Sport } from "./recursos/modelos.js";
document.addEventListener("DOMContentLoaded", function () {
  const root = document.querySelector(".productos-contenido");
  let dataProd = {};

  let arrayCheckbox = [Grand, Cruiser, Sport];
  //let arrayCheckbox = [];

  let checkCruiser = document.getElementById("Cruiser");
  let checkGrand = document.getElementById("Grand");
  let checkSport = document.getElementById("Sport");

  const getProducts = async () => {
    try {
      const response = await fetch(
        `https://api-harley-davidson.herokuapp.com/modelos`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      test(result);
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
  getProducts();

  checkCruiser.addEventListener("click", function () {
    const dato = Cruiser;
    const indice = arrayCheckbox.indexOf(dato);
    if (checkCruiser.checked) {
      !arrayCheckbox.includes(Grand) && arrayCheckbox.push(Grand);
      test(arrayCheckbox);
    } else {
      if (indice >= 0) {
        arrayCheckbox.splice(indice, 1);
        test(arrayCheckbox);
      }
    }
  });

  checkGrand.addEventListener("click", function () {
    const dato = Grand;
    const indice = arrayCheckbox.indexOf(dato);
    if (checkGrand.checked) {
      !arrayCheckbox.includes(Cruiser) && arrayCheckbox.push(Cruiser);
      test(arrayCheckbox);
    } else {
      if (indice >= 0) {
        arrayCheckbox.splice(indice, 1);
        test(arrayCheckbox);
      }
    }
  });

  checkSport.addEventListener("click", function () {
    const dato = Sport;
    const indice = arrayCheckbox.indexOf(dato);
    if (checkSport.checked) {
      !arrayCheckbox.includes(Sport) && arrayCheckbox.push(Sport);
      test(arrayCheckbox);
    } else {
      if (indice >= 0) {
        arrayCheckbox.splice(indice, 1);
        test(arrayCheckbox);
      }
    }
  });

  const listItem = (array) => {
    let textHtml = "";
    for (let i = 0; i < array.data.length; i++) {
      let child = `<div
        class="card col-lg-2 col-md-6 col-sm-12"
        style="width: 20rem" 
        >
        <button
        type="button"
        class="btn-none"
        data-bs-toggle="modal"
        data-bs-target="#sportster"
      >        <img
        src="./../assets/images/modelos/${array.data[i].image}"
          class="d-block w-100"
          alt="${array.data[i].name}"
        /> 
        </button>
        <div class="card-body">
          <h5 class="card-title card-name">${array.data[i].name}</h5>
          <p class="card-text">${array.data[i].description}
          </p>
          <div class="card-inv" >
          <p class="card-title card-price">$ ${array.data[i].price}</p>
          <p class="card-title card-stock">Stock: ${array.data[i].stock}</p>
          </div>
          <button
            type="button"
            class="btn btn-outline-dark"
            data-bs-target="#sportster"
            data-id="${array.data[i].id}"
          >
            ADD TO CARD
          </button>
        </div>
        </div>
        <!-- Modal -->
        <div
        class="modal fade"
        id="sportster"
        tabindex="-1"
        aria-labelledby="exampleModalLabelSportster"
        aria-hidden="true"
        >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabelSportster">
              ${array.data[i].name}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- Carousel -->
              <div
                id="sportsterDark"
                class="carousel carousel-dark slide"
                data-bs-ride="carousel"
              >
                <div class="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#sportsterDark"
                    data-bs-slide-to="0"
                    class="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#sportsterDark"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#sportsterDark"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div class="carousel-inner">
                  <div
                    class="carousel-item active"
                    data-bs-interval="10000"
                  >
                    <img
                      src="./../assets/images/modelos/${array.data[1].image}" 
                      class="d-block w-100"
                      alt="${array.data[1].name}"
                    />
                  </div>
                  <div class="carousel-item" data-bs-interval="2000">
                    <img
                    src="./../assets/images/modelos/${array.data[2].image}" 
                      class="d-block w-100"
                      alt="${array.data[2].name}"
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                    src="./../assets/images/modelos/${array.data[0].image}"
                      class="d-block w-100"
                      alt="${array.data[0].name}"
                    />
                  </div>
                </div>
                <div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#sportsterDark"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#sportsterDark"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="modal-footer"></div>
          </div>
        </div>
        </div>`;
      textHtml = textHtml + child;
    }
    return textHtml;
  };

  const test = (items) => {
    return (root.innerHTML = `<div>
      <h1>Modelos</h1>
      <div class="productos-container">
        ${items.map(
          (products) =>
            `<div>
            <p class="p-titulo">${products.title}</p>
            <p>Descubre algunos de los modelos más recientes.</p>
           <div class="row productos-section">${listItem(products)}</div>
          </div>`
        )}
      </div>`);
  };

  arrayCheckbox == [] ? test(listProducts) : test(arrayCheckbox);
});
