import { useRef, useState, useEffect } from "react";

export const useOtpInput = (length = 6, initialState = 4 * 60 + 59) => {
  const inputRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(initialState); // 5 minutes

  // Countdown timer
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Clean up on unmount
    return () => clearInterval(id);
  }, []);

  // Advance focus on input
  const handleInput = (e, idx) => {
    if (e.target.value && idx < length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  // Backspace to previous field
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !e.target.value && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  // Handle paste of up to the given length chars
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, length).split("");

    pasted.forEach((char, idx) => {
      if (inputRefs.current[idx]) {
        inputRefs.current[idx].value = char;

        if (idx < inputRefs.current.length - 1) {
          inputRefs.current[idx + 1].focus();
        }
      }
    });
  };

  // Get current OTP value as string stored in the pasted inputRefs.current
  const getOtpValueAsString = () =>
    inputRefs.current.map((char) => char?.value || "").join("");

  // Props to spread into each <input>
  const bindInput = (idx) => ({
    ref: (el) => (inputRefs.current[idx] = el),
    onInput: (e) => handleInput(e, idx),
    onKeyDown: (e) => handleKeyDown(e, idx),
    maxLength: 1,
  });

  return {
    timeLeft,
    bindInput,
    handlePaste,
    getOtpValueAsString,
  };
};
