import { ApiError } from './api-error';
import { config } from 'config';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const http = createClient(
  config.apiBaseUrlAuth,
  config.apiRequestTimeout,
);

export function createClient(
  baseURL: string,
  timeout: number,
  headers?: Record<string, string>,
) {
  const client = axios.create({
    baseURL,
    timeout,
    headers: {
      'Content-type': 'application/json',
      ...headers,
    },
    // validateStatus: (status) => {
    //   return status >= 200 && status < 400;
    // },
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
    { synchronous: true },
  );

  return client;
}
