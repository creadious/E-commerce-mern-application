import { asyncHandler } from "../utils/asyncHandler.js";
import { Category } from "../models/category.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { allStatusCode } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";

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

  try {
    if (
      [name, description, actualPrice, offerPrice, stock, category].some(
        (field) => field === undefined || field.trim() === ""
      )
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
    const categoryCheck = await Category.findOne({ name: category });

    if (category !== categoryCheck?.name) {
      return res
        .status(allStatusCode.notFound)
        .json(new ApiError(allStatusCode.notFound, "Category not found!"));
    }

    const productLocalPath = req?.file?.path;

    if (!productLocalPath) {
      return res.status(400).json(new ApiError(400, "Product image is required"));
    }

    res.send(productLocalPath)


  } catch (error) {
    console.error("Error updating user details:", error);
    return res
      .status(allStatusCode.somethingWrong)
      .json(
        new ApiError(allStatusCode.somethingWrong, "Internal Server Error")
      );
  }
});

export { addProduct };
