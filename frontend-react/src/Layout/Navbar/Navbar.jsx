import { Link, useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { TbMenuDeep } from "react-icons/tb";
import useAuth from "../../hook/useAuth";
import toast from "react-hot-toast";
import LoadingSpin from "../../components/LoadingSpin";
import useCartItems from "../../hook/useCartItems";
import { useState } from "react";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut().then(() => {
      toast.success("Logout successful");
      localStorage.removeItem("access-token")
      navigate("/");
    });
  };

  return (
    <header className="fixed w-full z-50 transition-transform duration-300 transform top-0 bg-white px-2 py-4">
      <div className="w-full flex items-center justify-between md:py-4 xl:w-[1200px] mx-auto">
        <h1 className="md:text-4xl text-2xl font-bold">
          <Link to="/">ECOM</Link>
        </h1>
        <div className="md:hidden">
          <button>
            <TbMenuDeep />
          </button>
        </div>
        <ul className="md:text-lg md:flex items-center md:gap-8 gap-5 hidden">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="nav-link">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
          <li>
            {user ? (
              <CartBody />
            ) : (
              <Link to="./cart" className="relative md:text-xl" title="Cart">
                <FaShoppingCart />
                <span className="text-xs absolute bg-red-400 w-4 h-4 text-center rounded-full -top-1 -right-2 text-white font-medium">
                  0
                </span>
              </Link>
            )}
          </li>
          <li className="relative user-icon cursor-pointer">
            {loading ? (
              <LoadingSpin />
            ) : user ? (
              <>
                <BsFillPersonFill className="text-xl" />
                <ul className="user-dropdown text-sm">
                  <li>
                    <Link to="/profile" className="nav-link">
                      {user?.displayName}
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className="nav-link">
                      Order
                    </Link>
                  </li>
                  <li>
                    <span onClick={handleLogout} className="nav-link">
                      Logout
                    </span>
                  </li>
                </ul>
              </>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 bg-red-500 rounded-sm text-sm text-white"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

const CartBody = () => {
  const [cartItems] = useCartItems();
console.log(cartItems)
  return (
    <Link to="./cart" className="relative md:text-xl" title="Cart">
      <FaShoppingCart />
      <span className="text-xs absolute bg-red-400 w-4 h-4 text-center rounded-full -top-1 -right-2 text-white font-medium">
        {cartItems?.length}
      </span>
    </Link>
  );
};

export default Navbar;
