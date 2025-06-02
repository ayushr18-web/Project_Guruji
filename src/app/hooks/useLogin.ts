// hooks/useLogin.ts
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { AuthAPI } from '../services/auth';
import { useUserStore } from '../store/userStore';

type LoginPayload = {
  email: string;
  password: string;
};

type User = {
  id: string;
  email: string;
  token: string;
  name: string;
};

export const useLogin = (): UseMutationResult<User, AxiosError, LoginPayload> => {
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await AuthAPI.login(payload); // axios call
      return data;
    },
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};
