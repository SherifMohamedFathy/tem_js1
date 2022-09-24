var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var currentUp = 0;
var searchInput = document.getElementById("searchInput");
var addCart = document.getElementById("addCart");
var inputs = document.getElementsByClassName("form-control");

var products = [];
if (JSON.parse(localStorage.getItem("productsList")) != null) {
  products = JSON.parse(localStorage.getItem("productsList"));
  display();
}

// products = JSON.parse(localStorage.getItem("productsList"));
// console.log(products);
// if (JSON.parse(localStorage.getItem("productsList")) != null) {
//   products = JSON.parse(localStorage.getItem("productsList"));
//   displayData();
// }

addCart.onclick = function () {
  if (addCart.innerHTML == "Add Product") {
    add();
  } else {
    update();
  }
  display();
  clearForm();
};
function add() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    Category: productCategoryInput.value,
    desc: productDescInput.value,
  };
  products.push(product);

  localStorage.setItem("productsList", JSON.stringify(products));

  // localStorage.setItem("productsList", JSON.stringify(products));
}

function display() {
  var carton = "";
  for (let i = 0; i < products.length; i++) {
    carton += `<tr>
    <td>${products[i].name}</td>
    <td>${products[i].price}</td>
    <td>${products[i].Category}</td>
    <td>${products[i].desc}</td>
    <td><button onclick="getProductInfo(${i})" class="btn btn-warning" >update</button></td>
    <td><button onclick="delData(${i})" class="btn btn-danger" >delete</button></td>
   
    </tr>`;
  }
  document.getElementById("body").innerHTML = carton;
}
function delData(index) {
  products.splice(index, 1);
  display();
}
// document.getElementsByClassName("form-control")=clearForm;
function clearForm() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

searchInput.onkeyup = function () {
  var carton = "";
  for (let i = 0; i < products.length; i++) {
    if (products[i].name.toUpperCase().includes(searchInput.value.toUpperCase())) {
      carton += `<tr>
      <td>${products[i].name}</td>
      <td>${products[i].price}</td>
      <td>${products[i].Category}</td>
      <td>${products[i].desc}</td>
      <td><button class="btn btn-warning" >update</button></td>
      <td><button onclick="delData(${i})" class="btn btn-danger" >delete</button></td>
     
      </tr>`;
    }
  }
  document.getElementById("body").innerHTML = carton;
};

function getProductInfo(index) {
  var current = products[index];
  currentUp = index;

  productNameInput.value = current.name;
  productPriceInput.value = current.price;
  productCategoryInput.value = current.Category;
  productDescInput.value = current.desc;

  addCart.innerHTML = "update product";
}

function update() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    Category: productCategoryInput.value,
    desc: productDescInput.value,
  };

  products[currentUp] = product;
  localStorage.setItem("productsList", JSON.stringify(products));
  addCart.innerHTML = "Add product";
}
