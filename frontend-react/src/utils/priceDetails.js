import useCartProductDetails from "../hook/useCartProductDetails";

const priceDetails = () => {
  const [cartItems, _, isLoading] = useCartProductDetails();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalOriginalPrice = cartItems.reduce(
    (acc, item) => acc + item.actualPrice * item.quantity,
    0
  );
  const totalDiscount = cartItems.reduce(
    (acc, item) => acc + (item.actualPrice - item.offerPrice) * item.quantity,
    0
  );
  const totalAmount = totalOriginalPrice - totalDiscount;

  return { totalItems, totalOriginalPrice, totalDiscount, totalAmount };
};

export default priceDetails;
