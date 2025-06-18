/* API Service - Handles HTTP requests using Axios */

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

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
