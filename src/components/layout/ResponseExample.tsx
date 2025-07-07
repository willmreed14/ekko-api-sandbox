/*
Response Example Component
Displays JSON API response examples with proper styling
*/

import React from 'react';

interface ResponseExampleProps {
  code: string; // JSON response example
  title?: string; // Optional custom title
}

const ResponseExample: React.FC<ResponseExampleProps> = ({ code, title = 'Response' }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-6 mt-6">
      {/* Response header */}
      <div className="text-sm text-gray-400 mb-4">{title.toUpperCase()}</div>

      {/* JSON Response */}
      <div className="w-full">
        <div className="rounded-lg overflow-hidden bg-gray-800">
          <pre className="p-4 overflow-x-auto text-white">
            <code className="language-json font-mono text-sm">{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ResponseExample;
