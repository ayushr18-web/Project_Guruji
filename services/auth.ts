import { API } from '../lib/api';

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

export const AuthAPI = {
  login: (payload: LoginPayload) => {
    return API.login(payload);
  },
};
