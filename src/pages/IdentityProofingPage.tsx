/* Identity Proofing API section */

import { Outlet } from 'react-router-dom';

const IdentityProofingPage = () => {
  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-2xl font-bold">Identity Proofing API</h1>

      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
        {/* Left side: Documentation */}
        <div className="w-full md:w-1/2">
          <p>
            This section defines the endpoints for the ID.me-based identity proofing flow for the
            RON (Remote Online Notarization) project. Since MaxMD does not provide API-based
            initiation for ID.me, this spec outlines the required Redrock-managed endpoints to
            support initiation, session tracking, and response handling.
          </p>
          {/* Additional Documentation Content */}
        </div>

        {/* Right side: Endpoints in code-style box */}
        <div className="w-full md:w-1/2">
          <div className="bg-gray-900 text-white p-6 rounded-lg">
            <div className="text-sm text-gray-400 mb-4">ENDPOINTS</div>
            <div className="font-mono">
              {/* Endpoints */}
              <div className="mb-1">
                <span className="text-blue-400">GET</span> /v1/balance
              </div>
              <div className="mb-1">
                <span className="text-blue-400">POST</span> /v1/balance
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Child routes will be rendered here */}
      <div className="mt-10">
        <Outlet />
      </div>
    </div>
  );
};
export default IdentityProofingPage;
