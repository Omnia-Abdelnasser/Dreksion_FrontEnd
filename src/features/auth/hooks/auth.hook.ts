

import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/features/auth/services/auth.services";

export const useRegister = () => {
  return useMutation({
     mutationFn: (data: FormData) => registerUser(data),
  });
};