import { Link } from "react-router-dom";
import LoadingSpin from "../../components/LoadingSpin";
import useCartProductDetails from "../../hook/useCartProductDetails";
import AddressForm from "./AddressForm";
import { useState } from "react";
import ShowAddresses from "./ShowAddresses";

import { AiFillPlusCircle } from "react-icons/ai";
import toast from "react-hot-toast";

const PlaceOrder = () => {
  const [cartItems, _, isLoading] = useCartProductDetails();

  const [isAddressForm, setIsAddressForm] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(null);
  
  const handleSelectAddress = (id) => {
    setSelectedAddress(id);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalOriginalPrice = cartItems.reduce(
    (acc, item) => acc + item.actualPrice * item.quantity,
    0
  );
  const totalDiscount = cartItems.reduce(
    (acc, item) => acc + (item.actualPrice - item.offerPrice) * item.quantity,
    0
  );
  const totalAmount = totalOriginalPrice - totalDiscount;

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
        <div className="md:col-span-2">
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
            {selectedAddress ? (
              <Link
                to="/payment"
                state={{ cartItems, selectedAddress }}
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
