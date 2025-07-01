/* Identity Proofing API section */

import { Link } from 'react-router-dom';

const IdentityProofingPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Identity Proofing API</h1>
      <p className="mb-8">
        The Identity Proofing API allows you to verify user identities through various methods.
      </p>

      {/* List of endpoints in this section */}
      <div className="spce-y-6">
        <h2 className="text-lg font-semibold">Available Endpoints</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/identity-proofing/start-verification"
              className="block p-4 border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <span className="text-md font-medium">Start ID Verification</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">POST</span>
              </div>
              <p className="mt-2 text-sm">
                Initiates identity verification session via ID.me and returns a redirect URL
              </p>
            </Link>
          </li>
          {/* Add more endpoint links here */}
        </ul>
      </div>
    </div>
  );
};

export default IdentityProofingPage;
