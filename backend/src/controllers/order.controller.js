import { ObjectId } from "mongodb";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Category } from "../models/category.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { allStatusCode } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.models.js";
import { Cart } from "../models/cart.model.js";
import stripe from "stripe";

const stripeKey = stripe(process.env.PAYMENT_SECRET_KEY);

const createPaymentIntent = asyncHandler(async (req, res) => {
  const { items } = req.body;

  // const items = [
  //   {
  //     _id: "667720de4b54b4eea8e28f31",
  //   },
  //   {
  //     _id: "6676e0353185d26ef066f6f3",
  //   },
  // ];

  try {
    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(allStatusCode.clientError)
        .json(
          new ApiError(
            allStatusCode.clientError,
            "Please provide items details"
          )
        );
    }

    const cartItems = [];

    for (let i in items) {
      const cartDetails = await Cart.aggregate([
        {
          $match: { _id: new ObjectId(items[i]._id) },
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
          $addFields: {
            price: { $arrayElemAt: ["$productDetails.offerPrice", 0] },
            stock: { $arrayElemAt: ["$productDetails.stock", 0] },
          },
        },
        {
          $project: {
            productDetails: 0,
            userId: 0,
            productId: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
          },
        },
      ]);
      cartItems.push(cartDetails[0]);

      if (!cartDetails[0]) {
        return res
          .status(allStatusCode.notFound)
          .json(
            new ApiError(
              allStatusCode.notFound,
              `Cart id not valid ${items[i]._id}`
            )
          );
      }

      if (cartDetails[0].quantity > cartDetails[0].stock) {
        return res
          .status(allStatusCode.notFound)
          .json(
            new ApiError(
              allStatusCode.notFound,
              `Cart product quantity is out of stock`,
              { cartId: cartDetails[0]._id }
            )
          );
      }
    }

    const amount =
      cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) *
      100;

    const paymentIntent = await stripeKey.paymentIntents.create({
      amount: amount,
      currency: "inr",
      payment_method_types: ["card"],
    });

    return res
      .status(allStatusCode.success)
      .json(
        new APIResponse(
          allStatusCode.success,
          { clientSecret: paymentIntent.client_secret },
          "Client secret send successfully."
        )
      );
  } catch (error) {
    console.error("Error sent client secret product:", error);
    return res
      .status(allStatusCode.somethingWrong)
      .json(
        new ApiError(allStatusCode.somethingWrong, "Internal Server Error")
      );
  }
});

const paymentComplete = asyncHandler(async (req, res) => {});

export { createPaymentIntent, paymentComplete };
