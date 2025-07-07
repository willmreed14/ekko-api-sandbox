/* Identity Proofing API section */

import { Outlet } from 'react-router-dom';
import StartVerificationPage from './identity-proofing/StartVerificationPage';
import { useScrollNavigation } from '../hooks/useScrollNavigation';

const IdentityProofingPage = () => {
  // Define section paths for scroll navigation
  const sectionPaths = {
    'start-verification': 'start-verification',
    // Note: add more sections here later
  };

  // Use the scroll navigation hook
  useScrollNavigation({
    rootPath: '/identity-proofing',
    sectionPaths,
  });

  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-2xl font-bold">Identity Proofing API</h1>

      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
        {/* Left side: Documentation */}
        <div className="w-full md:w-1/2">
          {/* Context */}
          <div className="mb-6">
            <h2 className="text-1xl font-bold mb-2">Context</h2>
            <p className="mb-2">
              This section defines the endpoints for the ID.me-based identity proofing flow for the
              RON (Remote Online Notarization) project.
            </p>
            <p>
              Since MaxMD does not provide API-based initiation for ID.me, this spec outlines the
              required Redrock-managed endpoints to support initiation, session tracking, and
              response handling.
            </p>
          </div>

          {/* Goals */}
          <div className="mb-6">
            <h2 className="text-1xl font-bold mb-2">Goals</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Support initiation of ID.me identity verification sessions</li>
              <li>Allow polling or webhook-based updates from ID.me</li>
              <li>Provide verification status and results to frontend applications</li>
              <li>Maintain abstraction from ID.me implementation details</li>
            </ul>
          </div>

          {/* Assumptions */}
          <div className="mb-6">
            <h2 className="text-1xl font-bold mb-2">Assumptions</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>ID.me handles the actual identity proofing through their hosted interface</li>
              <li>Redirection-based flow is required to initiate session</li>
              <li>Redrock servers receive session completion webhook or poll for result</li>
              <li>JWT or session tokens are used for secure linkage of session data</li>
            </ul>
          </div>
        </div>

        {/* Right side: Endpoints in code-style box */}
        <div className="w-full md:w-1/2">
          <div className="bg-gray-900 text-white p-6 rounded-lg">
            <div className="text-sm text-gray-400 mb-4">ENDPOINTS</div>
            <div className="font-mono">
              {/* Endpoints */}
              <div className="mb-1">
                <span className="text-yellow-400">POST</span> /identity/start
              </div>
              <div className="mb-1">
                <span className="text-yellow-400">POST</span> /identity/webhook
              </div>
              <div className="mb-1">
                <span className="text-green-400">GET</span> /identity/&#123;sessionId&#125;/status
              </div>
              <div className="mb-1">
                <span className="text-green-400">GET</span> /identity/&#123;sessionId&#125;/result
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Child routes will be rendered here */}
      <div className="mt-10">
        <StartVerificationPage />
      </div>
    </div>
  );
};
export default IdentityProofingPage;
