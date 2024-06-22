import mongoose, { Schema } from "mongoose";

// mini model schema
const orderItemsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    orderPrice: {
      type: Number,
      require: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: {
      type: [orderItemsSchema],
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    paymentId: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ["CARD", "UPI", "CASH", "OTHERS"],
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "SHIPPING", "CANCELLED", "DELIVERED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
