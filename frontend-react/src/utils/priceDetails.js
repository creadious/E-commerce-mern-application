const priceDetails = (cartItems) => {
  const totalItems = cartItems?.reduce((acc, item) => acc + item.quantity, 0);
  const totalOriginalPrice = cartItems?.reduce(
    (acc, item) => acc + item?.productDetails?.actualPrice * item.quantity,
    0
  );
  const totalDiscount = cartItems.reduce(
    (acc, item) =>
      acc +
      (item?.productDetails?.actualPrice - item?.productDetails?.offerPrice) *
        item.quantity,
    0
  );
  const totalAmount = totalOriginalPrice - totalDiscount;

  return { totalItems, totalOriginalPrice, totalDiscount, totalAmount };
};

export default priceDetails;
