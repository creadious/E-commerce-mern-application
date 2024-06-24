import { Link, useLocation } from "react-router-dom";
import LoadingSpin from "../../components/LoadingSpin";
import useCartProductDetails from "../../hook/useCartProductDetails";
import AddressForm from "./AddressForm";
import { useState } from "react";
import ShowAddresses from "./ShowAddresses";

import { AiFillPlusCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import priceDetails from "../../utils/priceDetails";

const PlaceOrder = () => {
  const location = useLocation();
  const { state } = location;
  const cartItems = state?.cartItems;
  const [isLoading, setIsLoading] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState(null);

  const { totalItems, totalOriginalPrice, totalDiscount, totalAmount } =
    priceDetails(cartItems);

  const [isAddressForm, setIsAddressForm] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSelectAddress = (id) => {
    setSelectedAddress(id);
  };

  if (isLoading) {
    return (
      <div className="h-screen grid place-content-center">
        <LoadingSpin />
      </div>
    );
  }
  const handleAddressShow = () => setIsAddressForm(!isAddressForm);
  return (
    <section className="md:mt-28 mt-16 md:px-0 px-2 min-h-screen xl:w-[1200px] mx-auto pb-8">
      <div className="grid md:grid-cols-3 gap-5">
        <div className="">
          <ShowAddresses
            handleSelectAddress={handleSelectAddress}
            selectedAddress={selectedAddress}
          />
          {!isAddressForm ? (
            <div>
              <button
                onClick={handleAddressShow}
                className="outline-1 outline px-3 py-1 flex items-center gap-1 uppercase"
              >
                <AiFillPlusCircle /> Add Address
              </button>
            </div>
          ) : (
            <AddressForm handleAddressShow={handleAddressShow} />
          )}
        </div>
        <div className="">
          <label
            htmlFor="paymentMethod"
            className="text-sm font-medium block pb-2"
          >
            Select your payment method :
          </label>
          <select
            name=""
            id=""
            className="w-full bg-slate-300 px-2 py-1 outline outline-2 cursor-pointer"
            onChange={(e) => {
              if (e.target.value == "CASH") {
                toast.error("Sorry! cash on delivery not available.");
              }
              setPaymentMethod(e.target.value);
            }}
          >
            <option value="no value" selected disabled>
              Payment method
            </option>
            <option value="CASH">CASH</option>
            <option value="CARD">CARD</option>
          </select>
        </div>
        <div className="col-span-1">
          <div className="p-5 bg-slate-200">
            <h3 className="text-center uppercase font-bold text-slate-600 text-lg">
              Price Details
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 font-semibold">
              <p>Total items:</p>{" "}
              <p className="text-right" id="total-items">
                {totalItems}
              </p>
              <p>Price:</p>{" "}
              <p className="text-right" id="total-original-price">
                ₹{totalOriginalPrice}
              </p>
              <p className="text-green-800">Discount:</p>{" "}
              <p className="text-right text-green-800" id="total-discount">
                -₹{totalDiscount}
              </p>
              <p>Shipping charge:</p>
              <p className="text-right">₹0</p>
            </div>
            <h2 className="mt-5 pt-5 border-t border-black flex justify-between text-xl text-slate-700 font-bold">
              Total Amount: <span id="net-amount">₹{totalAmount}</span>
            </h2>
            {selectedAddress && paymentMethod === "CARD" ? (
              <Link
                to="/payment"
                state={{ cartItems, selectedAddress, paymentMethod }}
                className="mt-5 block p-2 text-center bg-red-300 font-medium hover:bg-red-500 duration-200 w-full"
              >
                Payment
              </Link>
            ) : (
              <button
                onClick={() => {
                  toast.error("Please select an address.");
                }}
                className="mt-5 block p-2 text-center bg-slate-300 font-medium w-full"
              >
                Payment
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceOrder;
