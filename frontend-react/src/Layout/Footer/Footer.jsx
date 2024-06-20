import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagramSquare, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-200 md:py-8 py-4 px-2">
      <div className="xl:w-[1200px] mx-auto grid md:grid-cols-4 gap-3 justify-between">
        <div>
          <h2 className="md:text-3xl text-xl font-bold">ECOM</h2>
          <p className="font-thin text-xs">Trusted items available here.</p>
          <ul className=" mt-1">
            <li>1800 288 998</li>
            <li>creadious@ecom.com</li>
          </ul>
        </div>
        <div>
          <h4 className="md:text-xl text-lg font-medium">Links</h4>
          <ul className="text-sm md:mt-3 mt-1 md:space-y-1">
            <li>
              <Link to="#" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Shop
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h4 className="md:text-xl text-lg font-medium">Policy</h4>
          <ul className="text-sm md:mt-3 mt-1 md:space-y-1">
            <li>
              <Link to="#" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h4 className="md:text-xl text-lg font-medium">Socials</h4>
          <ul className="text-sm md:mt-3 mt-1 md:space-y-2 space-y-1 w-36">
            <li>
              <Link to="#" className="bg-blue-500 px-2 py-1 text-white rounded-sm flex items-center gap-1 justify-start">
                <FaFacebook /> Facebook
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="bg-orange-500 px-2 py-1 text-white rounded-sm flex items-center gap-1 justify-start"
              >
                <FaInstagramSquare /> Instagram
              </Link>
            </li>
            <li>
              <Link to="#" className="bg-red-500 px-2 py-1 text-white rounded-sm flex items-center gap-1 justify-start">
                <FaYoutube /> Youtube
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
