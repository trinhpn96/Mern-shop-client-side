import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const Home = () => {
  return (
    <div className="bg-baner bg-cover">
      {/* Layer */}
      <div className=" bg-gradient-to-r from-black/60 to-black/0">
        {/* Container */}
        <div className=" max-w-screen-xl mx-auto px-4">
          {/* Layout */}
          <div className="flex justify-center items-center lg:justify-start h-banner">
            {/* Contain Box */}
            <div className="text-white opacity-8 text-center lg:text-left mx-5">
              <div className="mb-6">
                <h1 className="font-bold text-4xl lg:text-6xl mb-4">
                  Technology for your convenience
                </h1>
                <p className=" text-lg lg:text-2xl">
                  For your job, study or housework, everything you need is here
                </p>
              </div>

              {/* Shop button */}
              <Link to="/products" className="btn glass btn-md">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
