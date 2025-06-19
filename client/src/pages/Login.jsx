import { lazy, useState } from "react";

// assets
import { assets } from "../assets/assets";

// React Router
import { Link } from "react-router";

// components
const Form = lazy(() => import("../components/Form"));

const { logo } = assets;

export const STATE_TYPES = {
  sign_up: "Sign Up",
  log_in: "Log In",
};

const Login = () => {
  const [state, setState] = useState(STATE_TYPES.sign_up);

  const changeStateType = (stateType) => {
    setState(stateType);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to purple-400">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="absolute left-5 sm:left-6 top-[25px] w-28 sm:w-32 cursor-pointer"
        />
      </Link>
      <div className="flex flex-col gap-3 bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center">
          {state === STATE_TYPES.sign_up ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === STATE_TYPES.sign_up
            ? "Create your account"
            : "Login to your account!"}
        </p>

        <Form state={state} changeStateType={changeStateType} />
      </div>
    </div>
  );
};

export default Login;
