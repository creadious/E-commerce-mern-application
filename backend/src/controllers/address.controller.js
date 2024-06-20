import { ObjectId } from "mongodb";
import { asyncHandler } from "../utils/asyncHandler.js";
import { allStatusCode } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { Address } from "../models/address.models.js";

// valid object id
const isValidObjectId = (id) => {
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
};

const addAddress = asyncHandler(async (req, res) => {
  try {
    const {
      fullName,
      email,
      address,
      city,
      state,
      pinCode,
      country,
      phone,
      alternatePhone,
    } = req?.body;
    if (
      [fullName, address, email, city, state, pinCode, country, phone].some(
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

    const saveAddress = await Address.create({
      fullName,
      email,
      address,
      city,
      state,
      country,
      pinCode: parseInt(pinCode),
      phone,
      alternatePhone,
      userId: req.user._id,
    });

    return res
      .status(allStatusCode.success)
      .json(
        new APIResponse(
          allStatusCode.success,
          saveAddress,
          "Address added successfully"
        )
      );
  } catch (error) {
    console.error("Error adding product:", error);
    return res
      .status(allStatusCode.somethingWrong)
      .json(
        new ApiError(allStatusCode.somethingWrong, "Internal Server Error")
      );
  }
});

const viewUserAddresses = asyncHandler(async (req, res) => {
  try {
    const id = req?.user._id;

    const viewAddress = await Address.find({ userId: new ObjectId(id) });

    if (viewAddress?.length == 0) {
      return res
        .status(allStatusCode.notFound)
        .json(
          new ApiError(
            allStatusCode.notFound,
            "No addresses found for this user"
          )
        );
    }

    return res
      .status(allStatusCode.success)
      .json(
        new APIResponse(
          allStatusCode.success,
          viewAddress,
          "All addresses fetch successfully"
        )
      );
  } catch (error) {
    console.error("Error adding product:", error);
    return res
      .status(allStatusCode.somethingWrong)
      .json(
        new ApiError(allStatusCode.somethingWrong, "Internal Server Error")
      );
  }
});

const updateAddress = asyncHandler(async (req, res) => {
  try {
    const { id } = req.query;

    if (!id || !isValidObjectId(id)) {
      return res
        .status(allStatusCode.clientError)
        .json(
          new ApiError(allStatusCode.clientError, "Please enter a valid ID.")
        );
    }

    const findAddress = await Address.findById(new ObjectId(id));

    if (!findAddress) {
      return res
        .status(allStatusCode.notFound)
        .json(new ApiError(allStatusCode.notFound, "Address not found"));
    }

    const { fullName, email, address, city, state, pinCode, country } =
      req?.body;
    if (
      [fullName, address, email, city, state, pinCode, country].some(
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

    const updatedAddress = await Address.findByIdAndUpdate(
      new ObjectId(id),
      {
        fullName,
        email,
        address,
        city,
        state,
        country,
        pinCode: parseInt(pinCode),
        userId: req.user._id,
      }
      //   { new: true }
    );

    return res
      .status(allStatusCode.success)
      .json(
        new APIResponse(
          allStatusCode.success,
          updatedAddress,
          "Address update successfully"
        )
      );
  } catch (error) {
    console.error("Error updating address:", error);
    return res
      .status(allStatusCode.somethingWrong)
      .json(
        new ApiError(allStatusCode.somethingWrong, "Internal Server Error")
      );
  }
});

const deleteAddress = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id)) {
      return res
        .status(allStatusCode.clientError)
        .json(
          new ApiError(allStatusCode.clientError, "Please enter a valid ID.")
        );
    }

    const findAddress = await Address.findById(new ObjectId(id));

    if (!findAddress) {
      return res
        .status(allStatusCode.notFound)
        .json(new ApiError(allStatusCode.notFound, "Address not found"));
    }

    const deletedAddress = await Address.deleteOne({ _id: new ObjectId(id) });

    return res
      .status(allStatusCode.success)
      .json(
        new APIResponse(
          allStatusCode.success,
          deletedAddress,
          "Address delete successfully"
        )
      );
  } catch (error) {
    console.error("Error updating address:", error);
    return res
      .status(allStatusCode.somethingWrong)
      .json(
        new ApiError(allStatusCode.somethingWrong, "Internal Server Error")
      );
  }
});

export { addAddress, viewUserAddresses, updateAddress, deleteAddress };
