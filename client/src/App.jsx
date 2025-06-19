import { Suspense, lazy } from "react";

// React Router
import { Routes, Route } from "react-router";

// Pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const EmailVerify = lazy(() => import("./pages/EmailVerify"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
import Loading from "./pages/Loading";

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Suspense>
  );
};

export default App;
