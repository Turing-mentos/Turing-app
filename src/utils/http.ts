import axios, {
  AxiosRequestConfig,
  RawAxiosResponseHeaders,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import {getStorage, removeStorage, setStorage} from './storage';
import {SERVER_URL} from '@env';
import {AuthAPI} from '../api/auth';

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

const getRefreshToken = async (): Promise<string | void> => {
  try {
    const response = await AuthAPI.reissueAccessToken();
    const {accessToken, refreshToken} = response.data;

    if (accessToken) {
      await setStorage('accessToken', accessToken);
    }

    if (refreshToken) {
      await setStorage('refreshToken', refreshToken);
    }

    return accessToken;
  } catch (err) {
    console.log('토큰 재발급 실패:', err);
    removeStorage('accessToken');
    removeStorage('refreshToken');
  }
};

axiosInstance.interceptors.response.use(
  res => res,
  async err => {
    const {
      config,
      response: {status},
    } = err;
    // console.log('err:', err);
    /** 1 */
    if (config.url === '/auth/reissue' || status !== 403 || config.sent) {
      return Promise.reject(err);
    }

    /** 2 */
    config.sent = true;
    const accessToken = await getRefreshToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return axios(config);
  },
);

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
