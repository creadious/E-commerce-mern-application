import { BiLogOut } from "react-icons/bi";

import useUserInfo from "../../hook/useUserInfo";
import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";

const Dashboard = () => {
  const [userInfo] = useUserInfo();

  return (
    <section className="px-10">
      <div className="flex justify-between pb-2 pt-4">
        <h1 className="text-xl font-bold uppercase">Admin Panel</h1>
        <button className="flex items-center gap-1 bg-red-400 px-2 rounded-md text-white hover:bg-red-600">
          Logout <BiLogOut />
        </button>
      </div>
      <div className="grid grid-cols-4 h-screen py-2">
        <div className="col-span-1 pe-1">
          <ul className=" w-full text-white dashboard-Links">
            <li className="">
              <NavLink to={`/dashboard/home`} className="bg-red-400 w-full block p-1 ">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to={`/dashboard/add-product`} className="block bg-red-400 p-1">Add Product</NavLink>
            </li>
          </ul>
        </div>
        <div className="col-span-3 bg-red-100 px-2 py-1">
            <Outlet/>
        </div>
      </div>
      <ScrollRestoration />
    </section>
  );
};

export default Dashboard;
