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
    div.innerHTML = `<div class="single-product mt-5 mx-4 box-shadow" >
      <div>
    <img class="product-image" src=${image} class="rounded" alt="" width="160px">
      </div class="product-1 align-items-center p-2 text-center">
      <div class="mt-3 info">
      <h4>${product.title}</h4>
      <p class='text1'>Category: ${product.category}</p>
      </div>
    
      <div class="cost mt-3 text-dark">
      <span>${product.price}$</span>
 
      <div class="star mt-3 align-items-center">
      
      <span > ${product.rating.rate} </span>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <span class="mx-4"> ${product.rating.count} ratings</span>
         
      </div>
  </div>

      
      <div onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="add p-3 text-center text-white mt-3 text-white pointer buy-now text-uppercase">
      <span class="text-uppercase p-3 " >    Add to cart</span>
  </div>
      
  <div id="details-btn" type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal" class="details p-3 text-center mt-3  text-white pointer">
  <span class="text-uppercase ">
    Details
  </span>
</div>
     
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTotal();

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
  document.getElementById(id).innerText =(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
   document.getElementById(id).innerText =(value).toFixed(2);
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
  updateTaxAndCharge();
  console.log( getInputValue("price"), getInputValue("delivery-charge"),getInputValue("total-tax"));
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax") ;
    console.log();
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};


