import React from "react";
import { Link } from "react-router-dom";
import Logo from "/assets/logo.svg";

const Navbar = () => {
  return (
    <nav className="shadow-lg">
      {/* Container */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Layout */}
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link to="/">
            <img src={Logo} alt="Nike Logo" className=" h-12 w-20" />
          </Link>

          {/* Admin button */}
          <Link to="/admin/products" className="btn btn-outline btn-warning">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
