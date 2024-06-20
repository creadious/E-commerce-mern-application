import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
        <ScrollRestoration />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
