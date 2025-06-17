/* Response Viewer Component */

import { type FC } from 'react';

// Define response data structure
interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  time?: number; // Response time in ms
}

// Define props data structure
interface ResponseViewerProps {
  response: ResponseData | null;
  error: Error | null;
  isLoading: boolean;
}

const ResponseViewer: FC<ResponseViewerProps> = ({ response, error, isLoading }) => {
  // Helper to format JSON
  const formatJson = (data: any): string => {
    try {
      return JSON.stringify(data, null, 2);
    } catch (error) {
      return 'Error formatting JSON data';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-pulse text-blue-500">Loading response...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-red-500">
        <h3 className="font-medium mb-2">Error</h3>
        <p className="font-mono text-sm">{error.message}</p>
      </div>
    );
  }

  // No response yet
  if (!response) {
    return (
      <div className="text-slate-400 text-center py-8">Send a request to see the response here</div>
    );
  }

  // Response State
  return (
    <div className="space-y-4">
      {/* Status and Timing Info */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          {/* Dynamic status code styling */}
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-medium
              ${
                response.status >= 200 && response.status < 300
                  ? 'bg-green-900/30 text-green-500'
                  : response.status >= 400
                    ? 'bg-red-900/30 text-red-500'
                    : 'bg-yellow-900/30 text-yellow-500'
              }`}
          >
            {response.status}
          </span>
          <span className="text-white font-medium">{response.statusText}</span>
        </div>
      </div>
    </div>
  );
};

export default ResponseViewer;
