/* 
Two-Panel Side-by-Side Layout Component
Left Side: Request Panel
Right Side: Response Panel
*/

import { type FC, useState } from 'react';
import RequestForm from '../api/RequestForm';
import ResponseViewer from '../api/ResponseViewer';

const ApiSandboxLayout: FC = () => {
  // For now, create mock states for the ResponseViewer
  // Later, connect this to teh actual API responses.
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] bg-slate-900">
      {/* Request Panel (Left Side) */}
      <div className="w-full md:w-1/2 p-4 border-r border-slate-700 overflow-y-auto">
        <h2 className="text-lg font-medium text-white mb-4">Request</h2>
        <div className="bg-slate-800 rounded-lg p-4 shadow-md">
          {/* Request Form */}
          <RequestForm />
        </div>
      </div>

      {/* Response Panel (Right Side) */}
      <div className="w-full md:w-1/2 p-4 overflow-y-auto">
        <h2 className="text-lg font-medium text-white mb-4">Response</h2>
        <div className="bg-slate-800 rounded-lg p-4 shadow-md">
          {/* Response Viewer */}
          <ResponseViewer response={response} error={error} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ApiSandboxLayout;
