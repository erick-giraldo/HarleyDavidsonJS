import { Grand, Cruiser, Sport } from "./recursos/modelos.js";
document.addEventListener("DOMContentLoaded", function () {
  const root = document.querySelector(".productos-contenido");
  let arrayCheckbox
  const isCheckedProduct = () =>{
    if(checkGrand === true || checkCruiser === true || checkSport === true){
      const checkCruiser = document.querySelector("#Cruiser").value;
     const checkSport = document.querySelector("#Sport").value;
     const checkGrand = document.querySelector("#Grand").value;
   
      arrayCheckbox = [checkGrand, checkCruiser, checkSport]
   }
  }
  let checkCruiser = document.querySelector("#Grand").checked;
  let checkGrand = document.querySelector("#Cruiser").checked;
  let checkSport = document.querySelector("#Sport").checked;
  console.log("🚀 ~ file: products.js ~ line 17 ~ checkSport", checkSport)
  
  // checkCruiser.addEventListener("click", isCheckedProduct);
  // checkGrand.addEventListener("click", isCheckedProduct);
  // checkSport.addEventListener("click", isCheckedProduct);
  const listItem = (array) => {
    let textHtml = "";
    for (let i = 0; i < array.data.length; i++) {
      let child = `<div
        class="card col-lg-2 col-md-6 col-sm-12"
        style="width: 20rem"
        >
        <img
        src="./../assets/images/modelos/${array.data[i].image}"
          class="d-block w-100"
          alt="${array.data[i].name}"
        />
        <div class="card-body">
          <h5 class="card-title">${array.data[i].name}</h5>
          <p class="card-text">${array.data[i].description}
          </p>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#sportster"
          >
            Ver más...
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
// ---------------



console.log("🚀 ~ file: products.js ~ line 148 ~ arrayCheckbox", arrayCheckbox)

  const filterProducts = [Grand, Cruiser, Sport];

  const validFilter = filterProducts[arrayCheckbox];
  console.log("🚀 ~ file: products.js ~ line 148 ~ validFilter", validFilter)

  const dataGrand = `<p class="p-titulo">${Grand.title}</p>
<p>Descubre algunos de los modelos más recientes.</p>
<div class="row productos-section">
   ${listItem(Grand)}
</div>`;

  const validatedataGrand = validFilter ? dataGrand : "";

  const dataCruiser = `<p class="p-titulo">${Cruiser.title}</p>
 <p>Descubre algunos de los modelos más recientes.</p>
 <div class="row productos-section">
   ${listItem(Cruiser)}
 </div>`;
  const validatedataCruiser = validFilter ? dataCruiser : "";
// ---------------
  root.innerHTML = `<div>
  <h1>Modelos</h1>
  <div class="productos-containerA">
      ${dataGrand}
    <br>
    <p class="p-titulo">${Cruiser.title}</p>
    <p>Descubre algunos de los modelos más recientes.</p>
    <div class="row productos-section">
      ${listItem(Cruiser)}
    </div>
    <br>
    <p class="p-titulo">${Sport.title}</p>
    <p>Descubre algunos de los modelos más recientes.</p>
    <div class="row productos-section">
      ${listItem(Sport)}
    </div>
</div>`;
});
