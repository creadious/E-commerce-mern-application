import { Link } from "react-router-dom";
import {
  AiFillDelete,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import LoadingSpin from "../../components/LoadingSpin";
import useCartItems from "../../hook/useCartItems";
import priceDetails from "../../utils/priceDetails";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";

const Cart = () => {
  const [axiosSecure] = useAxiosSecure();

  const [cartItems, loading, cartRefetch] = useCartItems();

  const [isLoading, setIsLoading] = useState(false);

  const { totalItems, totalOriginalPrice, totalDiscount, totalAmount } =
    priceDetails(cartItems);

  const cartUpdateFunction = async (routeName, id) => {
    try {
      setIsLoading(true);
      const res = await axiosSecure.patch(`/carts/${routeName}`, {
        cartId: id,
      });
      const data = res?.data;
      if (data?.success) {
        cartRefetch();
        if (data?.message == "Product delete from cart successfully.") {
          return toast.success(data?.message);
        }
      }
    } catch (error) {
      console.error(error);
      if (error?.response?.data?.message) {
        return toast.error(error?.response?.data?.message);
      }
      toast.error("Something is wrong try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityIncrement = async (id) => {
    await cartUpdateFunction("quantity-plus", id);
  };

  const handleQuantityDecrement = async (id) => {
    await cartUpdateFunction("quantity-minus", id);
  };

  const handleRemoveItem = async (id) => {
    await cartUpdateFunction("cart-delete", id);
  };

  if (loading) {
    return (
      <div className="h-screen grid place-content-center">
        <LoadingSpin />
      </div>
    );
  }

  return (
    <main className="md:mt-28 mt-16 md:px-0 px-2 min-h-screen xl:w-[1200px] mx-auto pb-8">
      <div className="mb-4 flex items-center">
        <Link
          to="/shop"
          className="font-medium px-3 py-2 bg-red-500 text-sm rounded-md text-white"
        >
          <i className="fa-solid fa-angles-left text-xs"></i> Continue Shopping
        </Link>
      </div>
      <section className="grid md:grid-cols-3 grid-cols-1 gap-5">
        <div className="md:col-span-2 space-y-3">
          {cartItems.map((item) => {
            return (
              <div
                key={item?._id}
                className="flex justify-between gap-5 items-start"
              >
                <div className="flex gap-2">
                  <img
                    src={item?.productDetails?.productImage}
                    alt={item?.productDetails?.name}
                    className="h-20 w-20 object-cover object-top p-1 bg-white rounded-md"
                  />
                  <div>
                    <Link
                      to={`/item-details/${item?.productId}`}
                      className="md:text-xl font-bold hover:underline hover:text-blue-800"
                    >
                      {item?.productDetails?.name?.length > 45
                        ? item?.productDetails?.name?.slice(0, 45) + "..."
                        : item?.productDetails?.name}
                    </Link>
                    <div className="flex gap-2 text-lg items-center">
                      <p className="line-through text-sm">
                        ₹{item?.productDetails?.actualPrice}
                      </p>
                      <p className="font-medium">
                        ₹{item?.productDetails?.offerPrice}
                      </p>
                      <p className="text-xs font-medium text-green-700">
                        {Math.round(
                          ((item?.productDetails?.actualPrice -
                            item?.productDetails?.offerPrice) /
                            item?.productDetails?.actualPrice) *
                            100
                        )}
                        % off
                      </p>
                    </div>
                    <p>
                      <span className="text-sm p-1 py-0 rounded-sm bg-slate-300">
                        {item?.size}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-5 text-xl">
                    <div className="flex items-center gap-1">
                      <button
                        disabled={isLoading}
                        onClick={() => handleQuantityDecrement(item?._id)}
                      >
                        <AiOutlineMinusCircle />
                      </button>
                      {isLoading ? (
                        <LoadingSpin />
                      ) : (
                        <input
                          type="number"
                          className="w-6 text-center font-medium"
                          minLength="1"
                          value={item?.quantity}
                          readOnly
                        />
                      )}
                      <button
                        disabled={isLoading}
                        onClick={() => handleQuantityIncrement(item?._id)}
                      >
                        <AiOutlinePlusCircle />
                      </button>
                    </div>
                    <div className="h-full text-xl font-medium">
                      <h3>
                        ₹{item?.productDetails?.offerPrice * item?.quantity}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item?._id)}
                    className="block text-red-600 hover:scale-110 duration-150 ms-auto text-xl"
                    title="delete"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div>
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
            <Link
              to="/place-order"
              state={{ cartItems }}
              className="mt-5 block p-2 text-center bg-red-300 font-medium hover:bg-red-500 duration-200"
            >
              Place order
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;
