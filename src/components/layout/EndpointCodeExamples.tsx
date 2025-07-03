/* 
Endpoint Code Examples Component
Combines request and response examples.
*/

import React from 'react';
import CodeExampleBox from './CodeExampleBox';

interface EndpointCodeExamplesProps {
  httpMethod: string; // 'POST', 'GET', etc.
  endpoint: string; // e.g. /identity/start
  requestLanguage: string; // e.g. python
  requestExample: string; // Request code example
  responseExample: string; // Response JSON example
  requestTitle?: string; // Optional custom title for request
  responseTitle?: string; // Optional custom title for response
}

const EndpointCodeExamples: React.FC<EndpointCodeExamplesProps> = ({
  httpMethod,
  endpoint,
  requestLanguage,
  requestExample,
  responseExample,
  requestTitle = 'Request Example (Python)',
  responseTitle = 'Response Example',
}) => {
  return (
    <div className="space-y-6">
      {/* Endpoint and method header */}
      <div className="font-mono">
        <span
          className={`
          ${httpMethod === 'GET' ? 'text-green-400' : ''}
          ${httpMethod === 'POST' ? 'text-yellow-400' : ''}
          ${httpMethod === 'PUT' ? 'text-blue-400' : ''}
          ${httpMethod === 'DELETE' ? 'text-red-400' : ''}
        `}
        >
          {httpMethod}
        </span>
        <span className="text-white ml-2">{endpoint}</span>
      </div>

      {/* Request Example */}
      <CodeExampleBox language={requestLanguage} title={requestTitle} code={requestExample} />

      {/* Response Example */}
      <CodeExampleBox language="json" title={responseTitle} code={responseExample} />
    </div>
  );
};

export default EndpointCodeExamples;
