import { allStatusCode } from "../constants.js";
import { User } from "../models/User.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const registerUser = asyncHandler(async (req, res) => {
  // 1 Get user details from frontend
  // 2 Validation - not empty
  // 3 check if user already exists -  email
  // 4 create user object - create entry in DB
  // 5 check for user creation
  // 6 return response

  const { firstName, lastName, email } = req.body;

  if ([firstName, lastName, email].some((field) => field?.trim() === "")) {
    return res
      .status(allStatusCode.clientError)
      .json(
        new ApiError(
          allStatusCode.clientError,
          "Please fill the required fields"
        )
      );
  }
});

export { registerUser };
