import React from "react";

// toast
import { toast } from "react-toastify";

// custom hook
import { useResetPassword } from "../customHooks/useResetPassword";
import { useOtpInput } from "../customHooks/useOtpInput";

// components
import Container from "./Container";
import Button from "./Button";

// Helper Functions
import { formatTime } from "../helperFunctions/helperFunctions";
import { useAuth } from "../customHooks/useAuth";

const OtpComponent = React.memo(
  ({ formHeading, otpTimeoutTitle, otpBtnTitle }) => {
    // custom hook
    const { email, setOtp, nextPhase } = useResetPassword();
    const { verifyResetOtpLoading, verifyResetOtp } = useAuth();
    const { timeLeft, bindInput, handlePaste, getOtpValueAsString } =
      useOtpInput(6);

    const onSubmitHandler = (e) => {
      e.preventDefault();

      const otp = getOtpValueAsString();

      verifyResetOtp(email, otp)
        .then(() => {
          toast.success("OTP Verified Successfully");
          setOtp(otp);
          nextPhase();
        })
        .catch((err) => {
          toast.error("Invalid OTP");
        });
    };
    return (
      <Container>
        <form
          onSubmit={onSubmitHandler}
          onPaste={handlePaste}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            {formHeading}
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the 6-digit code sent to your email id.
          </p>
          <div className="flex justify-between mb-8">
            {Array(6)
              .fill(0)
              .map((_, idx) => (
                <input
                  key={idx}
                  type="text"
                  required
                  className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                  {...bindInput(idx)}
                />
              ))}
          </div>
          <div className="mb-8 flex items-center justify-center gap-3">
            <span className="text-lg text-indigo-300">{otpTimeoutTitle}:</span>
            <span className="text-white font-semibold text-xl">
              {formatTime(timeLeft)}
            </span>
          </div>
          <Button
            loadingState={verifyResetOtpLoading}
            type="submit"
            className="form-btn"
          >
            {verifyResetOtpLoading ? "Submitting..." : otpBtnTitle}
          </Button>
        </form>
      </Container>
    );
  }
);

export default OtpComponent;
