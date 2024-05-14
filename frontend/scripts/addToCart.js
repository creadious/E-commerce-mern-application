let quantity = 0; // Initialize quantity to 0

const productData = [
  {
    id: 1,
    imageUrl:
      "https://www.biba.in/dw/image/v2/BKQK_PRD/on/demandware.static/-/Sites-biba-product-catalog/default/dw68719691/images/ss24/ribayat2344ss24skblu_1.jpg",
    title: "Product 1",
    description: "Description of Product 1",
    productPrice: 1500,
    originalPrice: 2500,
    stockLeft: 10,
    quantity: 1, // Initial quantity for Product 1
  },
  {
    id: 2,
    imageUrl: "https://www.example.com/product2.jpg",
    title: "Product 2",
    description: "Description of Product 2",
    productPrice: 2000,
    originalPrice: 3000,
    stockLeft: 8,
    quantity: 1, // Initial quantity for Product 2
  },
  // Add more products as needed
];

// Initialize total items, original price, discount, and net amount
let totalOriginal = 0;
let totalDiscountValue = 0;
let netAmount = 0;

// Calculate initial values
productData.forEach((product) => {
  quantity += product.quantity; // Calculate total quantity
  totalOriginal += product.originalPrice * product.quantity; // Calculate total original price
  const totalProductPrice = product.productPrice * product.quantity;
  const discount = product.originalPrice * product.quantity - totalProductPrice;
  totalDiscountValue += discount; // Calculate total discount
});

// Calculate net amount
netAmount = totalOriginal - totalDiscountValue;

console.log({netAmount})

// Update DOM elements with initial values
const totalItems = document.getElementById("total-items");
totalItems.innerText = quantity;

const totalOriginalPrice = document.getElementById("total-original-price");
totalOriginalPrice.innerText = `₹${totalOriginal.toLocaleString("en-IN")}`;

const totalDiscount = document.getElementById("total-discount");
totalDiscount.innerText = `-₹${totalDiscountValue.toLocaleString("en-IN")}`;

const netAmountElement = document.getElementById("net-amount");
netAmountElement.innerText = `₹${netAmount.toLocaleString("en-IN")}`;

// Function to increase quantity for a specific product
const increaseQuantity = (index) => {
  productData[index].quantity++;
  updateQuantityAndTotalPrice(index);
};

// Function to decrease quantity for a specific product
const decreaseQuantity = (index) => {
  if (productData[index].quantity > 1) {
    productData[index].quantity--;
    updateQuantityAndTotalPrice(index);
  }
};

// Function to update quantity and total price for a specific product
const updateQuantityAndTotalPrice = (index) => {
  const quantityInput = document.getElementById(
    `quantityInput-${productData[index].id}`
  );
  const productTotalPriceElement = document.getElementById(
    `productTotalPrice-${productData[index].id}`
  );

  // Update quantity input value
  quantityInput.value = productData[index].quantity;

  // Calculate total price for the product
  const productTotalPrice =
    productData[index].productPrice * productData[index].quantity;
  const formattedPrice = productTotalPrice.toLocaleString("en-IN");
  productTotalPriceElement.textContent = `₹${formattedPrice}`;

  // Recalculate total items, original price, discount, and net amount
  quantity = 0;
  totalOriginal = 0;
  totalDiscountValue = 0;
  productData.forEach((product) => {
    quantity += product.quantity;
    totalOriginal += product.originalPrice * product.quantity;
    const totalProductPrice = product.productPrice * product.quantity;
    const discount = product.originalPrice * product.quantity - totalProductPrice;
    totalDiscountValue += discount;
  });

  // Recalculate net amount
  netAmount = totalOriginal - totalDiscountValue;

  // Update the DOM elements
  totalItems.innerText = quantity;
  totalOriginalPrice.innerText = `₹${totalOriginal.toLocaleString("en-IN")}`;
  totalDiscount.innerText = `-₹${totalDiscountValue.toLocaleString("en-IN")}`;
  netAmountElement.innerText = `₹${netAmount.toLocaleString("en-IN")}`;
};

// Cart products function
const cartProducts = () => {
  const cartItems = document.getElementById("cartItems");

  // Loop through product data and create card HTML for each product
  productData.forEach((product, index) => {
    const card = document.createElement("div");
    card.classList.add(
      "flex",
      "justify-between",
      "md:items-center",
      "items-end",
      "md:flex-row",
      "flex-col",
      "p-2",
      "bg-slate-200"
    );
    const discountPercentage = Math.round(
      (1 - product.productPrice / product.originalPrice) * 100
    );

    card.innerHTML = `
        <div class="flex gap-2">
            <img src=${
              product.imageUrl
            } alt="product image" class="h-20 w-20 object-cover object-top p-1 bg-white rounded-md">
            <div>
                <h1 class="md:text-xl font-bold">${product.title}</h1>
                <div class="flex gap-2 text-lg items-center">
                    <p class="line-through text-sm">₹${product.originalPrice.toLocaleString(
                      "en-IN"
                    )}</p>
                    <p class="font-medium">₹${product.productPrice.toLocaleString(
                      "en-IN"
                    )}</p>
                    <p id="discount" class="text-xs font-medium text-green-700">${discountPercentage}% off</p>
                </div>
                <button class="md:block hidden text-red-600 hover:scale-110 duration-150" title="delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        <div class="pe-2 flex gap-5">
            <button class="md:hidden text-red-600 hover:scale-110 duration-150" title="delete"><i class="fa-solid fa-trash"></i></button>
            <div class="flex items-center gap-2">
                <button onclick="decreaseQuantity(${index})"><i class="fa-solid fa-minus"></i></button>
                <input type="number" id="quantityInput-${
                  product.id
                }" class="w-6 text-center font-medium" minlength="1" value=${
      product.quantity
    } readonly>
                <button onclick="increaseQuantity(${index})"><i class="fa-solid fa-plus"></i></button>
            </div>
            <div class="flex items-center h-full text-xl font-medium">
                <h3 id="productTotalPrice-${
                  product.id
                }">₹${product.productPrice.toLocaleString("en-IN")}</h3>
            </div>
        </div>
        `;
    // Append the card to the productsList container
    cartItems.appendChild(card);
  });
};

cartProducts();
