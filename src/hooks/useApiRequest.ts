/* 
Custom hook for API requests using React Query 
  - Uses React Query's useMutation under the hood
  - Provides clean interface to make API calls and track their state
*/

import { useMutation } from '@tanstack/react-query';
import { type ApiRequestConfig, type ApiResponse, makeRequest } from '../services/apiService';

interface UseApiRequestResult<T = unknown> {
  makeApiRequest: (config: ApiRequestConfig) => Promise<ApiResponse<T>>;
  data: ApiResponse<T> | undefined;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
}

/**
 * Custom hook to make API requests using React Query
 * @returns An object containing makeApiRequest function and request state
 */

export function useApiRequest<T = unknown>(): UseApiRequestResult<T> {
  const {
    mutateAsync: makeApiRequest,
    data,
    error,
    isPending: isLoading,
    isError,
  } = useMutation<ApiResponse<T>, Error, ApiRequestConfig>({
    mutationFn: makeRequest<T>,
  });

  return {
    makeApiRequest,
    data,
    error,
    isLoading,
    isError,
  };
}
