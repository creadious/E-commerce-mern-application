import mongoose, { ObjectId } from "mongodb";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Category } from "../models/category.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { allStatusCode } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.models.js";

const addProduct = asyncHandler(async (req, res) => {
  const body = req?.body;
  const {
    name,
    description,
    actualPrice,
    offerPrice,
    stocks,
    sizes,
    category,
    subcategory,
  } = body;

  try {
    if (
      !name ||
      !description ||
      !actualPrice ||
      !offerPrice ||
      !stocks ||
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

    const isSizes = JSON.parse(sizes);
    if (!Array.isArray(isSizes) || isSizes.length === 0) {
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

    const subcategoryCheck = categoryCheck?.subcategories?.find(
      (sub) => sub?.id === subcategory
    );

    if (!subcategoryCheck) {
      return res
        .status(allStatusCode.notFound)
        .json(new ApiError(allStatusCode.notFound, "Subcategory not found!"));
    }

    const productImageLocalPath = req?.file?.path;

    if (!productImageLocalPath) {
      return res
        .status(400)
        .json(new ApiError(400, "Product image is required"));
    }

    const uploadedProductImage = await uploadOnCloudinary(
      productImageLocalPath
    );
    
    const newProduct = await Product.create({
      name,
      description,
      productImage: uploadedProductImage.url,
      actualPrice: parseFloat(actualPrice),
      offerPrice: parseFloat(offerPrice),
      sizes: isSizes, // Include sizes
      stock: parseInt(stocks),
      categoryId: categoryCheck?._id, // Use the category ID
      subcategoryId: subcategoryCheck?._id, // Use the subcategory name
      addedBy: req.user._id, // Assuming you have user information in the request
    });

    console.log("Product added successfully");

    return res
      .status(allStatusCode.success)
      .json(
        new APIResponse(
          allStatusCode.success,
          newProduct,
          "Product added successfully"
        )
      );
  } catch (error) {
    console.error("Error adding product:", error);
    return res
      .status(allStatusCode.somethingWrong)
      .json(
        new ApiError(allStatusCode.somethingWrong, "Internal Server Error")
      );
  }
});

const viewAllProduct = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: {
          path: "$categoryDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          subcategoryDetails: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$categoryDetails.subcategories",
                  as: "sub",
                  cond: {
                    $eq: ["$$sub._id", { $toObjectId: "$subcategoryId" }],
                  },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $addFields: {
          categoryName: "$categoryDetails.name",
          subcategoryName: "$subcategoryDetails.name",
        },
      },
      {
        $project: {
          categoryDetails: 0,
          subcategoryDetails: 0,
        },
      },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) },
    ]);

    const pagination = {
      totalProducts,
      totalPages,
      currentPage: parseInt(page),
      nextPage: parseInt(page) < totalPages ? parseInt(page) + 1 : null,
      prevPage: parseInt(page) > 1 ? parseInt(page) - 1 : null,
      limit: parseInt(limit),
    };

    res.status(allStatusCode.success).json(
      new APIResponse(
        allStatusCode.success,
        {
          products,
          pagination,
        },
        "Fetched all products successfully"
      )
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(allStatusCode.somethingWrong)
      .json(
        new ApiError(allStatusCode.somethingWrong, "Internal server error")
      );
  }
});

const productDetails = asyncHandler(async (req, res) => {
  const { id } = req?.query;

  try {
    if (!id) {
      return res
        .status(allStatusCode.clientError)
        .json(
          new ApiError(
            allStatusCode.clientError,
            "Please provide a valid product id  query."
          )
        );
    }

    const product = await Product.aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: {
          path: "$categoryDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          subcategoryDetails: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$categoryDetails.subcategories",
                  as: "sub",
                  cond: {
                    $eq: ["$$sub._id", { $toObjectId: "$subcategoryId" }],
                  },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $addFields: {
          categoryName: "$categoryDetails.name",
          subcategoryName: "$subcategoryDetails.name",
        },
      },
      {
        $project: {
          categoryDetails: 0,
          subcategoryDetails: 0,
        },
      },
    ]);

    if (!product.length) {
      return res
        .status(allStatusCode.clientError)
        .json(
          new ApiError(
            allStatusCode.clientError,
            "Product not found with this provided id."
          )
        );
    }

    return res
      .status(allStatusCode.success)
      .json(
        new APIResponse(
          allStatusCode.success,
          product[0],
          "Product details fetched successfully"
        )
      );
  } catch (error) {
    console.error("Error fetching product details:", error);
    return res
      .status(allStatusCode.somethingWrong)
      .json(
        new ApiError(allStatusCode.somethingWrong, "Internal server error")
      );
  }
});

// const viewAllProduct = asyncHandler(async (req, res) => {
//   try {
//     const products = await Product.aggregate([
//       {
//         $lookup: {
//           from: "categories",
//           localField: "categoryId",
//           foreignField: "_id",
//           as: "categoryDetails",
//         },
//       },
//       {
//         $unwind: {
//           path: "$categoryDetails",
//           preserveNullAndEmptyArrays: true,
//         },
//       },
//       {
//         $addFields: {
//           subcategoryDetails: {
//             $arrayElemAt: [
//               {
//                 $filter: {
//                   input: "$categoryDetails.subcategories",
//                   as: "sub",
//                   cond: {
//                     $eq: ["$$sub._id", { $toObjectId: "$subcategoryId" }],
//                   },
//                 },
//               },
//               0,
//             ],
//           },
//         },
//       },
//       {
//         $addFields: {
//           categoryName: "$categoryDetails.name",
//           subcategoryName: "$subcategoryDetails.name",
//         },
//       },
//       {
//         $project: {
//           categoryDetails: 0,
//           subcategoryDetails: 0,
//         },
//       },
//     ]);

//     res.status(200).json({
//       message: "Fetched all products successfully",
//       data: products,
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.query;
});

export { addProduct, deleteProduct, viewAllProduct, productDetails };
