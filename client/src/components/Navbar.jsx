import { useEffect, useState } from "react";

// assets
import { assets } from "../assets/assets";

// React Router
import { Link, useNavigate } from "react-router";

// components
import Button from "./Button";

// custom hook
import { useAuth } from "../customHooks/useAuth";

const { logo, arrow_icon } = assets;

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const {
    isLoggedIn,
    currentUser,
    sendVerifyOtpSuccess,
    sendVerifyOtpError,
    logout,
    sendVerificationOtp,
  } = useAuth();

  // useEffect(() => {
  //   if (status === statusTypes.failed) {
  //     toast.error(error);
  //   }
  // }, [status, error]);

  const verificationHandler = () => {
    sendVerificationOtp();
    navigate("/email-verify");
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-6  absolute top-0">
      <img src={logo} alt="logo" className="w-28 sm:w-32" />

      {isLoggedIn ? (
        <div className="relative">
          <div
            onClick={toggleDropdown}
            className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white cursor-pointer"
          >
            {currentUser.name[0].toUpperCase()}
          </div>

          {dropdown && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-xl z-10 text-black w-40">
              <ul className="flex flex-col items-center py-2 ">
                {!currentUser.isAccountVerified && (
                  <li
                    onClick={verificationHandler}
                    className="px-4 py-2 hover:bg-gray-100 rounded-xl cursor-pointer w-36"
                  >
                    Verify Email
                  </li>
                )}

                <li
                  onClick={logout}
                  className="px-4 py-2 hover:bg-gray-100 rounded-xl cursor-pointer w-36"
                >
                  Log out
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login">
          <Button className="btn">
            <span>Login</span>
            <img src={arrow_icon} alt="arrow-icon" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
