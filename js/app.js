const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h4>${product.title}</h4>
      <p>Category: ${product.category}</p>
      <p>Rating: ${product.rating.rate} (${product.rating.count})</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success"><i class="fa fa-shopping-cart"> </i>  Add to cart</button>
      <button onClick="randerSingleProduct(${product.id})" id="details-btn" class="btn btn-danger"><i class="fa fa-info-circle"> </i> Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

//rander single product
const randerSingleProduct = (id) =>{
    const url = `https://fakestoreapi.com/products/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showDetails(data));
    // console.log(id);
};

const showDetails = (data) =>{
  // console.log(data);
    document.getElementById('show-details-card').innerHTML = '';
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="details-card">
      <div>
        <img class="product-image" src=${data.image}></img>
      </div>
      <h3>${data.title}</h3>
      <h6>Price: ${data.price}</h6>
      <p>Rating: ${data.rating.rate} (${data.rating.count})</p>
      <p><small>${data.description}</small></p>

      
      `;
    document.getElementById("show-details-card").appendChild(div);
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTotal();
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// buy now button click (order confirmation)
const placeOrder = () =>{
  alert("Your order placed. Thank you.")
}