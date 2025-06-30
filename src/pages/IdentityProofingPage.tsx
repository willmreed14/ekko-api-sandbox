/* Identity Proofing API section */

import PrefilledApiSandbox from '../components/layout/PrefilledApiSandbox';

const IdentityProofingPage = () => {
  // Define pre-filled values for ID verification API
  const verificationExample = {
    url: 'https://baseurl.com/identity/start',
    method: 'POST' as const,
    headers: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Authorization', value: 'Bearer YOUR_API_KEY' },
    ],
    body: JSON.stringify({
      user_id: 'user_1234',
      provider: 'idme',
      callbackUrl: 'https://your-app.com/verify/callback',
      channel: 'web', // optional: helps track mobile vs web flow
    }),
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Identity Proofing API</h1>
      <p className="text-gray-600 mb-8">
        The Identity Proofing API allows you to verify user identities through various methods.
      </p>

      {/* Example endpoints section */}
      <div className="space-y-12">
        {/* POST Endpoint Example */}
        <section id="create-verification" className="border-b border-gray-200 pb-8">
          <h2 className="text-xl font-semibold mb-4">Create Verification</h2>
          <p className="text-gray-600 mb-6">
            Initiate an identity verification process for a user.
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

export default IdentityProofingPage;
