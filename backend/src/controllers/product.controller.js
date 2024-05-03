import { asyncHandler } from "../utils/asyncHandler.js";

const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    productImage,
    actualPrice,
    offerPrice,
    stock,
    category,
  } = req?.body;

  console.log(category);
});

export { addProduct };
