import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    productImage: {
      type: String, // from image hosting
    },
    actualPrice: {
      type: Number,
      default: 0,
    },
    offerPrice: {
      type: Number,
      default: 0,
    },
    sizes: {
      type: [String], // changed to array of strings for multiple sizes
    },
    stock: {
      type: Number,
      default: 0,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategoryId: {
      type: String,
    },
    addedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
