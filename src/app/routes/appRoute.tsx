import { Route, Routes } from "react-router-dom";
import LoginForm from "../../features/auth/components/login";
import RegisterForm from "@/features/auth/components/register";
import ForgetPasswordForm from "@/features/auth/components/forgetPwd";
import ResetPasswordForm from "@/features/auth/components/reset_Pwd";
import Home from "../pages/home";
import ConfirmEmailForm from "@/features/auth/components/confirmEmail";
const AppRoute = () => {
  return (
  
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/forget_Pwd" element={<ForgetPasswordForm />} />
      <Route path="/reset_Pwd" element={<ResetPasswordForm />} />
      <Route path="/confirm_email" element={<ConfirmEmailForm />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRoute;