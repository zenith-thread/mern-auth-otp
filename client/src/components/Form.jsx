import { useState } from "react";

// assets
import { assets } from "../assets/assets";

// components
import Button from "./Button";
import FormInput from "./FormInput";

const defaultFormInputs = {
  full_name: "",
  email: "",
  password: "",
};

import { STATE_TYPES } from "../pages/Login";

const { person_icon, mail_icon, lock_icon } = assets;

const Form = ({ state, changeStateType }) => {
  const [formInputs, setFormInputs] = useState(defaultFormInputs);

  const { full_name, email, password } = formInputs;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormInputs({ ...formInputs, [name]: value });
  };
  return (
    <>
      <form>
        {state === STATE_TYPES.sign_up && (
          <FormInput
            icon={person_icon}
            alt="person-icon"
            type="text"
            placeholder="Full Name"
            name="full_name"
            value={full_name}
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
          <p className="mb-4 cursor-pointer hover:text-indigo-500">
            Forgot Password?
          </p>
        )}

        <Button className="form-btn">{state}</Button>
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
