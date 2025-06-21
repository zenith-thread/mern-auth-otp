import React from "react";

// React Router
import { useNavigate } from "react-router";

// custom hook
import { useResetPassword } from "../customHooks/useResetPassword";

// components
import Container from "./Container";
import Button from "./Button";

const SuccessResetPassword = React.memo(() => {
  const navigate = useNavigate();

  // custom hook
  const { nextPhase } = useResetPassword();

  const onClick = () => {
    nextPhase();
    navigate("/login");
  };

  return (
    <Container>
      <div className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-center text-white">
        <h1 className="text-2xl font-semibold mb-4">Password Changed!</h1>
        <p>Your password has been successfully reset.</p>
        <Button onClick={onClick} className="mt-6 form-btn">
          Go to Login
        </Button>
      </div>
    </Container>
  );
});

export default SuccessResetPassword;
