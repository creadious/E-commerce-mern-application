import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useEffect, useState } from "react";

const useCartProductDetails = () => {
  const [axiosSecure] = useAxiosSecure();

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      const orderDetails =
        JSON.parse(localStorage.getItem("orderDetails")) || [];
      if (orderDetails.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        const responses = await Promise.all(
          orderDetails.map((order) =>
            axiosSecure
              .get(`/products/product-details?id=${order.productId}`)
              .then((res) => {
                return {
                  ...res.data?.data,
                  quantity: order.quantity,
                  size: order.size,
                };
              })
          )
        );
        setCartItems(responses);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  return [cartItems, setCartItems, isLoading];
};

export default useCartProductDetails;
