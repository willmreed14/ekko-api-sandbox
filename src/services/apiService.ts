/* API Service - Handles HTTP requests using Axios */

import axios, { type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios';

export interface ApiRequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
}

export interface ApiResponse<T = unknown> {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: T;
  time: number;
}

/**
 * Makes an API request using the provided configuration
 * @param config The request configuration
 * @returns Promise with the API response
 */
export async function makeRequest<T = unknown>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
  const startTime = performance.now(); 

  try {
    // Convert ApiRequestConfig to AxiosRequestConfig
    const axiosConfig: AxiosRequestConfig = {
      url: config.url,
      method: config.method,
      headers: config.headers || {},
      data: config.method !== 'GET' ? config.body : undefined,
      params: config.method === 'GET' ? config.body : undefined,
    };

    // Make the request
    const response: AxiosResponse<T> = await axios(axiosConfig);

    const endTime = performance.now();

    // Format the response
    return {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as Record<string, string>,
      data: response.data,
      time: Math.round(endTime - startTime),
    };
  } catch (error) {
    const endTime = performance.now();

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<T>;

      if (axiosError.response) {
        // The request that was made and the server responded with a status code
        // that falls out of range of 2xx
        return {
          status: axiosError.response.status,
          statusText: axiosError.response.statusText,
          headers: axiosError.response.headers as Record<string, string>,
          data: axiosError.response.data as T,
          time: Math.round(endTime - startTime),
        };
      }
    }
    // Network error, timeout, etc.
    throw error;
  }
}
