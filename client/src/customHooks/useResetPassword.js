import { useDispatch, useSelector } from "react-redux";

// selectors
import {
  selectOtp,
  selectEmail,
  selectEnterEmailPhase,
  selectResetOtpPhase,
  selectNewPasswordPhase,
  selectDonePhase,
} from "../store/reset-password/resetPassword.selector";

import {
  setOtp,
  setEmailToReset,
  toggleResetOtp,
  toggleNewPassword,
  passwordChanged,
  toggleEnterEmailPhase,
} from "../store/reset-password/resetPassword.reducer";

export const useResetPassword = () => {
  const dispatch = useDispatch();

  const otpVal = useSelector(selectOtp);
  const emailVal = useSelector(selectEmail);
  const enterEmailPhaseVal = useSelector(selectEnterEmailPhase);
  const resetOtpPhaseVal = useSelector(selectResetOtpPhase);
  const newPasswordPhaseVal = useSelector(selectNewPasswordPhase);
  const donePhaseVal = useSelector(selectDonePhase);

  // Dispatch actions
  const setOtpToStore = (otp) => dispatch(setOtp(otp));
  const setEmailToResetToStore = (email) => dispatch(setEmailToReset(email));

  const nextPhase = () => {
    if (enterEmailPhaseVal) dispatch(toggleResetOtp());
    else if (resetOtpPhaseVal) dispatch(toggleNewPassword());
    else if (newPasswordPhaseVal) dispatch(passwordChanged());
    else if (donePhaseVal) dispatch(toggleEnterEmailPhase());
  };

  return {
    otp: otpVal,
    email: emailVal,

    phaseFlags: {
      enterEmail: enterEmailPhaseVal,
      verifyOtp: resetOtpPhaseVal,
      newPasswordVal: newPasswordPhaseVal,
      done: donePhaseVal,
    },

    setOtp: setOtpToStore,
    setEmail: setEmailToResetToStore,

    nextPhase,
  };
};
