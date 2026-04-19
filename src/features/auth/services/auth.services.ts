
import { api } from "@/lib/api";
{/*register*/}
export const registerUser = async (data: FormData) => {
  try {
    const res = await api.post("/auth/register", data);
    return res.data;
  } catch (err: any) {
    console.log("ERROR RESPONSE:", err.response?.data);
    throw err;
  }
};

// verify email
export const verifyEmail = async (data: { code: string , email: string }) => {
  const res = await api.post("/auth/verify-otp", data);
  return res.data;
};


