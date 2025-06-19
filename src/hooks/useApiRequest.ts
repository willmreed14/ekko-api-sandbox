/* Custom hook for API requests using React Query */

import { useMutation } from '@tanstack/react-query';
import { ApiRequestConfig, ApiResponse, makeRequest } from '../services/apiService';

interface UseApiRequestResult<T = unknown> {
  makeApiRequest: (config: ApiRequestConfig) => Promise<ApiResponse<T>>;
  data: ApiResponse<T> | undefined;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
}