import { MdDelete } from "react-icons/md";

const Cart = () => {
  return (
    <main className="md:mt-28 mt-16 md:px-0 px-2 min-h-screen xl:w-[1200px] mx-auto pb-8">
      <div className="mb-4 flex items-center">
        <a
          href="./shop.html"
          className="font-medium px-3 py-2 bg-red-500 text-sm rounded-md text-white"
        >
          <i className="fa-solid fa-angles-left text-xs"></i> Continue Shopping
        </a>
      </div>
      <section className="grid md:grid-cols-3 grid-cols-1 gap-5">
        <div className="md:col-span-2 space-y-3" id="cartItems">
          <div className="">
            <div className="flex gap-2">
              <img
                src={
                  "https://www.biba.in/dw/image/v2/BKQK_PRD/on/demandware.static/-/Sites-biba-product-catalog/default/dw68719691/images/ss24/ribayat2344ss24skblu_1.jpg"
                }
                alt="product image"
                className="h-20 w-20 object-cover object-top p-1 bg-white rounded-md"
              />
              <div>
                <h1 className="md:text-xl font-bold">{`SKY BLUE VISCOSE TIERED DRESS`}</h1>
                <div className="flex gap-2 text-lg items-center">
                  <p className="line-through text-sm">₹{1500}</p>
                  <p className="font-medium">₹{1000}</p>
                  <p id="discount" className="text-xs font-medium text-green-700">
                    {50}% off
                  </p>
                </div>
                <button
                  className="md:block hidden text-red-600 hover:scale-110 duration-150"
                  title="delete"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <div className="pe-2 flex gap-5">
              <button
                className="md:hidden text-red-600 hover:scale-110 duration-150"
                title="delete"
              >
                <MdDelete/>
              </button>
              <div className="flex items-center gap-2">
                <button onClick="decreaseQuantity(${index})">
                  <i className="fa-solid fa-minus"></i>
                </button>
                <input
                  type="number"
                  id="quantityInput-${
                  product.id
                }"
                  className="w-6 text-center font-medium"
                  minLength="1"
                  value={1}
                  readOnly
                />
                <button onClick="increaseQuantity(${index})">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
              <div className="flex items-center h-full text-xl font-medium">
                <h3
                  id="productTotalPrice-${
                  product.id
                }"
                >
                  ₹{1000}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="p-5 bg-slate-200">
            <h3 className="text-center uppercase font-bold text-slate-600 text-lg">
              Price Details
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 font-semibold">
              <p>Total items:</p>{" "}
              <p className="text-right" id="total-items"></p>
              <p>Price:</p>{" "}
              <p className="text-right" id="total-original-price"></p>
              <p className="text-green-800">Discount:</p>{" "}
              <p className="text-right text-green-800" id="total-discount">
                -₹1000
              </p>
              <p>Shipping charge:</p>
              <p className="text-right">₹0</p>
            </div>
            <h2 className="mt-5 pt-5 border-t border-black flex justify-between text-xl text-slate-700 font-bold">
              Total Amount: <span id="net-amount">₹1500</span>
            </h2>
            <a
              href="./placeOrder.html"
              className="mt-5 block p-2 text-center bg-red-300 font-medium hover:bg-red-500 duration-200"
            >
              Place order
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;
