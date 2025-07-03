/* Start ID Verification endpoint example */

import { API_BASE_URL } from '../../config/env';
import EndpointCodeExamples from '../../components/layout/EndpointCodeExamples';

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
  const responseExample = `{
  "success": true,
  "session_id": "abc-123",
  "redirect_url": "https://verify.id.me/verify/abc-123",
  "expires_at": "2025-06-16T19:00:00Z"
  }`;
  
  // Define pre-filled values for ID verification API
  const verificationExample = {
    url: `${API_BASE_URL}/identity/start`,
    method: 'POST' as const,
    headers: [{ key: 'Content-Type', value: 'application/json' }],
    body: JSON.stringify(
      {
        user_id: 'user_1234',
        provider: 'idme',
        callbackUrl: 'https://your-app.com/verify/callback',
        channel: 'web', // optional: helps track mobile vs web flow
      },
      null,
      2
    ),
  };

  return (
    <div>
      {/* Example endpoints section */}
      <div className="space-y-12">
        {/* POST Endpoint Example */}
        <section id="create-verification" className="border-b border-gray-200 pb-8">
          <h2 className="text-xl font-semibold mb-4">Start ID Verification</h2>
          <p className="mb-6">
            Initiates identity verification session via ID.me and returns a redirect URL
          </p>

          {/* Use PrefilledApiSandbox with example values */}
          <PrefilledApiSandbox
            defaultUrl={verificationExample.url}
            defaultMethod={verificationExample.method}
            defaultHeaders={verificationExample.headers}
            defaultBody={verificationExample.body}
          />
        </section>
      </div>
    </div>
  );
};

export default StartVerificationPage;
