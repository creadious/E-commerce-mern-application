import { ObjectId } from "mongodb";
import { asyncHandler } from "../utils/asyncHandler.js";
import { allStatusCode } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.model.js";

const addToCart = asyncHandler(async (req, res) => {
  try {
    const { productId, quantity } = req?.body;
    const userId = req?.user?._id;

    if (
      [productId, quantity].some(
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

    const cartCheck = await Cart.findOne({
      productId: new ObjectId(productId),
      userId: new ObjectId(userId),
    });

    if (cartCheck) {
      return res
        .status(allStatusCode.clientError)
        .json(
          new ApiError(allStatusCode.clientError, "Product already in cart")
        );
    }

    const addProductToCart = await Cart.create({
      userId,
      productId,
      quantity: parseInt(quantity),
    });

    return res
      .status(allStatusCode.success)
      .json(
        new APIResponse(
          allStatusCode.success,
          addProductToCart,
          "Cart added successfully"
        )
      );
  } catch (error) {
    console.error("Error adding in cart:", error);
    return res
      .status(allStatusCode.somethingWrong)
      .json(
        new ApiError(allStatusCode.somethingWrong, "Internal Server Error")
      );
  }
});

const userCartShow = asyncHandler(async (req, res) => {
  try {
    const userId = req?.user?._id;

    const cartProducts = await Cart.aggregate([
      { $match: { userId: new ObjectId(userId) } },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $project: {
          productId: 1,
          quantity: 1,
          //   userId: 0,
          productDetails: { $arrayElemAt: ["$productDetails", 0] },
        },
      },
    ]);

    if (cartProducts.length === 0) {
      return res
        .status(allStatusCode.notFound)
        .json(
          new ApiError(allStatusCode.notFound, "No product found in your cart.")
        );
    }

    return res
      .status(allStatusCode.success)
      .json(
        new APIResponse(
          allStatusCode.success,
          cartProducts,
          "User cart show successfully"
        )
      );
  } catch (error) {
    console.error("Error show user cart:", error);
    return res
      .status(allStatusCode.somethingWrong)
      .json(
        new ApiError(allStatusCode.somethingWrong, "Internal Server Error")
      );
  }
});

const quantityIncrease = asyncHandler(async (req, res) => {
  try {
    const { cartId } = req.body;

    if (!cartId) {
      return res
        .status(allStatusCode.clientError)
        .json(new ApiError(allStatusCode.clientError, "Cart ID are required."));
    }

    const findProduct = await Cart.aggregate([
      {
        $match: { _id: new ObjectId(cartId) },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $project: {
          productId: 1,
          quantity: 1,
          //   userId: 0,
          productDetails: { $arrayElemAt: ["$productDetails", 0] },
        },
      },
    ]);

    const productQuantity = findProduct[0]?.quantity;
    const productStock = findProduct[0]?.productDetails?.stock;

    if (productQuantity + 1 > productStock) {
      return res
        .status(allStatusCode.clientError)
        .json(
          new ApiError(
            allStatusCode.clientError,
            "quantity not increase than stock"
          )
        );
    }

    const updatedCart = await Cart.findOneAndUpdate(
      {
        _id: new ObjectId(cartId),
      },
      {
        $inc: { quantity: 1 },
      },
      { new: true } // Return the updated document
    );

    if (!updatedCart) {
      return res
        .status(allStatusCode.notFound)
        .json(new ApiError(allStatusCode.notFound, "Cart item not found."));
    }

    return res
      .status(allStatusCode.success)
      .json(
        new APIResponse(
          allStatusCode.success,
          updatedCart,
          "Quantity increase successfully."
        )
      );
  } catch (error) {
    console.error("Error quantity increase:", error);
    return res
      .status(allStatusCode.somethingWrong)
      .json(
        new ApiError(allStatusCode.somethingWrong, "Internal Server Error")
      );
  }
});

const quantityDecrease = asyncHandler(async (req, res) => {
  try {
    const { cartId } = req.body;

    if (!cartId) {
      return res
        .status(allStatusCode.clientError)
        .json(new ApiError(allStatusCode.clientError, "Cart ID are required."));
    }

    // Fetch the current quantity
    const cartItem = await Cart.findOne({
      _id: new ObjectId(cartId),
    });

    if (!cartItem) {
      return res
        .status(allStatusCode.notFound)
        .json(new ApiError(allStatusCode.notFound, "Cart item not found."));
    }

    if (cartItem.quantity <= 1) {
      return res
        .status(allStatusCode.clientError)
        .json(
          new ApiError(
            allStatusCode.clientError,
            "Quantity cannot be less than 1."
          )
        );
    }

    const updatedCart = await Cart.findOneAndUpdate(
      {
        _id: new ObjectId(cartId),
      },
      {
        $inc: { quantity: -1 },
      },
      { new: true } // Return the updated document
    );

    return res
      .status(allStatusCode.success)
      .json(
        new APIResponse(
          allStatusCode.success,
          updatedCart,
          "Quantity decrease successfully."
        )
      );
  } catch (error) {
    console.error("Error quantity decrease:", error);
    return res
      .status(allStatusCode.somethingWrong)
      .json(
        new ApiError(allStatusCode.somethingWrong, "Internal Server Error")
      );
  }
});

const deleteProductInCart = asyncHandler(async (req, res) => {
  try {
    const { cartId } = req.body;

    if (!cartId) {
      return res
        .status(allStatusCode.clientError)
        .json(
          new ApiError(
            allStatusCode.clientError,
            "User ID and Cart ID are required."
          )
        );
    }

    const deleteCartProduct = await Cart.findOneAndDelete({
      _id: new ObjectId(cartId),
    });

    if (!deleteCartProduct) {
      return res
        .status(allStatusCode.clientError)
        .json(new ApiError(allStatusCode.clientError, "No product to delete"));
    }

    return res
      .status(allStatusCode.success)
      .json(
        new APIResponse(
          allStatusCode.success,
          deleteCartProduct,
          "Product delete from cart successfully."
        )
      );
  } catch (error) {
    console.error("Error quantity decrease:", error);
    return res
      .status(allStatusCode.somethingWrong)
      .json(
        new ApiError(allStatusCode.somethingWrong, "Internal Server Error")
      );
  }
});

export {
  addToCart,
  userCartShow,
  quantityIncrease,
  quantityDecrease,
  deleteProductInCart,
};
