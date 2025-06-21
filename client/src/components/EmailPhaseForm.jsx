import { useState } from "react";

// toast
import { toast } from "react-toastify";

// components
import Container from "./Container";
import FormInput from "./FormInput";
import Button from "./Button";

// custom hooks
import { useAuth } from "../customHooks/useAuth";
import { useResetPassword } from "../customHooks/useResetPassword";

const defaultFormInputs = {
  email: "",
};

const EmailPhaseForm = ({ icon }) => {
  // custom hooks
  const { sendResetPasswordOtp, sendResetOtpLoading } = useAuth();
  const { nextPhase, setEmail } = useResetPassword();

  // Form State
  const [formInputs, setFormInputs] = useState(defaultFormInputs);
  const { email } = formInputs;

  // input handler
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormInputs({ ...formInputs, [name]: value });
  };

  // form submission handler
  const submitHandler = async (e) => {
    e.preventDefault();

    sendResetPasswordOtp(email)
      .then(() => {
        toast.success("OTP sent to your email");
        setEmail(email);
        nextPhase();
      })
      .catch((errMsg) => {
        toast.error(errMsg);
      });
  };

  return (
    <Container>
      <form
        onSubmit={submitHandler}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Reset Password
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter your registered email address.
        </p>
        <FormInput
          icon={icon}
          alt="mail-icon"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChangeHandler={onChangeHandler}
        />
        <Button
          loadingState={sendResetOtpLoading}
          type="submit"
          className="form-btn"
        >
          {sendResetOtpLoading ? "Submitting..." : "Submit Email"}
        </Button>
      </form>
    </Container>
  );
};

export default EmailPhaseForm;
