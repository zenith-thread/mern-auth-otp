import React, { useState } from "react";

// components
import Container from "./Container";
import FormInput from "./FormInput";
import Button from "./Button";

// custom hooks
import { useAuth } from "../customHooks/useAuth";
import { useResetPassword } from "../customHooks/useResetPassword";

// toast
import { toast } from "react-toastify";

const defaultFormInputs = {
  newPassword: "",
};

const NewPasswordPhaseForm = React.memo(({ icon }) => {
  // custom hooks
  const { resetPasswordLoading, resetPassword } = useAuth();
  const { otp, email, nextPhase } = useResetPassword();

  // form state
  const [formInputs, setFormInputs] = useState(defaultFormInputs);
  const { newPassword } = formInputs;

  // input handler
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };

  // Form Submission Handler
  const submitHandler = (e) => {
    e.preventDefault();

    resetPassword(email, newPassword, otp)
      .then(() => {
        toast.success("Password Changed Successfully");
        nextPhase();
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <Container>
      <form
        onSubmit={submitHandler}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          New Password
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter your new password below.
        </p>
        <FormInput
          icon={icon}
          alt="lock-icon"
          type="password"
          placeholder="New Password"
          name="newPassword"
          value={newPassword}
          onChangeHandler={onChangeHandler}
        />
        <Button
          loadingState={resetPasswordLoading}
          type="submit"
          className="form-btn"
        >
          {resetPasswordLoading ? "Submitting..." : "Change Password"}
        </Button>
      </form>
    </Container>
  );
});

export default NewPasswordPhaseForm;
