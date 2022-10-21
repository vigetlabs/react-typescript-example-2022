import { ApiError } from './api-error';
import config from 'config';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const http = createClient(config.apiBaseUrl, config.apiRequestTimeout);

export function createClient(baseURL: string, timeout: number) {
  const client = axios.create({
    baseURL,
    timeout,
    headers: {
      'Content-type': 'application/json',
    },
  });

  client.interceptors.request.use(
    (request: AxiosRequestConfig) => {
      return request;
    },
    (error) => {
      return Promise.reject(ApiError.wrap(error));
    },
    { synchronous: true },
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.status === 200 && response.data) {
        /**
         * Unwrap ApiSuccess<T>
         *
         * { success: bool; data: T; } => T
         */
        return response.data?.data || response.data;
      }

      return response;
    },
    (error) => {
      return Promise.reject(ApiError.wrap(error));
    },
  );

  return client;
}
