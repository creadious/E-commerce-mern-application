import mongoose, { ObjectId } from "mongodb";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Category } from "../models/category.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { allStatusCode } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.models.js";
import stripe from "stripe";

const stripeKey = stripe(process.env.PAYMENT_SECRET_KEY);

const createPaymentIntent = asyncHandler(async (req, res) => {
  const { price } = req.body;

  try {
    if (!price) {
      return res
        .status(allStatusCode.clientError)
        .json(new ApiError(allStatusCode.clientError, "Please provide price."));
    }

    const amount = parseFloat(price) * 100;
    console.log(price, amount);
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

export { createPaymentIntent };
