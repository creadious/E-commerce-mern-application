import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllProducts = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: allProducts = [], isLoading: loading } = useQuery({
    queryKey: ["allProducts"],
    // enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `/products/all-products?limit=${6}&page=${1}`
      );
      const data = res.data;
      console.log("products", data);
      if (data.success) {
        return data.data;
      }
    },
  });

  return [allProducts, loading];
};

export default useAllProducts;
