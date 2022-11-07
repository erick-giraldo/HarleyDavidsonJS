let allContainerCart = document.querySelector(".productos-contenido");
console.log("🚀 ~ file: cart.js ~ line 2 ~ allContainerCart", allContainerCart);
let containerBuyCart = document.querySelector(".card-items");
let priceTotal = document.querySelector(".price-total");
let amountProduct = document.querySelector(".count-product");

let buyThings = [];
let totalCard = 0;
let countProduct = 0;

//functions
loadEventListenrs();
function loadEventListenrs() {
  allContainerCart.addEventListener("click", addProduct);
  containerBuyCart.addEventListener("click", deleteProduct);
}

function addProduct(e) {
  e.preventDefault();
  if (e.target.classList.contains("btn-outline-dark")) {
    const selectProduct = e.target.parentElement.parentElement;
    readTheContent(selectProduct);
  }
}

function deleteProduct(e) {
  if (e.target.classList.contains("delete-product")) {
    const deleteId = e.target.getAttribute("data-id");
    console.log(
      "🚀 ~ file: cart.js ~ line 30 ~ deleteProduct ~ buyThings",
      buyThings
    );

    buyThings.forEach((value) => {
      if (value.id == deleteId) {
        let priceReduce =
          parseFloat(value.price.replace(/['$]+/g, "")) *
          parseFloat(value.amount);
        totalCard = totalCard - priceReduce;
        totalCard = totalCard.toFixed(2);
      }
    });
    buyThings = buyThings.filter((product) => product.id !== deleteId);

    countProduct--;
  }
  //FIX: El contador se quedaba con "1" aunque ubiera 0 productos
  if (buyThings.length === 0) {
    priceTotal.innerHTML = 0;
    amountProduct.innerHTML = 0;
  }
  loadHtml();
}

function readTheContent(product) {
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
    const pro = buyThings.map((product) => {
      if (product.id === infoProduct.id) {
        product.amount++;
        return product;
      } else {
        return product;
      }
    });
    buyThings = [...pro];
  } else {
    buyThings = [...buyThings, infoProduct];
    countProduct++;
  }
  loadHtml();
}

function loadHtml() {
  clearHtml();
  buyThings.forEach((product) => {
    const { image, title, price, amount, id } = product;
    const row = document.createElement("div");
    row.classList.add("item");
    row.innerHTML = `
            <img src="${image}" alt="" width="150px">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <div class="product-count">
            <button type="button" class="decrement">-</button>
            <input type="number" class="product-count-value" value="1">
            <button type="button" class="increment">+</button>
        </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

    containerBuyCart.appendChild(row);

    priceTotal.innerHTML = totalCard;

    amountProduct.innerHTML = countProduct;
  });
}
function clearHtml() {
  containerBuyCart.innerHTML = "";
}
