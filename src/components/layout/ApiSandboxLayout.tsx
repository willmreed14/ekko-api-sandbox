/* 
Two-Panel Side-by-Side Layout Component
Left Side: Request Panel
Right Side: Response Panel
*/

import { type FC } from 'react';

const ApiSandboxLayout: FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] bg-slate-900">
      {/* Request Panel (Left Side) */}
      <div className="w-full md:w-1/2 p-4 border-r border-slate-700 overflow-y-auto">
        <h2 className="text-lg font-medium text-white mb-4">Request</h2>
        <div className="bg-slate-800 rounded-lg p-4 shadow-md">
          {/* Request form will go here */}
          <p className="text-slate-300">Request form will be added here</p>
        </div>
      </div>

      {/* Response Panel (Right Side) */}
      <div className="w-full md:w-1/2 p-4 overflow-y-auto">
        <h2 className="text-lg font-medium text-white mb-4">Response</h2>
        <div className="bg-slate-800 rounded-lg p-4 shadow-md">
          {/* Response viewer will go here */}
          <p className="text-slate-300">Response data will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default ApiSandboxLayout;
