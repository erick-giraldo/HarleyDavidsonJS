let allContainerCart = document.querySelector(".productos-contenido");
let containerBuyCart = document.querySelector(".card-items");
let priceTotal = document.querySelector(".price-total");
let amountProduct = document.querySelector(".count-product");
let checkOut = document.querySelector(".order-button");
let emptyCarClass = document.querySelector(".empty-button");
let yape = document.querySelector(".yape");
let plin = document.querySelector(".plin");
let form = document.querySelector(".paying-card");
let selectPayment = document.querySelector(".form-select");
let btnPayment = document.querySelector(".btn-pay-checkout");
let infoPayment = document.querySelector(".info-payment");
let btnPayTxt = document.querySelector(".btn-pay-txt");
let modalBackdrop = document.querySelector(".modal-backdrop");
console.log("🚀 ~ file: cart.js ~ line 16 ~ modalBackdrop", modalBackdrop)
let buyThings = [];
let totalCard = 0;

selectPayment.addEventListener("change", function(){
  const selectValue = selectPayment.value;
  btnPayment.style.display = 'flex'
  infoPayment.style.display = 'block'
  switch (selectValue) {
  case "Plin":
    yape.style.display = 'none'
    form.style.display = 'none'
    plin.style.display = 'block'
    
    break;
  case "Yape":
    plin.style.display = 'none'
    form.style.display = 'none'
    yape.style.display = 'block'
    break
  case "Tarjeta":
    plin.style.display = 'none'
    yape.style.display = 'none'
    infoPayment.style.display = 'none'
    form.style.display = 'block'
    break
  default:
    break;
}

});
function closeBtn() {
  document.getElementById("products-id").style.right = "-500px";
}

btnPayment.addEventListener("click", function(){
  setTimeout(function () {
    Swal.fire({
      icon: "success",
      title: "Bien Hecho!!",
      text: "El pago fue validado correctamente",
    });
    closeBtn();
    emptyCar();
    btnPayment.modal('hide')
    modalBackdrop.addEventListener("change", function(){
      // modalBackdrop.style.focus = 0; pendiente
    })
  }, 2000);
});

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

//functions

const addProduct = (e) => {
  e.preventDefault();
  if (e.target.classList.contains("btn-outline-dark")) {
    const selectProduct = e.target.parentElement.parentElement;
    readTheContent(selectProduct);
    checkOut.style.display = "block";
  }
};

const deleteProduct = (e) => {
  if (e.target.classList.contains("delete-product") || "") {
    const deleteId = e.target.getAttribute("data-id");
    buyThings = buyThings.filter((product) => product.id !== deleteId);
    localStorage.setItem("buyThings", JSON.stringify(buyThings));
    loadHtml();
  }
  if (buyThings.length === 0) {
    priceTotal.innerHTML = 0;
    amountProduct.innerHTML = 0;
  }
};

const loadEventListenrs = () => {
  allContainerCart.addEventListener("click", addProduct);
  containerBuyCart.addEventListener("click", deleteProduct);
};
loadEventListenrs();

const readTheContent = (product) => {
  const infoProduct = {
    image: product.querySelector("button img").src,
    title: product.querySelector(".card-name ").textContent,
    price: product.querySelector(".card-price").textContent,
    id: product.querySelector(".card-body button").getAttribute("data-id"),
    amount: 1,
  };
  totalCard =
    parseFloat(totalCard) + parseFloat(infoProduct.price.replace(/['$]+/g, ""));
  totalCard = totalCard.toFixed(2);
  const exist = buyThings.some((product) => product.id === infoProduct.id);
  if (exist) {
    Toast.fire({
      icon: "info",
      html: `Item ya existe en el carrito`,
    });
  } else {
    buyThings = [...buyThings, infoProduct];
    localStorage.setItem("buyThings", JSON.stringify(buyThings));
    loadHtml();
  }
};

const addAmountitems = (id, type) => {
  buyThings = JSON.parse(localStorage.getItem("buyThings") || []);
  buyThings = buyThings.map((product) => {
    if (product.id !== id) return product;
    return {
      ...product,
      amount:
        type === "increment"
          ? product.amount + 1
          : product.amount > 1
          ? product.amount - 1
          : 1,
    };
  });
  localStorage.setItem("buyThings", JSON.stringify(buyThings));
  loadHtml();
};

const clearHtml = () => {
  containerBuyCart.innerHTML = "";
};

const emptyCar = () => {
  localStorage.removeItem("buyThings");
  localStorage.setItem("buyThings", JSON.stringify([]));
  loadHtml();
  if (buyThings.length === 0) {
    priceTotal.innerHTML = 0;
    amountProduct.innerHTML = 0;
  }
};
const isEmty = emptyCarClass.addEventListener("click", emptyCar);

const loadHtml = () => {
  clearHtml();
  const shortItmsCard = localStorage.getItem("buyThings") || [];
  buyThings = JSON.parse(shortItmsCard);
  buyThings.forEach((product) => {
    const { image, title, price, amount, id } = product;
    let row = document.createElement("div");
    row.classList.add("item");
    row.setAttribute("id", `${id}`);
    row.innerHTML = `
            <img src="${image}" alt="" width="150px">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <div class="product-count">
            <input type="number" class="product-count-value" value=${amount}>
           <div>
           <button type="button" class="increment">+</button>
            <button type="button" class="decrement">-</button>
           </div>
              </div>
            <span class="delete-product" data-id="${id}">X</span>
            
        `;
    containerBuyCart.appendChild(row);
    priceTotal.innerHTML = totalCard;
  });

  const getItemsCard = document.querySelectorAll(".item");

  getItemsCard.forEach((element) => {
    let incrementAmount = element.querySelector(".increment");
    incrementAmount.addEventListener("click", () => {
      addAmountitems(element.id, "increment");
    });
    let decrementAmount = element.querySelector(".decrement");
    decrementAmount.addEventListener("click", () => {
      addAmountitems(element.id, "decrement");
    });
  });

  buyThings.length === 0
    ? (checkOut.style.display = "none")
    : (checkOut.style.display = "block");
  buyThings.length === 0
    ? (emptyCarClass.style.display = "none")
    : (emptyCarClass.style.display = "block");
  let price = 0;
  buyThings.forEach((value) => {
    let priceReduce =
      parseFloat(value.price.replace(/['$]+/g, "")) * parseFloat(value.amount);
    price = Number(price) + Number(priceReduce);
  });
  amountProduct.innerHTML = buyThings.length;
  priceTotal.innerHTML = price.toFixed(2);
};
loadHtml();
