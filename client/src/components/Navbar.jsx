// assets
import { assets } from "../assets/assets";

// React Router
import { Link } from "react-router";

// components
import Button from "./Button";

const { logo, arrow_icon } = assets;

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-6  absolute top-0">
      <img src={logo} alt="logo" className="w-28 sm:w-32" />

      <Link to="/login">
        <Button className="btn">
          <span>Login</span>
          <img src={arrow_icon} alt="arrow-icon" />
        </Button>
      </Link>
    </div>
  );
};

export default Navbar;
