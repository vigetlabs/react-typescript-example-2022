import { http } from 'features/http';

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export async function postLogin({ email, password }: LoginParams) {
  return http.post<LoginResponse>('/auth/login', { email, password });
}
