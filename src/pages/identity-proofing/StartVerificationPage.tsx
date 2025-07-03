/* Start ID Verification endpoint example */

import { API_BASE_URL } from '../../config/env';
import RequestExample from '../../components/layout/RequestExample';
import ResponseExample from '../../components/layout/ResponseExample';

const StartVerificationPage = () => {
  // Define pre-filled request example (Python, for now)
  const pythonRequestExample = `import requests

url = "${API_BASE_URL}/identity/start"
payload = {
    "user_id": "user_1234",
    "provider": "idme",
    "callbackUrl": "https://your-app.com/verify/callback",
    "channel": "web"
}
headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`;

  // Define example JSON response
  const jsonResponseExample = `{
  "success": true,
  "session_id": "abc-123",
  "redirect_url": "https://verify.id.me/verify/abc-123",
  "expires_at": "2025-06-16T19:00:00Z"
  }`;

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
        {/* Left side: Documentation */}
        <div className="w-full md:w-1/2">
          {/* Overview Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Start ID Verification</h2>
            <p className="mb-4">
              Initiates an identity verification session via ID.me and returns a redirect URL that
              your application should redirect the user to.
            </p>
            <p>
              After completing the verification flow on ID.me, users will be redirected back to the
              callback URL you specified. The verification results can be retrieved using the
              session_id.
            </p>
          </div>

          {/* Request Parameters */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Request Parameters</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>user_id</strong> (required): Your internal user identifier
              </li>
              <li>
                <strong>provider</strong> (required): Identity verification provider to use
                (currently only "idme" supported)
              </li>
              <li>
                <strong>callbackUrl</strong> (required):URL where user will be redirected after
                completing verification
              </li>
              <li>
                <strong>channel</strong> (optional):Application channel, either "web" or "mobile"
              </li>
            </ul>
          </div>
        </div>

        {/* Right side: Code Examples */}
        <div className="w-full md:w-1/2">
          {/* Request Example */}
          <RequestExample
            httpMethod="POST"
            endpoint="/identity/start"
            language="python"
            code={pythonRequestExample}
            title="Request Example (Python)"
          />

          {/* Response Example */}
          <ResponseExample code={jsonResponseExample} title="Response" />
        </div>
      </div>
    </div>
  );
};

export default StartVerificationPage;
