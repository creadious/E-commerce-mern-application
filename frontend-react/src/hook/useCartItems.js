import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCartItems = () => {
  const [axiosSecure] = useAxiosSecure();

  const {
    data: allCartItems = [],
    isLoading: loading,
    refetch: cartRefetch,
  } = useQuery({
    queryKey: ["cartItems"],
    // enabled: !loading,
    queryFn: async () => {
      try {
        const res = await axiosSecure("/carts/view");
        const data = res.data;
        console.log("cart items", data);
        if (data?.success) {
          return data.data;
        }
      } catch (error) {
        console.error("all cart items", error);
      }
    },
  });

  return [allCartItems, loading, cartRefetch];
};

export default useCartItems;
