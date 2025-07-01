/* Start ID Verification endpoint example */

import PrefilledApiSandbox from '../../components/layout/PrefilledApiSandbox';
import { API_BASE_URL } from '../../config/env';

const StartVerificationPage = () => {
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
      <h1 className="text-2xl font-bold mb-4">Identity Proofing API</h1>
      <p className="mb-8">
        The Identity Proofing API allows you to verify user identities through various methods.
      </p>

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
