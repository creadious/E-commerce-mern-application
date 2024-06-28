import React from "react";
import { Link, useLocation } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();
  const { state } = location;

  const { addressDetails, orderItems, paymentId } = state;

  const itemsPrice = orderItems?.reduce(
    (acc, item) => acc + item?.productPrice * item?.quantity,
    0
  );

  console.log(state);
  return (
    <div className="md:mt-28 mt-16 md:px-0 px-2 min-h-screen xl:w-[1200px] md:w-[996px] mx-auto pb-8">
      <h2 className="text-center text-2xl font-medium">Order Details</h2>
      <div className="mt-4">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h4 className="font-medium text-xl">Order Items Details</h4>
            <div className="mt-4 space-y-4">
              {orderItems?.map((value) => {
                const { _id, productDetails, quantity, size, productPrice } =
                  value;
                return (
                  <div key={_id} className="p-4 bg-slate-100 rounded">
                    <div className="flex gap-4 justify-between">
                      <div className="flex gap-3">
                        <img
                          src={productDetails?.productImage}
                          alt="Product Image"
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex flex-col gap-2">
                          <h3 className="text-lg font-medium">
                            {productDetails?.name}
                          </h3>
                          <ul className="text-sm flex gap-5">
                            <li>Quantity: {quantity}</li>
                            <li>Size: {size || "(NA)"}</li>
                            <li>Price: ₹{productPrice}</li>
                            <li>Total: ₹{productPrice * quantity}</li>
                          </ul>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Link to={`/item-details/${productDetails?._id}`} className="px-2 py-1 text-sm border border-black rounded hover:bg-red-400 text-nowrap">
                          See Product
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 bg-slate-200 p-4 space-y-2">
              <div className="">
                <h2>Total Amount:</h2>
                <h2 className="text-4xl font-medium">₹{itemsPrice}</h2>
              </div>
              <div>
                <p>Transaction Id:</p>
                <p className="mt-1 text-sm p-1 px-3 border border-black inline-block rounded-md">{paymentId}</p>
              </div>
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
