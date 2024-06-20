import { Link } from "react-router-dom";

const ProductCard1 = ({ data }) => {
  const {
    _id,
    name,
    description,
    offerPrice,
    actualPrice,
    stock,
    sizes,
    productImage,
  } = data;

  return (
    <div className="p-2 bg-slate-100 rounded-md shadow-md">
      <span className="bg-red-400 text-white px-2 py-1 text-xs rounded-full">
        New Arrival
      </span>
      <img
        src={productImage}
        alt="product image"
        className="h-60 w-full mt-4 rounded-md object-cover object-top"
      />
      <div className="mt-2 h-full">
        <div>
          <h2 className="text-lg font-medium">
            {name.length > 20 ? name.slice(0, 23) + "..." : name}
          </h2>
          <p className="text-sm mt-1 text-slate-600">
            {description.length > 50
              ? description.slice(0, 50) + "..."
              : description}
          </p>
          <div className="py-2 flex gap-2 items-end">
            <p className="text-lg">
              <span className="font-bold">₹</span>
              {offerPrice}
            </p>
            <p className="text-lg line-through font-thin">
              <span className="font-bold">₹</span>
              {actualPrice}
            </p>
          </div>
          <p className="mb-2 text-sm font-medium text-red-600">
            Stock left : {stock}
          </p>
        </div>
        <div className=" flex flex-col xl:flex-row justify-center gap-2">
          <Link
            to={`/item-details/${_id}`}
            className="border border-black px-2 py-1 rounded-md hover:bg-black text-center hover:text-white w-full"
          >
            View Details
          </Link>
          {/* <Link
            to="#"
            className="border border-black bg-black text-white px-2 py-1 rounded-md hover:bg-white hover:text-black w-full flex justify-center items-center gap-2"
          >
            Add Cart <i className="fa-solid fa-cart-shopping text-xs -mb-1"></i>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard1;
