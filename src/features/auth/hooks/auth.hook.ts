

import { useMutation } from "@tanstack/react-query";
import { registerUser, resendOTP, verifyEmail } from "@/features/auth/services/auth.services";

export const useRegister = () => {
  return useMutation({
     mutationFn: (data: FormData) => registerUser(data),
  });
};

// verify email
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
  });
};

// resend otp

export const useResendOTP = () => {
  return useMutation({
    mutationFn: (email: string) => resendOTP(email),
  });
};