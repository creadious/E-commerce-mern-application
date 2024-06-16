import { allStatusCode } from "../constants.js";
import { Category } from "../models/category.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIResponse } from "../utils/ApiResponse.js";

const addCategory = asyncHandler(async (req, res) => {
  const user = req?.user;
  const { category } = req?.body;

  if (!category) {
    return res
      .status(allStatusCode.clientError)
      .json(new ApiError(allStatusCode.clientError, "Please add category."));
  }

  const categoryCheck = await Category.findOne({ name: category });

  if (categoryCheck) {
    return res
      .status(allStatusCode.clientError)
      .json(new ApiError(allStatusCode.clientError, "This category already exist."));
  }

  const addCategory = await Category.create({
    name: category,
    addedBy: user?.firstName + " " + user?.lastName,
  });

  const Cat = await Category.findById(addCategory?._id);

  if (!Cat) {
    return res
      .status(allStatusCode.somethingWrong)
      .json(new ApiError(allStatusCode.somethingWrong, "Somethings went wrong! while add category."));
  }

  return res
    .status(allStatusCode.success)
    .json(new APIResponse(allStatusCode.success, Cat, "Category added!"));
});

const addSubcategory = asyncHandler(async (req, res) => {
  const user = req?.user;
  const { categoryId, subcategory } = req?.body;

  if (!categoryId || !subcategory) {
    return res
      .status(allStatusCode.clientError)
      .json(new ApiError(allStatusCode.clientError, "Category ID and subcategory name are required."));
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    return res
      .status(allStatusCode.notFound)
      .json(new ApiError(allStatusCode.notFound, "Category not found."));
  }

  const subcategoryCheck = category.subcategories.find(sub => sub.name === subcategory);

  if (subcategoryCheck) {
    return res
      .status(allStatusCode.clientError)
      .json(new ApiError(allStatusCode.clientError, "This subcategory already exist."));
  }

  category.subcategories.push({ name: subcategory, addedBy: user?.firstName + " " + user?.lastName });
  await category.save();

  return res
    .status(allStatusCode.success)
    .json(new APIResponse(allStatusCode.success, category, "Subcategory added!"));
});

const viewAllCategories = asyncHandler(async (req, res) => {
  const allCategories = await Category.find();

  if (!allCategories.length) {
    return res
      .status(allStatusCode.clientError)
      .json(new ApiError(allStatusCode.notFound, "No category exists."));
  }

  return res
    .status(allStatusCode.success)
    .json(new APIResponse(allStatusCode.success, allCategories, "All categories fetched successfully!"));
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res
      .status(allStatusCode.clientError)
      .json(new ApiError(allStatusCode.clientError, "Category ID is required."));
  }

  const deletedCategory = await Category.findByIdAndDelete(id);

  if (!deletedCategory) {
    return res
      .status(allStatusCode.somethingWrong)
      .json(new ApiError(allStatusCode.somethingWrong, "Category not found."));
  }

  return res
    .status(allStatusCode.success)
    .json(new APIResponse(allStatusCode.success, null, "Category deleted successfully."));
});

const deleteSubcategory = asyncHandler(async (req, res) => {
  const { categoryId, subcategoryId } = req.query;

  if (!categoryId || !subcategoryId) {
    return res
      .status(allStatusCode.clientError)
      .json(new ApiError(allStatusCode.clientError, "Category ID and subcategory ID are required."));
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    return res
      .status(allStatusCode.notFound)
      .json(new ApiError(allStatusCode.notFound, "Category not found."));
  }

  category.subcategories = category.subcategories.filter(sub => sub._id.toString() !== subcategoryId);
  await category.save();

  return res
    .status(allStatusCode.success)
    .json(new APIResponse(allStatusCode.success, category, "Subcategory deleted successfully."));
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const { name } = req.body;

  if (!id) {
    return res
      .status(allStatusCode.clientError)
      .json(new ApiError(allStatusCode.clientError, "Category ID is required."));
  }

  if (!name) {
    return res
      .status(allStatusCode.clientError)
      .json(new ApiError(allStatusCode.clientError, "Category name is required."));
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );

  if (!updatedCategory) {
    return res
      .status(allStatusCode.somethingWrong)
      .json(new ApiError(allStatusCode.somethingWrong, "Category not found."));
  }

  return res
    .status(allStatusCode.success)
    .json(new APIResponse(allStatusCode.success, updatedCategory, "Category updated successfully."));
});

export { addCategory, addSubcategory, viewAllCategories, deleteCategory, deleteSubcategory, updateCategory };
