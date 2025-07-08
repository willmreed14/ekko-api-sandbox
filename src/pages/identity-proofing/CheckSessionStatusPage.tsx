/*
Documentation Page
Check ID Proofing Session Status
*/

import { API_BASE_URL } from '../../config/env';
import RequestExample from '../../components/layout/RequestExample';
import ResponseExample from '../../components/layout/ResponseExample';

const CheckSessionStatusPage = () => {
  // Define pre-filled request example (Python, for now)
  const pythonRequestExample = `import requests

url = "${API_BASE_URL}/identity/{SESSION_ID_HERE}/status"
response = requests.get(url, json=None, headers=None)
print(response.json())`;

  // Define example JSON response
  const jsonResponseExample = `{
  "session_id": "abc123",
  "status": "pending",
  "provider": "idme",
  "timestamp": 2025-06-18T13:42:00Z"
}`;

  return (
    <div
      id="check-session-status"
      className="flex flex-col space-y-8 mb-10 pt-8 border-t border-solid border-gray-700"
    >
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
        {/* Left side: Documentation */}
        <div className="w-full md:w-1/2">
          {/* Overview Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Check Session Status</h2>
            <p className="mb-4">
              Returns the current status of identity proofing session (pending, success, failed).
            </p>
          </div>
        </div>

        {/* Right side: Code Examples */}
        <div className="w-full md:w-1/2 md:flex md:flex-col md:items-end">
          <div className="w-[500px]">
            {/* Request Example */}
            <RequestExample
              httpMethod="GET"
              endpoint="/identity/{session_id}/status"
              language="python"
              code={pythonRequestExample}
              title="Request Example (Python)"
            />

            {/* Response Example */}
            <ResponseExample code={jsonResponseExample} title="Response" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckSessionStatusPage;
