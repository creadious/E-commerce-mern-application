import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hook/useAxiosSecure";
import LoadingSpin from "../../components/LoadingSpin";

const AddressForm = ({ handleAddressShow }) => {
  const [axiosSecure] = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
    alternatePhone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }
    console.log(formData);
    try {
      const res = await axiosSecure.post(`/address/add-address`, formData);
      const data = res?.data;
      console.log(data);
      if (data?.success) {
        toast.success("Address saved successfully!");
        handleAddressShow();
        setFormData({
          fullName: "",
          email: "",
          address: "",
          city: "",
          state: "",
          pinCode: "",
          country: "",
          phone: "",
          alternatePhone: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    if (
      formData.fullName.trim() === "" ||
      formData.email.trim() === "" ||
      formData.address.trim() === "" ||
      formData.city.trim() === "" ||
      formData.state.trim() === "" ||
      formData.pinCode.trim() === "" ||
      formData.country.trim() === "" ||
      formData.phone.trim() === ""
    ) {
      toast.error("Please fill in all fields.");
      return false;
    }
    return true;
  };

  return (
    <div className=" mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Street Address"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4 md:flex md:justify-between">
          <div className="mb-4 md:w-1/2 md:mr-2">
            <label
              htmlFor="city"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4 md:w-1/2">
            <label
              htmlFor="state"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>
        <div className="mb-4 md:flex md:justify-between">
          <div className="mb-4 md:w-1/2 md:mr-2">
            <label
              htmlFor="pinCode"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Pin Code
            </label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              placeholder="Postal Code"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4 md:w-1/2">
            <label
              htmlFor="country"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>
        <div className="mb-4 md:flex md:justify-between">
          <div className="mb-4 md:w-1/2 md:mr-2">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone no.
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4 md:w-1/2">
            <label
              htmlFor="alternatePhone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Alternate no.
            </label>
            <input
              type="text"
              id="alternatePhone"
              name="alternatePhone"
              value={formData.alternatePhone}
              onChange={handleChange}
              placeholder="Alternate Number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="flex items-center  gap-6">
          <button
            disabled={isLoading}
            type="submit"
            className={`hover:bg-red-700 bg-red-400 rounded-sm text-sm text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline flex items-center gap-2 ${
              isLoading ? "bg-red-800" : ""
            }`}
          >
            Save Address
            {isLoading && <LoadingSpin />}
          </button>
          <button
            onClick={handleAddressShow}
            className={`hover:bg-red-700 hover:text-white border-red-400 border text-red-600 rounded-sm text-sm py-2 px-4  focus:outline-none focus:shadow-outline flex items-center gap-2 `}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
