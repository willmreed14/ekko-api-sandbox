/* Identity Proofing API section */

import React from 'react';

const IdentityProofingPage = () => {
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

          {/* Add the ApiSandboxLayout with pre-filled values here */}
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-500 mb-2">
              Coming soon: Pre-filled identity verification example
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IdentityProofingPage;
