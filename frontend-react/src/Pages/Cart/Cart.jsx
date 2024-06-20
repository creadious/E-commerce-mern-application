import { Link } from "react-router-dom";
import {
  AiFillDelete,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import LoadingSpin from "../../components/LoadingSpin";
import useCartProductDetails from "../../hook/useCartProductDetails";

const Cart = () => {
  const [cartItems, setCartItems, isLoading] = useCartProductDetails();

  // const [cartItems, setCartItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchCartItems = async () => {
  //     const orderDetails =
  //       JSON.parse(localStorage.getItem("orderDetails")) || [];
  //     if (orderDetails.length === 0) {
  //       setIsLoading(false);
  //       return;
  //     }

  //     try {
  //       const responses = await Promise.all(
  //         orderDetails.map((order) =>
  //           axiosSecure
  //             .get(`/products/product-details?id=${order.productId}`)
  //             .then((res) => {
  //               return {
  //                 ...res.data?.data,
  //                 quantity: order.quantity,
  //                 size: order.size,
  //               };
  //             })
  //         )
  //       );
  //       setCartItems(responses);
  //     } catch (error) {
  //       console.error("Error fetching cart items:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchCartItems();
  // }, []);

  const handleQuantityIncrement = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity += 1;
    setCartItems(updatedCartItems);
    localStorage.setItem(
      "orderDetails",
      JSON.stringify(
        updatedCartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          size: item.size,
        }))
      )
    );
  };

  const handleQuantityDecrement = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity -= 1;
      setCartItems(updatedCartItems);
      localStorage.setItem(
        "orderDetails",
        JSON.stringify(
          updatedCartItems.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            size: item.size,
          }))
        )
      );
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem(
      "orderDetails",
      JSON.stringify(
        updatedCartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          size: item.size,
        }))
      )
    );
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
  // console.log(cartItems);
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
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between gap-5 items-start">
              <div className="flex gap-2">
                <img
                  src={item.productImage}
                  alt={item.name}
                  className="h-20 w-20 object-cover object-top p-1 bg-white rounded-md"
                />
                <div>
                  <Link
                    to={`/item-details/${item?._id}`}
                    className="md:text-xl font-bold hover:underline hover:text-blue-800"
                  >
                    {item?.name.length > 45
                      ? item?.name?.slice(0, 45) + "..."
                      : item?.name}
                  </Link>
                  <div className="flex gap-2 text-lg items-center">
                    <p className="line-through text-sm">₹{item.actualPrice}</p>
                    <p className="font-medium">₹{item.offerPrice}</p>
                    <p className="text-xs font-medium text-green-700">
                      {Math.round(
                        ((item.actualPrice - item.offerPrice) /
                          item.actualPrice) *
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
                    <button onClick={() => handleQuantityDecrement(index)}>
                      <AiOutlineMinusCircle />
                    </button>
                    <input
                      type="number"
                      className="w-6 text-center font-medium"
                      minLength="1"
                      value={item.quantity}
                      readOnly
                    />
                    <button onClick={() => handleQuantityIncrement(index)}>
                      <AiOutlinePlusCircle />
                    </button>
                  </div>
                  <div className="h-full text-xl font-medium">
                    <h3>₹{item.offerPrice * item.quantity}</h3>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="block text-red-600 hover:scale-110 duration-150 ms-auto text-xl"
                  title="delete"
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
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
