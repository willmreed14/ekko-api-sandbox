/* 
Pre-filled API Sandbox Layout Component
A variant of ApiSandboxLayout that accepts pre-filled values
*/

import { type FC } from 'react';
import RequestForm from '../api/RequestForm';
import ResponseViewer from '../api/ResponseViewer';
import { useApiRequest } from '../../hooks/useApiRequest';
import { type ApiRequestConfig } from '../../services/apiService';

// Define props for pre-filled values
interface PrefilledApiSandboxProps {
  defaultUrl: string;
  defaultMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  defaultHeaders: { key: string; value: string }[];
  defaultBody: string;
}

const PrefilledApiSandbox: FC<PrefilledApiSandboxProps> = ({
  defaultUrl,
  defaultMethod,
  defaultHeaders,
  defaultBody,
}) => {
  // Use the custom hook for API requests
  const { makeApiRequest, data: response, error, isLoading } = useApiRequest();

  // Handle form submission
  const handleRequest = async (requestConfig: ApiRequestConfig) => {
    try {
      await makeApiRequest(requestConfig);
    } catch (error) {
      console.error('Request failed', error);
    }
  };

  return (
    <div className="w-full rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row bg-slate-900">
        {/* Request Panel (Left Side) */}
        <div className="w-full md:w-1/2 p-4 border-r border-slate-700">
          <h2 className="text-lg font-medium text-white mb-4">Request</h2>
          <div className="bg-slate-800 rounded-lg p-4 shadow-md">
            {/* Request Form with pre-filled values */}
            <RequestForm
              onSubmit={handleRequest}
              isLoading={isLoading}
              defaultUrl={defaultUrl}
              defaultMethod={defaultMethod}
              defaultHeaders={defaultHeaders}
              defaultBody={defaultBody}
            />
          </div>
        </div>

        {/* Response Panel (Right Side) */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-lg font-medium text-white mb-4">Response</h2>
          <div className="bg-slate-800 rounded-lg p-4 shadow-md">
            {/* Response Viewer */}
            <ResponseViewer response={response ?? null} error={error} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrefilledApiSandbox;
