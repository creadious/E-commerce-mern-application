import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useState } from "react";
import toast from "react-hot-toast";
import { addToCart } from "../../utils/cartUtils";

const ProductDetails = () => {

  const data = useLoaderData();
  const {
    _id,
    name,
    description,
    offerPrice,
    actualPrice,
    stock,
    sizes,
    productImage,
  } = data?.data;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleQuantityIncrement = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  const handleQuantityDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const handleOrderNow = () => {
    if (!selectedSize) {
      toast.error("Please select a size before ordering.");
      return;
    }

    const success = addToCart(_id, quantity, selectedSize);
    if (success) {
      // Optional: You can trigger a custom event or use a state management solution to update the navbar cart
      console.log(success)
    }
  };

  return (
    <div className="xl:w-[1200px] md:mt-28 pb-10 mt-16 mx-auto">
      <div>
        <Link
          to={`/shop`}
          className="uppercase text-xs px-4 py-2 bg-red-300 font-medium rounded-sm"
        >
          <IoIosArrowBack className="inline-block mb-[3px]" />
          Back to shop
        </Link>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 min-h-screen">
        <div className="md:h-[35rem]">
          <img
            src={productImage}
            alt="product image"
            className="object-contain p-3 h-full w-full rounded-sm"
          />
        </div>
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-sm text-slate-600">{description}</p>
          <div className="mt-5 space-y-5">
            <p className="text-red-600 font-medium">Stocks left: {stock}</p>
            <div className="py-2 flex gap-2 items-end text-xl">
              <p className="text-2xl">
                <span className="font-bold">₹</span>
                {offerPrice}
              </p>
              <p className="line-through font-thin">
                <span className="font-bold">₹</span>
                {actualPrice}
              </p>
              <p className="text-lg font-medium text-green-600">
                {100 - Math.round((offerPrice / actualPrice) * 100)}% off
              </p>
            </div>
            <div>
              <h4 className="mb-1">Sizes:</h4>
              <div className="flex gap-2">
                {sizes?.map((value) => (
                  <button
                    key={value}
                    onClick={() => handleSizeSelection(value)}
                    className={`px-2 py-1 rounded-sm hover:bg-slate-400 ${
                      selectedSize === value
                        ? "bg-slate-500 text-white"
                        : "bg-slate-300"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-2">Quantity:</h4>
              <div className="flex items-center gap-1">
                <button onClick={handleQuantityDecrement}>
                  <AiOutlineMinusCircle className="text-2xl" />
                </button>
                <input
                  type="number"
                  className="bg-slate-200 w-8 text-center font-medium outline outline-1"
                  minLength={1}
                  value={quantity}
                  readOnly
                />
                <button onClick={handleQuantityIncrement}>
                  <AiOutlinePlusCircle className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <button
              onClick={handleOrderNow}
              className="bg-yellow-300 font-medium px-5 py-2 text-xl hover:bg-yellow-500 duration-200"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
