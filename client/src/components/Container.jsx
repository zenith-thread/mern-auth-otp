import React from "react";

// React Router
import { Link } from "react-router";

// assets
import { assets } from "../assets/assets";

const { logo } = assets;

const Container = React.memo(({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="absolute left-5 sm:left-6 top-[25px] w-28 sm:w-32 cursor-pointer"
        />
      </Link>
      {children}
    </div>
  );
});

export default Container;
