import { asyncHandler } from "../utils/asyncHandler.js";
import { Category } from "../models/category.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { allStatusCode } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.models.js";

const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    // productImage,
    actualPrice,
    offerPrice,
    stock,
    category,
    subcategory, // Add subcategory field
    sizes, // Add sizes field
  } = req.body;

  if (
    !name ||
    !description ||
    !actualPrice ||
    !offerPrice ||
    !stock ||
    !category ||
    !subcategory
  ) {
    return res
      .status(allStatusCode.clientError)
      .json(
        new ApiError(
          allStatusCode.clientError,
          "Please fill the required fields"
        )
      );
  }

  if (!Array.isArray(sizes) || sizes.length === 0) {
    return res
      .status(allStatusCode.clientError)
      .json(
        new ApiError(
          allStatusCode.clientError,
          "Please provide sizes as an array of strings"
        )
      );
  }

  const categoryCheck = await Category.findOne({ _id: category });

  if (!categoryCheck) {
    return res
      .status(allStatusCode.notFound)
      .json(new ApiError(allStatusCode.notFound, "Category not found!"));
  }

  const subcategoryCheck = categoryCheck.subcategories.find(
    (sub) => sub._id === subcategory
  );

  if (!subcategoryCheck) {
    return res
      .status(allStatusCode.notFound)
      .json(new ApiError(allStatusCode.notFound, "Subcategory not found!"));
  }

  const productImageLocalPath = req?.file?.path;

  if (!productImageLocalPath) {
    return res.status(400).json(new ApiError(400, "Product image is required"));
  }

  console.log("This product image", productImageLocalPath);

  const uploadedProductImage = await uploadOnCloudinary(productImageLocalPath);

  console.log({ categoryCheck, subcategoryCheck });

  const newProduct = await Product.create({
    name,
    description,
    productImage: uploadedProductImage.url, // Use the URL from Cloudinary response
    actualPrice,
    offerPrice,
    sizes, // Include sizes
    stock,
    category: categoryCheck?.name, // Use the category ID
    subcategory: subcategoryCheck?.name, // Use the subcategory name
    addedBy: req.user._id, // Assuming you have user information in the request
  });

  return res
    .status(allStatusCode.success)
    .json(new APIResponse(newProduct, "Product added successfully"));
  //  catch (error) {
  //   console.error("Error adding product:", error);
  //   return res
  //     .status(allStatusCode.somethingWrong)
  //     .json(
  //       new ApiError(allStatusCode.somethingWrong, "Internal Server Error")
  //     );
  // }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.query;
});

export { addProduct, deleteProduct };
