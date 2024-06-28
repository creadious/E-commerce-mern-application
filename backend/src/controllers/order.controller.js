import { ObjectId } from "mongodb";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Category } from "../models/category.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { allStatusCode } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";
import stripe from "stripe";
import { Address } from "../models/address.models.js";
import { Order } from "../models/order.models.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.models.js";

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

      cartItems.push(cartDetails[0]);
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

const paymentComplete = asyncHandler(async (req, res) => {
  try {
    const { items, paymentTransaction, addressId, paymentMethod } = req.body;

    // const paymentTransaction =
    //   "pi_3PUnThSHFnB0nQaY1oNdNLmq_secret_pGruPgZTFBPB0w2uIy1tuyZHq";

    // const items = [
    //   {
    //     _id: "667720de4b54b4eea8e28f31",
    //   },
    //   {
    //     _id: "66783848ee30cba1c19179fd",
    //   },
    // ];

    // const addressId = "6674499371c06d5bd48cb459";

    // const paymentMethod = "CARD";
    const userId = req.user._id;

    if (!Array.isArray(items) || items.length === 0 || !paymentTransaction) {
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
            productDetails: { $arrayElemAt: ["$productDetails", 0] },
          },
        },
        // {
        // $project: {
        // productDetails: 1,
        // userId: 0,
        // productId: 0,
        // createdAt: 0,
        // updatedAt: 0,
        // __v: 0,
        // },
        // },
      ]);

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
      // console.log(cartDetails);

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

      const productStockDelete = await Product.findOneAndUpdate(
        {
          _id: new ObjectId(cartDetails[0].productId),
        },
        {
          $inc: { stock: -cartDetails[0].quantity },
          $set: { sales: cartDetails[0].quantity },
        },
        { new: true }
      );

      cartItems.push(cartDetails[0]);
    }

    const amount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const orderItems = cartItems.map((v) => {
      return {
        productId: v.productId,
        productPrice: v.productDetails.offerPrice,
        quantity: v.quantity,
        size: v.size,
      };
    });

    const orderHistory = await Order.create({
      customerId: userId,
      addressId,
      orderItems,
      paymentId: paymentTransaction,
      orderPrice: amount,
      paymentMethod: paymentMethod.toLocaleUpperCase(),
    });

    if (!orderHistory) {
      return res
        .status(allStatusCode.somethingWrong)
        .json(
          new ApiError(allStatusCode.somethingWrong, "Order history not added")
        );
    }

    const cartsDelete = await Cart.deleteMany({
      userId: new ObjectId(cartItems[0].userId),
    });

    if (!cartsDelete) {
      return res
        .status(allStatusCode.notFound)
        .json(new ApiError(allStatusCode.notFound, "Carts not deleted"));
    }

    return res
      .status(allStatusCode.success)
      .json(
        new APIResponse(
          allStatusCode.success,
          orderHistory,
          "Order history added successfully."
        )
      );
  } catch (error) {
    console.error("Error payment complete:", error);
    return res
      .status(allStatusCode.somethingWrong)
      .json(
        new ApiError(allStatusCode.somethingWrong, "Internal Server Error")
      );
  }
});

const viewOrderHistory = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const orderHistory = await Order.aggregate([
      {
        $match: { customerId: new ObjectId(userId) },
      },
      {
        $unwind: "$orderItems",
      },
      {
        $lookup: {
          from: "products",
          localField: "orderItems.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $group: {
          _id: "$_id",
          orderPrice: { $first: "$orderPrice" },
          customerId: { $first: "$customerId" },
          addressId: { $first: "$addressId" },
          paymentId: { $first: "$paymentId" },
          paymentMethod: { $first: "$paymentMethod" },
          status: { $first: "$status" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          orderItems: {
            $push: {
              productId: "$orderItems.productId",
              quantity: "$orderItems.quantity",
              size: "$orderItems.size",
              productPrice: "$orderItems.productPrice",
              productDetails: "$productDetails",
            },
          },
        },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "addressId",
          foreignField: "_id",
          as: "addressDetails",
        },
      },
      {
        $addFields: {
          addressDetails: { $arrayElemAt: ["$addressDetails", 0] },
        },
      },
      {
        $sort: {
          createdAt: -1, // Sort by createdAt field in descending order
        },
      },
    ]);

    return res
      .status(allStatusCode.success)
      .json(
        new APIResponse(
          allStatusCode.success,
          orderHistory,
          "Order history fetch successfully."
        )
      );
  } catch (error) {
    console.error("Error fetching order history:", error);
    return res
      .status(allStatusCode.somethingWrong)
      .json(
        new ApiError(allStatusCode.somethingWrong, "Internal Server Error")
      );
  }
});

export { createPaymentIntent, paymentComplete, viewOrderHistory };
