import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Cart from "../Pages/Cart/Cart";
import Shop from "../Pages/Shop/Shop";
import Dashboard from "../Layout/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../Pages/DashboardPages/DashboardHome";
import AddProduct from "../Pages/DashboardPages/AddProduct";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import PlaceOrder from "../Pages/PlaceOrder/PlaceOrder";
import Payment from "../Pages/Payment/Payment";
import Order from "../Pages/Order/Order";
import OrderDetails from "../Pages/Order/OrderDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: "",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/item-details/:id",
        loader: ({ params }) =>
          fetch(
            `http://localhost:8000/api/v1/products/product-details?id=${params.id}`
          ),
        element: <ProductDetails />,
      },
      {
        path: "/place-order",
        element: (
          <PrivateRoute>
            <PlaceOrder />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        ),
      },
      {
        path: "/order-details",
        element: (
          <PrivateRoute>
            <OrderDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "home",
        element: <DashboardHome />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
