/* Sandbox Page - Free-form API testing */

import React from 'react';
import ApiSandboxLayout from '../components/layout/ApiSandboxLayout';

const SandboxPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">API Sandbox</h1>
      <p className="mb-8">Use this sandbox to test any Ekko API endpoint with custom parameters.</p>
      <ApiSandboxLayout />
    </div>
  );
};

export default SandboxPage;
