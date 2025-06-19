// assets
import { assets } from "../assets/assets";

// components
import Button from "./Button";

const { logo, arrow_icon } = assets;

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm: px-24 absolute top-0">
      <img src={logo} alt="logo" className="w-28 sm:w-32" />
      <Button>
        <span>Login</span>
        <img src={arrow_icon} alt="arrow-icon" />
      </Button>
    </div>
  );
};

export default Navbar;
