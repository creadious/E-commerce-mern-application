import Swal from "sweetalert2";

export const getOrderDetails = () => {
  return JSON.parse(localStorage.getItem("orderDetails")) || [];
};

export const saveOrderDetails = (orderDetails) => {
  localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
};

export const addToCart = (productId, quantity, size) => {
  const existingOrders = getOrderDetails();

  // Check if the product with the selected size is already in the localStorage
  const isAlreadyAdded = existingOrders.some(
    (order) => order.productId === productId && order.size === size
  );

  if (isAlreadyAdded) {
    Swal.fire({
      title: "Item already added!",
      text: "This product with the selected size is already added to the cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "View Cart",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/cart"; // Navigate to cart
      }
    });

    return false;
  }

  const newOrder = {
    productId,
    quantity,
    size,
  };

  // Add the new order to the array
  existingOrders.push(newOrder);

  // Save the updated orders array to localStorage
  saveOrderDetails(existingOrders);

  Swal.fire({
    title: "Item added!",
    text: "Product added to the cart successfully.",
    icon: "success",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "View Cart",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/cart"; // Navigate to cart
    }
  });

  return true;
};

export const removeFromCart = (productId, size) => {
  let existingOrders = getOrderDetails();

  // Remove the product with the specified size from the localStorage
  existingOrders = existingOrders.filter(
    (order) => !(order.productId === productId && order.size === size)
  );

  // Save the updated orders array to localStorage
  saveOrderDetails(existingOrders);
};
