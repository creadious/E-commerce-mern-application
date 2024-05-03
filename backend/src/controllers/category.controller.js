import { allStatusCode } from "../constants.js";

import { Category } from "../models/category.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIResponse } from "../utils/ApiResponse.js";

const addCategory = asyncHandler(async (req, res) => {
  const user = req?.user;

  const { category } = req?.body;

  if (category == undefined || category == "") {
    return res
      .status(allStatusCode.clientError)
      .json(new ApiError(allStatusCode.clientError, "Please add category."));
  }

  const addCategory = await Category.create({
    name: category,
    addedBy: user?.firstName + " " + user?.lastName,
  });

  const Cat = await Category.findById(addCategory?._id);

  if (!Cat) {
    return res
      .status(allStatusCode.somethingWrong)
      .json(
        new ApiError(
          allStatusCode.somethingWrong,
          "Somethings went wrong! while add category."
        )
      );
  }

  return res
    .status(allStatusCode.success)
    .json(new APIResponse(allStatusCode.success, Cat, "Category added!"));
});

const viewAllCategories = asyncHandler(async (req, res) => {
  const allCategories = await Category.find();

    // Extract id and name properties from each category
    const categoriesData = allCategories.map(category => ({
        id: category._id,
        name: category.name
      }));

      if(categoriesData.length==0){
        return res.status(allStatusCode.clientError).json(
            new ApiError(
                allStatusCode.notFound,
                "No category exists."
            )
        );
      }


  return res
    .status(allStatusCode.success)
    .json(
      new APIResponse(
        allStatusCode.success,
        categoriesData,
        "All categories fetch successfully!"
      )
    );
});

const deleteCategory = asyncHandler(async(req, res) => {
    const { id } = req.query;

    try {
        // Validate if the id parameter is provided
        if (!id) {
            return res.status(allStatusCode.clientError).json(
                new ApiError(
                    allStatusCode.clientError,
                    "Category ID is required."
                )
            );
        }

        // Delete the category by its ID
        const deletedCategory = await Category.findByIdAndDelete(id);

        // Check if the category was found and deleted
        if (!deletedCategory) {
            return res.status(allStatusCode.somethingWrong).json(
                new ApiError(
                    allStatusCode.somethingWrong,
                    "Category not found."
                )
            );
        }

        return res.status(allStatusCode.success).json(
            new APIResponse(
                allStatusCode.success,
                null,
                "Category deleted successfully."
            )
        );
    } catch (error) {
        console.error("Error deleting category:", error);
        return res.status(allStatusCode.serverError).json(
            new ApiError(
                allStatusCode.serverError,
                "An error occurred while deleting the category."
            )
        );
    }
});

const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.query;
    const { name } = req.body;

    try {
        // Validate if the id parameter is provided
        if (!id) {
            return res.status(allStatusCode.clientError).json(
                new ApiError(
                    allStatusCode.clientError,
                    "Category ID is required."
                )
            );
        }

        // Validate if the name field is provided
        if (!name) {
            return res.status(allStatusCode.clientError).json(
                new ApiError(
                    allStatusCode.clientError,
                    "Category name is required."
                )
            );
        }

        // Update the category by its ID
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name }, // Update the name field
            { new: true } // Return the updated category after update
        );

        // Check if the category was found and updated
        if (!updatedCategory) {
            return res.status(allStatusCode.somethingWrong).json(
                new ApiError(
                    allStatusCode.somethingWrong,
                    "Category not found."
                )
            );
        }

        return res.status(allStatusCode.success).json(
            new APIResponse(
                allStatusCode.success,
                updatedCategory,
                "Category updated successfully."
            )
        );
    } catch (error) {
        console.error("Error updating category:", error);
        return res.status(allStatusCode.serverError).json(
            new ApiError(
                allStatusCode.serverError,
                "An error occurred while updating the category."
            )
        );
    }
});


export { addCategory, viewAllCategories, deleteCategory, updateCategory };
