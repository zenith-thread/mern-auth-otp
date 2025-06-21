import { useRef, useEffect, useState } from "react";

// assets
import { assets } from "../assets/assets";

// components
import Button from "../components/Button";

// React Router
import { useNavigate, Link } from "react-router";

// Helper Functions
import { formatTime } from "../helperFunctions/helperFunctions";

// custom hook
import { useAuth } from "../customHooks/useAuth";

// toast
import { toast } from "react-toastify";

const { logo } = assets;

const EmailVerify = () => {
  const inputRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(4 * 60 + 59); // 4 minutes 59 seconds
  const navigate = useNavigate();

  // OTP Countdown

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // OTP Input

  const inputHandler = (e, idx) => {
    if (e.target.value.length > 0 && idx < inputRefs.current.length - 1) {
      inputRefs.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && e.target.value === "" && idx > 0) {
      inputRefs.current[idx - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const paste = e.clipboardData.getData("text").slice(0, 6).split("");

    paste.forEach((char, idx) => {
      if (inputRefs.current[idx]) {
        inputRefs.current[idx].value = char;

        if (idx < inputRefs.current.length - 1) {
          inputRefs.current[idx + 1].focus();
        }
      }
    });
  };

  // Verify User

  const { verifyUser, verifyUserSuccess, verifyUserError } = useAuth();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const otp = inputRefs.current.map((e) => e.value).join("");
    verifyUser(otp);
  };

  useEffect(() => {
    if (verifyUserSuccess) {
      toast("Email Verified Successfully");
      navigate("/");
    }
    if (verifyUserError) {
      toast.error(verifyUserError);
    }
  }, [verifyUserSuccess, verifyUserError]);

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to purple-400">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="absolute left-5 sm:left-6 top-[25px] w-28 sm:w-32 cursor-pointer"
        />
      </Link>
      <form
        onSubmit={onSubmitHandler}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Verify Email
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6-digit code sent to your email id.
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <input
                type="text"
                maxLength="1"
                key={idx}
                required
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                ref={(e) => (inputRefs.current[idx] = e)}
                onInput={(e) => inputHandler(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              />
            ))}
        </div>
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="text-lg text-indigo-300">OTP Timeout:</span>
          <span className="text-white font-semibold text-xl">
            {formatTime(timeLeft)}
          </span>
        </div>
        {timeLeft <= 0 ? (
          <Button type="button" className={`form-btn`}>
            Request Another OTP
          </Button>
        ) : (
          <Button type="submit" className="form-btn">
            Verify Email
          </Button>
        )}
      </form>
    </div>
  );
};

export default EmailVerify;
