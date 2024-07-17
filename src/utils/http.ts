import axios, {
  AxiosRequestConfig,
  RawAxiosResponseHeaders,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import {getStorage} from './storage';
import {SERVER_URL} from '@env';

/**
 * @type T: Response data DTO
 * @type D: RequestDTO
 */
export interface APIResponse<T, D = any> {
  data?: T;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: InternalAxiosRequestConfig<D>;
  request?: any;
}

export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async config => {
  const accessToken = await getStorage('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

/**
 * @TODO response 인터셉터 생성 필요(토큰 만료 관련)
 */

function convertToResponseDTO<T>(response: AxiosResponse): APIResponse<T> {
  return {
    data: response.data,
    headers: response.headers,
    config: response.config,
    request: response.request,
  };
}

const http = {
  get: async <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<APIResponse<T>> => {
    const response = await axiosInstance.get(url, config);

    return convertToResponseDTO(response);
  },

  post: async <T>(
    url: string,
    requestBody?: any,
    config?: AxiosRequestConfig,
  ): Promise<APIResponse<T>> => {
    const response = await axiosInstance.post(url, requestBody, config);

    return convertToResponseDTO(response);
  },

  patch: async <T>(
    url: string,
    requestBody?: any,
    config?: AxiosRequestConfig,
  ): Promise<APIResponse<T>> => {
    const response = await axiosInstance.patch(url, requestBody, config);

    return convertToResponseDTO(response);
  },

  put: async <T>(
    url: string,
    requestBody?: any,
    config?: AxiosRequestConfig,
  ): Promise<APIResponse<T>> => {
    const response = await axiosInstance.put(url, requestBody, config);

    return convertToResponseDTO(response);
  },

  delete: async <T>(
    url: string,
    requestBody?: any,
  ): Promise<APIResponse<T>> => {
    const response = await axiosInstance.delete(url, requestBody);

    return convertToResponseDTO(response);
  },
};

export default http;
