// Fetching API from fakeStore
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
    //Rating are being shown here by using condition
    let star;
    if((`${product.rating.rate}`)> 1.5 && (`${product.rating.rate}`)<=2.5 ){
      star = `<i class="fa fa-star st-color"></i> <i class="fa fa-star st-color"></i>  <i class="far fa-star"></i> <i class="far fa-star"></i> <i class="far fa-star"></i>`
      }
  else if((`${product.rating.rate}`)> 2.5 && (`${product.rating.rate}`)< 3.5 ){
    star = `<i class="fa fa-star st-color"></i> <i class="fa fa-star st-color"></i> <i class="fa fa-star st-color"></i> <i class="far fa-star"></i> <i class="far fa-star"></i>`
    }
    else if(`${product.rating.rate}` >=3.5 && (`${product.rating.rate}`)< 4.5){
      star = `<i class="fa fa-star st-color"></i> <i class="fa fa-star st-color"></i> <i class="fa fa-star st-color"></i> <i class="fas fa-star-half-alt st-color "></i> <i class="far fa-star"></i> `
    }
    else if  ((`${product.rating.rate}`)>= 4.5){
      star= ` <i class="fa fa-star st-color"></i> <i class="fa fa-star st-color"></i> <i class="fa fa-star st-color"></i> <i class="fas fa-star-half-alt st-color "></i> <i class="far fa-star"></i>`;
    }
    else{
      star = `<i class="fa fa-star"></i> `
    }
    //Dynamically showing all the  fetching data
    div.innerHTML = `
     <div class="single-product mt-5 mx-4 box-shadow" >
          <div>
             <img class="product-image" src=${image} class="rounded" alt="" width="160px">
             <div>
          <div class="mt-3 info">
            <h4>${product.title}</h4>
            <p class='text1'>Category: ${product.category}</p>
          </div>
          <div class="cost mt-3 text-dark">
           <span>$${product.price}</span>
           </div>
          <div class="star mt-3 align-items-center">
            <span> ${star} </span>
            <span > ${product.rating.rate} </span>
            <span class="mx-4"> ${product.rating.count} Reviews</span>         
          </div>
           <div onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="add p-3 text-center text-white mt-3 text-white pointer buy-now text-uppercase">
            <span class="text-uppercase p-3 " >Add to cart</span>
         </div>  
        <div onclick="singleProduct(${product.id})" data-bs-toggle="modal"data-bs-target="#exampleModal"class="details p-3 text-center mt-3     text-white pointer">
          <span class="text-uppercase ">
          Details
          </span>
       </div>
     </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
//thins function use to add product in the cart
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTotal();

  document.getElementById("total-Products").innerText = count;
};

// getInputValue use as selector which come handy to call an id and then conveted with float number
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
const setInnerTax = (id, value) => {
   document.getElementById(id).innerText =(value).toFixed(2);
};
const setInnerDelivery = (id, value) => {
  document.getElementById(id).innerText =(value);
}
// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerDelivery("delivery-charge", 30);
   
    setInnerTax("total-tax", priceConverted * 0.2);

  
  }
  if (priceConverted > 400) {
    setInnerDelivery("delivery-charge", 50);
    setInnerTax("total-tax", priceConverted * 0.3);

  }
  if (priceConverted > 500) {
    setInnerDelivery("delivery-charge", 60);
    setInnerTax("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  updateTaxAndCharge();
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax") ;
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// fetching single product from id
const singleProduct=(id) =>{
  fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(data=> {
              showSingleProduct(data)
            } )

}
//showing the single product with help of  modal 
const showSingleProduct = (data)=>{
  console.log(data);
  const details = document.getElementById('content');
  details.innerHTML =`
  <div class="modal-header">
  <h5 class="modal-title" id="exampleModalLabel">Details</h5>
  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
<div class="card" style="width: 28rem; ">
  <img src="${data.image}" class="card-img-top"  alt="images">
  <div class="card-body">
    <h5 class="card-title">${data.title}</h5>
    <h4>$ ${data.price} </h4>
    <p class="card-text">${data.description}</p>
  </div>
  <div class="card-body">
  </div>
</div>
  </div>
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  <button type="button" class="btn btn-primary">Order Now</button>
</div>
  
   `
  
  
}


