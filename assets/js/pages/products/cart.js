let allContainerCart = document.querySelector(".productos-contenido");
let containerBuyCart = document.querySelector(".card-items");
let priceTotal = document.querySelector(".price-total");
let amountProduct = document.querySelector(".count-product");
let checkOut = document.querySelector('.order-button')


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
    checkOut.style.display = 'block'
  }
}

function deleteProduct(e) {
  if (e.target.classList.contains("delete-product")) {
    const deleteId = e.target.getAttribute("data-id");
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
    countProduct <= 0 && (checkOut.style.display = 'none')
    
  }
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
    localStorage.setItem("buyThings",JSON.stringify(buyThings))
    countProduct++;
  }
  loadHtml();
}

const getProductLS = JSON.parse(localStorage.getItem("buyThings"))
console.log('getProductLS',getProductLS)
function loadHtml() {
  clearHtml();
  getProductLS.forEach((product) => {
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
            <input type="number" class="product-count-value" value="1">
           <div>
           <button type="button" class="decrement">+</button>
            <button type="button" class="increment">-</button>
           </div>
              </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

    containerBuyCart.appendChild(row);

    priceTotal.innerHTML = totalCard;

    amountProduct.innerHTML = countProduct;
  });
}
loadHtml()
function clearHtml() {
  containerBuyCart.innerHTML = "";
}
