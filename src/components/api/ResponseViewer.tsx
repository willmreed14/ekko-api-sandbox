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
        {response.time && <span className="text-slate-400 text-xs">{response.time} ms</span>}
      </div>
      {/* Headers */}
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Headers</h3>
        <div className="bg-slate-700 rounded p-2 max-h-40 overflow-y-auto">
          {/* If headers, dynamically populate table */}
          {Object.entries(response.headers).length > 0 ? (
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(response.headers).map(([key, value]) => (
                  <tr key={key} className="border-b border-slate-600 last:border-0">
                    <td className="py-1 pr-4 text-slate-400 align-top">{key}</td>
                    <td className="py-1 text-white break-all">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-slate-400 text-xs">No headers</p>
          )}
        </div>
      </div>

      {/* Response Body */}
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Response</h3>
        <pre className="bg-slate-700 rounded p-3 overflow-x-auto text-sm text-white font-mono whitespace-pre-wrap max-h-96">
          {formatJson(response.data)}
        </pre>
      </div>
    </div>
  );
};

export default ResponseViewer;
