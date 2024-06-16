import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  addedBy: {
    type: String,
  },
});

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subcategories: [subcategorySchema],
    addedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
