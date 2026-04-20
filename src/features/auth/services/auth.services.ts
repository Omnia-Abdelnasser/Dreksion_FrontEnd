import { api } from '@/shared/lib/api';
import { LoginValues } from "../types/auth.type"; // Ensure the path matches your folder structure
{
   /*register*/
}
export const registerUser = async (data: FormData) => {
   try {
      const res = await api.post('/auth/register', data);
      return res.data;
   } catch (err: any) {
      console.log('ERROR RESPONSE:', err.response?.data);
      throw err;
   }
};

// verify email
export const verifyEmail = async (data: { otp: string; email: string }) => {
   const res = await api.post('/auth/verify-otp', data);
   console.log('OTP verification response:', res.data);
   return res.data;
};

//resend otp
export const resendOTP = (email: string) => {
   return api.post('/auth/resend-otp', { email });
};

// login user
export const loginUser = async (data: LoginValues) => {
   try {
      const res = await api.post('/auth/login', data);
      return res.data;
   } catch (err: any) {
      console.log('LOGIN ERROR:', err.response?.data);
      throw err;
   }
};
