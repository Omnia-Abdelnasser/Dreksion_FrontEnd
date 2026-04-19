

import { api } from "@/lib/api";

export const registerUser = async (formData: FormData) => {
  const res = await api.post("/auth/register", formData);
  return res.data;
};