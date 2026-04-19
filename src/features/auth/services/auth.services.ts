
import { api } from "@/lib/api";

export const registerUser = async (data: FormData) => {
  try {
    const res = await api.post("/auth/register", data);
    return res.data;
  } catch (err: any) {
    console.log("ERROR RESPONSE:", err.response?.data);
    throw err;
  }
};