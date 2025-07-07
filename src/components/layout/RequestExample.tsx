/*
Request Example Component
Displays API request code examples
*/

import React from 'react';

interface RequestExampleProps {
  httpMethod: string; // 'POST', 'GET', etc.
  endpoint: string; // ex. '/identity/start'
  language: string; // ex. 'python'
  code: string; // The actual code example
  title?: string; // Optional custom title
}

const RequestExample: React.FC<RequestExampleProps> = ({
  httpMethod,
  endpoint,
  language,
  code,
  title = 'Request Example', // default title
}) => {
  // Map HTTP methods to appropriate colors
  const methodColor =
    {
      GET: 'text-green-400',
      POST: 'text-yellow-400',
      PUT: 'text-blue-400',
      PATCH: 'text-blue-300',
      DELETE: 'text-red-400',
    }[httpMethod] || 'text-white';

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      {/* Endpoint and method header */}
      <div className="font-mono mb-4">
        <span className={methodColor}>{httpMethod}</span>
        <span className="text-white ml-2">{endpoint}</span>
      </div>

      {/* Code Example */}
      <div className="w-full">
        {title && <div className="text-sm text-gray-400 mb-2">{title.toUpperCase()}</div>}
        <div className="rounded-lg overflow-hidden bg-gray-800">
          <pre className="p-4 overflow-x-auto text-white">
            <code className={`language-${language} font-mono text-sm`}>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default RequestExample;
