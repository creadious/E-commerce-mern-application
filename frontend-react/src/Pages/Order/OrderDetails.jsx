import React from "react";
import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();
  const { state } = location;

  const { addressDetails, orderItems } = state;

  console.log(state);
  return (
    <div className="md:mt-28 mt-16 md:px-0 px-2 min-h-screen xl:w-[1200px] md:w-[996px] mx-auto pb-8">
      <h2 className="text-center text-2xl font-medium">Order Details</h2>
      <div className="mt-4">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h4 className="font-medium text-xl">Order Items Details</h4>
            <div className="mt-4">
              {orderItems?.map((value) => {
                const { _id, productDetails } = value;
                return (
                  <div key={_id}>
                    <img src={productDetails?.productImage} alt="Product Image" className="w-20 h-20 object-cover rounded-md" />
                    <h3>{productDetails?.name}</h3>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="md:col-span-1 bg-slate-200 p-4 rounded">
            <h4 className="font-medium text-xl">Address Details</h4>
            <ul className="mt-2 bg-white p-2 text-sm space-y-2">
              <li className="pb-1 border-b border-slate-300">
                Name: <br />{" "}
                <span className="font-medium">{addressDetails?.fullName}</span>
              </li>
              <li className="pb-1 border-b border-slate-300">
                Email: <br />{" "}
                <span className="font-medium">{addressDetails?.email}</span>
              </li>
              <li className="pb-1 border-b border-slate-300">
                Phone No.: <br />{" "}
                <span className="font-medium">{addressDetails?.phone}</span>
              </li>
              <li className="pb-1 border-b border-slate-300">
                Alternate No.: <br />{" "}
                <span className="font-medium">
                  {addressDetails?.alternatePhone}
                </span>
              </li>
              <li className="pb-1 border-b border-slate-300">
                Address: <br />{" "}
                <span className="font-medium">{addressDetails?.address}</span>
              </li>
              <li className="pb-1 border-b border-slate-300">
                City: <br />{" "}
                <span className="font-medium">{addressDetails?.city}</span>
              </li>
              <li className="pb-1 border-b border-slate-300">
                State: <br />{" "}
                <span className="font-medium">{addressDetails?.state}</span>
              </li>
              <li className="pb-1 border-b border-slate-300 grid grid-cols-2 ju">
                <span>
                  Pin Code: <br />{" "}
                  <span className="font-medium">{addressDetails?.pinCode}</span>
                </span>
                <span className="border-s ps-2 border-slate-300">
                  Country: <br />{" "}
                  <span className="font-medium">{addressDetails?.country}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
