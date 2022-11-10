let allContainerCart = document.querySelector(".productos-contenido");

let containerBuyCart = document.querySelector(".card-items");
let priceTotal = document.querySelector(".price-total");
let amountProduct = document.querySelector(".count-product");
let checkOut = document.querySelector(".order-button");

let buyThings = [];
let totalCard = 0;
let countProduct = 0;

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
    // countProduct--;
    // countProduct <= 0 && (checkOut.style.display = "none");
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
    countProduct++;
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
    amountProduct.innerHTML = countProduct;
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
  let price = 0;
  buyThings.forEach((value) => {
    let priceReduce =
      parseFloat(value.price.replace(/['$]+/g, "")) * parseFloat(value.amount);
    price = Number(price) + Number(priceReduce);
    // amountProduct.innerHTML = value.amount;
  });
  amountProduct.innerHTML = buyThings.length;
  priceTotal.innerHTML = price.toFixed(2);
};
loadHtml();
