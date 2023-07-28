import { Platform } from 'react-native';

import axios, { AxiosResponse } from 'axios';

import { RN_BASE_URL_API } from '@env';

import { Callback } from '@typings/common';
import {
  AxiosErrorApplication,
  ParamsExampleMethodName,
  ResponseExampleMethodName,
} from '@typings/requests';

import { GetErrorResponse } from './responseService';

//export const URL_API: string = `${RN_BASE_URL_API}`;
export const URL_API: string = 'http://192.168.50.250:8080';
const replaceURL = (url: string) => {
  if (url.match(/localhost/) && Platform.OS === 'android') {
    return url.replace(/localhost/, '10.0.2.2');
  }

  return url;
};

export const api = axios.create({
  baseURL: replaceURL(URL_API),
});
export const api2 = axios.create({
  baseURL: 'https://api.ipify.org',
});
export const setAccessToken = async (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer Token token=${token}`;
};

export const setInterceptor = (signOutCallback: any) => {
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        return Promise.reject({
          ...error,
          callback: signOutCallback,
        });
      } else {
        return Promise.reject(error);
      }
    },
  );
};
export const getIPTestingPlain = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    if (response.status === 200) {
      console.log(` You have good: ${JSON.stringify(response.data)}`);
    } else {
      throw new Error('An error has occurred');
    }
  } catch (error) {
    console.log('An error has occurred ', error);
  }
};
export const getIPTestingOri = async (
  params: any,
): Promise<AxiosResponse<any, any>> => {
  try {
    const path = '?format=json';
    return await api2.get<any>(path);
  } catch (error) {
    const genericError = 'Unable to get orig IP , please try again later';

    const axiosError = error as AxiosErrorApplication;
    const callback: Callback | undefined = axiosError.callback;
    throw GetErrorResponse(axiosError, genericError, callback);
  }
};
export const exampleMethodName = async (
  params: ParamsExampleMethodName,
): Promise<AxiosResponse<ResponseExampleMethodName, any>> => {
  try {
    const path = '/path_url';
    return await api.post<ResponseExampleMethodName>(path, params);
  } catch (error) {
    const genericError = 'Unable to get data, please try again later';

    const axiosError = error as AxiosErrorApplication;
    const callback: Callback | undefined = axiosError.callback;
    throw GetErrorResponse(axiosError, genericError, callback);
  }
};

export const getuserDB = async (
  path: string,
): Promise<AxiosResponse<any, any>> => {
  try {
    return await api.get<any>(path);
  } catch (error) {
    const genericError = 'Unable to get data, please try again later';

    const axiosError = error as AxiosErrorApplication;
    const callback: Callback | undefined = axiosError.callback;
    throw GetErrorResponse(axiosError, genericError, callback);
  }
};
export const addUserDB = async (
  path: string,
  patams: any,
): Promise<AxiosResponse<any, any>> => {
  try {
    return await api.post<any>(path, patams);
  } catch (error) {
    const genericError = 'Unable to get data, please try again later';

    const axiosError = error as AxiosErrorApplication;
    const callback: Callback | undefined = axiosError.callback;
    throw GetErrorResponse(axiosError, genericError, callback);
  }
};
export const uploadBook = async (
  params: any,
): Promise<AxiosResponse<any, any>> => {
  try {
    const path = '/book/bookshelf';
    return await api.post<any>(path, params);
  } catch (error) {
    const genericError = 'Unable to post data, please try again later';

    const axiosError = error as AxiosErrorApplication;
    const callback: Callback | undefined = axiosError.callback;
    throw GetErrorResponse(axiosError, genericError, callback);
  }
};
export const getBook = async (
  path: string,
): Promise<AxiosResponse<any, any>> => {
  try {
    //const path = '/book/bookshelf';
    return await api.get<any>(path);
  } catch (error) {
    const genericError = 'Unable to get data, please try again later';

    const axiosError = error as AxiosErrorApplication;
    const callback: Callback | undefined = axiosError.callback;
    throw GetErrorResponse(axiosError, genericError, callback);
  }
};
export const deleteBook = async (
  path: string,
): Promise<AxiosResponse<any, any>> => {
  try {
    //const path = '/book/bookshelf';
    return await api.delete<any>(path);
  } catch (error) {
    const genericError = 'Unable to delete data, please try again later';

    const axiosError = error as AxiosErrorApplication;
    const callback: Callback | undefined = axiosError.callback;
    throw GetErrorResponse(axiosError, genericError, callback);
  }
};
export const getTheBookBase64 = async (
  path: string,
): Promise<AxiosResponse<any, any>> => {
  try {
    //const path = '/book/bookshelf';
    return await api.get<any>(path);
  } catch (error) {
    const genericError = 'Unable to get data, please try again later';

    const axiosError = error as AxiosErrorApplication;
    const callback: Callback | undefined = axiosError.callback;
    throw GetErrorResponse(axiosError, genericError, callback);
  }
};
export const transBook = async (
  params: any,
  path: string,
): Promise<AxiosResponse<any, any>> => {
  try {
    //const path = '/book/bookshelf';
    return await api.put<any>(path, params);
  } catch (error) {
    const genericError = 'Unable to put data, please try again later';

    const axiosError = error as AxiosErrorApplication;
    const callback: Callback | undefined = axiosError.callback;
    throw GetErrorResponse(axiosError, genericError, callback);
  }
};
export const submitComment = async (
  params: any,
): Promise<AxiosResponse<any, any>> => {
  try {
    const path = '/api/comment';
    return await api.post<any>(path, params);
  } catch (error) {
    const genericError = 'Unable to post commment, please try again later';

    const axiosError = error as AxiosErrorApplication;
    const callback: Callback | undefined = axiosError.callback;
    throw GetErrorResponse(axiosError, genericError, callback);
  }
};
export const askMomo = async (
  params: any,
): Promise<AxiosResponse<any, any>> => {
  try {
    const path = '/momov2';
    return await api.post<any>(path, params);
  } catch (error) {
    const genericError = 'Unable to post commment, please try again later';

    const axiosError = error as AxiosErrorApplication;
    const callback: Callback | undefined = axiosError.callback;
    throw GetErrorResponse(axiosError, genericError, callback);
  }
};
