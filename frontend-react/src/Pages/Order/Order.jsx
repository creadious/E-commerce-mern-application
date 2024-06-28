import React from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpin from "../../components/LoadingSpin";
import { Link } from "react-router-dom";

const Order = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: orderHistory = [], isLoading: loading } = useQuery({
    queryKey: ["orderHistory"],
    // enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/orders/order-history`);
      const data = res.data;
      if (data.success) {
        return data.data;
      }
    },
  });

  if (loading) {
    return (
      <div className="h-screen grid place-content-center">
        <LoadingSpin />
      </div>
    );
  }

  return (
    <div className="md:mt-28 mt-16 md:px-0 px-2 min-h-screen xl:w-[1200px] md:w-[996px] mx-auto pb-8">
      <div className="text-center">
        <h1 className="text-2xl font-medium">Order history</h1>
        <p>Total orders - {orderHistory?.length}</p>
      </div>
      <ul className="space-y-2 mt-10">
        {orderHistory?.map((value, index) => {
          const { _id, createdAt, orderItems, status } = value;
          const date = new Date(createdAt);
          const itemsPrice = orderItems?.reduce(
            (acc, item) => acc + item?.productPrice * item?.quantity,
            0
          );
          return (
            <li
              key={_id}
              className="flex gap-4 justify-between bg-slate-200 px-2 rounded py-3"
            >
              <div className="flex items-center gap-4">
                <div>{index + 1}</div>
                <div>{date.toLocaleDateString("en-GB")}</div>
                <div className="space-y-2">
                  {orderItems?.map((v) => {
                    return (
                      <div
                        key={v?._id}
                        className="flex gap-3 bg-slate-100 p-1 h-full md:w-[35rem]"
                      >
                        <img
                          src={v?.productDetails?.productImage}
                          alt="Product image"
                          className="w-12 h-12 h-full object-cover bg-slate-200 p-1 rounded-sm"
                        />
                        <div className="flex flex-col justify-between">
                          <Link
                            to={`/item-details/${v?.productDetails?._id}`}
                            className="font-medium underline hover:text-blue-600"
                          >
                            {v?.productDetails?.name?.length >= 60
                              ? v?.productDetails?.name?.slice(0, 60) + "..."
                              : v?.productDetails?.name}
                          </Link>
                          <div className="text-sm flex gap-5">
                            <p>Quantity: {v?.quantity}</p>
                            <p>Size: {v?.size}</p>
                            <p>Product Price: {v?.productPrice}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-3 justify-between items-end">
                <div className="flex gap-5">
                  <div>
                    <h2 className="text-xs">Amount</h2>
                    <h4 className="text-xl font-medium">{itemsPrice}</h4>
                  </div>
                  <div className="text-xs">
                    <p>Status</p>
                    <button
                      className={` px-2 py-1 rounded-md font-medium ${
                        status == "PENDING"
                          ? "bg-orange-400"
                          : status == "ACCEPT"
                          ? "bg-green-400"
                          : ""
                      } `}
                    >
                      {status}
                    </button>
                  </div>
                </div>
                <div className="text-xs flex ">
                  <Link to={`/order-details`} state={value} className="px-3 py-1 border border-black rounded hover:bg-red-400">View Order</Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Order;
