import React from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpin from "../../components/LoadingSpin";

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

  console.log(orderHistory)

  if (loading) {
    return (
      <div className="h-screen grid place-content-center">
        <LoadingSpin />
      </div>
    );
  }

  return (
    <div className="md:mt-28 mt-16 md:px-0 px-2 min-h-screen xl:w-[1200px] mx-auto pb-8">
      <div className="text-center">
        <h1 className="text-2xl font-medium">Order history</h1>
        <p>Total orders - {orderHistory?.length}</p>
      </div>
    </div>
  );
};

export default Order;
