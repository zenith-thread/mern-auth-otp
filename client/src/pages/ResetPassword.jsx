// custom hook
import { useResetPassword } from "../customHooks/useResetPassword";

// components
import EmailPhaseForm from "../components/EmailPhaseForm";
import OtpComponent from "../components/OtpComponent";
import NewPasswordPhaseForm from "../components/NewPasswordPhaseForm";
import SuccessResetPassword from "../components/SuccessResetPassword";

// assets
import { assets } from "../assets/assets";

const { mail_icon, lock_icon } = assets;

const ResetPassword = () => {
  // custom Hook
  const {
    phaseFlags: { enterEmail, verifyOtp, newPasswordVal, done },
  } = useResetPassword();

  // Phase 1: submit email
  if (enterEmail) return <EmailPhaseForm icon={mail_icon} />;

  // Phase 2: enter OTP
  if (verifyOtp)
    return (
      <OtpComponent
        formHeading="Password Reset OTP"
        otpTimeoutTitle="Reset Time out"
        otpBtnTitle="Reset Password"
      />
    );
  // Phase 3: enter new password
  if (newPasswordVal) return <NewPasswordPhaseForm icon={lock_icon} />;

  console.log("DONE PHASE: ", done);
  if (done) return <SuccessResetPassword />;
};

export default ResetPassword;
