import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// assets
import { assets } from "../assets/assets";

// components
import Button from "./Button";
import FormInput from "./FormInput";

// custom component
import { useAuth } from "../customHooks/useAuth";

const defaultFormInputs = {
  name: "",
  email: "",
  password: "",
};

import { STATE_TYPES } from "../pages/Login";
import { toast } from "react-toastify";

const { person_icon, mail_icon, lock_icon } = assets;

const Form = ({ state, changeStateType }) => {
  // Form State
  const [formInputs, setFormInputs] = useState(defaultFormInputs);
  const { name, email, password } = formInputs;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormInputs({ ...formInputs, [name]: value });
  };

  // Navigation
  const navigate = useNavigate();
  const forgotPasswordHandler = () => navigate("/reset-password");

  // Register user in firebase on form submit
  const {
    isLoggedIn,
    registerSuccess,
    registerError,
    loginSuccess,
    loginError,
    errMessage,
    register,
    login,
  } = useAuth();

  useEffect(() => {
    if ((registerSuccess && isLoggedIn) || (loginSuccess && isLoggedIn)) {
      setFormInputs(defaultFormInputs);
      navigate("/");
    }
    console.log("LOGIN ERROR FOR TOAST: ", loginError);
    if (registerError) {
      toast.error(errMessage);
    }
    if (loginError) {
      toast.error(errMessage);
    }
  }, [registerSuccess, registerError, loginSuccess, loginError, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("▶️ submitting formInputs:", formInputs);
    if (state === STATE_TYPES.sign_up) {
      register(name, email, password);
    } else {
      login(email, password);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        {state === STATE_TYPES.sign_up && (
          <FormInput
            icon={person_icon}
            alt="person-icon"
            type="text"
            placeholder="Full Name"
            name="name"
            value={name}
            onChangeHandler={onChangeHandler}
          />
        )}

        <FormInput
          icon={mail_icon}
          alt="mail-icon"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChangeHandler={onChangeHandler}
        />
        <FormInput
          icon={lock_icon}
          alt="lock-icon"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChangeHandler={onChangeHandler}
        />
        {state === STATE_TYPES.log_in && (
          <p
            onClick={forgotPasswordHandler}
            className="mb-4 cursor-pointer hover:text-indigo-500"
          >
            Forgot Password?
          </p>
        )}

        <Button type="submit" className="form-btn">
          {state}
        </Button>
      </form>

      {state === STATE_TYPES.sign_up ? (
        <p className="text-gray-400 text-center text-s mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => changeStateType(STATE_TYPES.log_in)}
          >
            Login here
          </span>
        </p>
      ) : (
        <p className="text-gray-400 text-center text-s mt-4">
          Don't have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => changeStateType(STATE_TYPES.sign_up)}
          >
            Sign up
          </span>
        </p>
      )}
    </>
  );
};

export default Form;
