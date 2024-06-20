import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { CartProvider } from "../../provider/CartContext";

const Main = () => {
  return (
    <div>
      <CartProvider>
        <Navbar />
        <div className="min-h-screen">
          <Outlet />
          <ScrollRestoration />
        </div>
        <Footer />
      </CartProvider>
    </div>
  );
};

export default Main;
