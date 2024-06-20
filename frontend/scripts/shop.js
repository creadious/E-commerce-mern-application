const productsList = document.getElementById("productsList");

const showProductList = () => {
  const productData = [
    {
      imageUrl:
        "https://www.biba.in/dw/image/v2/BKQK_PRD/on/demandware.static/-/Sites-biba-product-catalog/default/dw68719691/images/ss24/ribayat2344ss24skblu_1.jpg",
      title: "SKY BLUE VISCOSE TIERED DRESS",
      description:
        "Flowy Sky Blue Tiered Dress With A Multicolor Floral Print, Perfect For A Breezy, Stylish Day.",
      price: 1500,
      originalPrice: 2500,
      stockLeft: 10,
    },
    {
      imageUrl:
        "https://www.biba.in/dw/image/v2/BKQK_PRD/on/demandware.static/-/Sites-biba-product-catalog/default/dw68719691/images/ss24/ribayat2344ss24skblu_1.jpg",
      title: "SKY BLUE VISCOSE TIERED DRESS",
      description:
        "Flowy Sky Blue Tiered Dress With A Multicolor Floral Print, Perfect For A Breezy, Stylish Day.",
      price: 1500,
      originalPrice: 2500,
      stockLeft: 10,
    },
    {
      imageUrl:
        "https://www.biba.in/dw/image/v2/BKQK_PRD/on/demandware.static/-/Sites-biba-product-catalog/default/dw68719691/images/ss24/ribayat2344ss24skblu_1.jpg",
      title: "SKY BLUE VISCOSE TIERED DRESS",
      description:
        "Flowy Sky Blue Tiered Dress With A Multicolor Floral Print, Perfect For A Breezy, Stylish Day.",
      price: 1500,
      originalPrice: 2500,
      stockLeft: 10,
    },
    {
      imageUrl:
        "https://www.biba.in/dw/image/v2/BKQK_PRD/on/demandware.static/-/Sites-biba-product-catalog/default/dw68719691/images/ss24/ribayat2344ss24skblu_1.jpg",
      title: "SKY BLUE VISCOSE TIERED DRESS",
      description:
        "Flowy Sky Blue Tiered Dress With A Multicolor Floral Print, Perfect For A Breezy, Stylish Day.",
      price: 1500,
      originalPrice: 2500,
      stockLeft: 10,
    },
    {
      imageUrl:
        "https://www.biba.in/dw/image/v2/BKQK_PRD/on/demandware.static/-/Sites-biba-product-catalog/default/dw68719691/images/ss24/ribayat2344ss24skblu_1.jpg",
      title: "SKY BLUE VISCOSE TIERED DRESS",
      description:
        "Flowy Sky Blue Tiered Dress With A Multicolor Floral Print, Perfect For A Breezy, Stylish Day.",
      price: 1500,
      originalPrice: 2500,
      stockLeft: 10,
    },
    {
      imageUrl:
        "https://www.biba.in/dw/image/v2/BKQK_PRD/on/demandware.static/-/Sites-biba-product-catalog/default/dw68719691/images/ss24/ribayat2344ss24skblu_1.jpg",
      title: "SKY BLUE VISCOSE TIERED DRESS",
      description:
        "Flowy Sky Blue Tiered Dress With A Multicolor Floral Print, Perfect For A Breezy, Stylish Day.",
      price: 1500,
      originalPrice: 2500,
      stockLeft: 10,
    },
    // Add more product data objects here as needed
  ];

  // Loop through product data and create card HTML for each product
  productData.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("p-4", "bg-slate-100", "rounded-md", "shadow-md");
    card.innerHTML = `
            <span class="bg-red-400 text-white px-2 py-1 text-xs rounded-full">New Arrival</span>
            <img src="${product.imageUrl}" alt="product image" class="h-60 w-full mt-4 rounded-md object-cover object-top">
            <div class="mt-2">
                <h2 class="text-lg font-medium">${product.title}</h2>
                <p class="text-sm mt-1 text-slate-600">${product.description}</p>
                <div class="py-2 flex gap-2 items-center">
                    <p class="text-lg"><span class="font-bold">₹</span>${product.price}</p>
                    <p class=" line-through font-thin"><span class="font-bold">₹</span>${product.originalPrice}</p>
                </div>
                <p class="mb-2 text-sm font-medium text-red-600">Stock left : ${product.stockLeft}</p>
                <div class="flex flex-col xl:flex-row justify-center gap-2">
                    <a href="#" class="border border-black px-2 py-1 rounded-md hover:bg-black text-center hover:text-white w-full">
                        View Details
                    </a>
                    <a href="#" class="border border-black bg-black text-white px-2 py-1 rounded-md hover:bg-slate-600 w-full flex justify-center items-center gap-2">
                        Add Cart <i class="fa-solid fa-cart-shopping text-xs -mb-1"></i>
                    </a>
                </div>
            </div>
        `;
    // Append the card to the productsList container
    productsList.appendChild(card);
  });
};

// Call the function to populate the products list
showProductList();