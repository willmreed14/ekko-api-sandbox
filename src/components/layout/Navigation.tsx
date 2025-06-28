/* Navigation Component */

import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  // Define API sections for navigation
  const sections = [
    { id: 'sandbox', name: 'API Sandbox', path: '/' },
    { id: 'identity-proofing', name: 'Identity Proofing', path: '/identity-proofing' },
    // Add more sections as needed later
  ];
  return <div>Navigation</div>;
};

export default Navigation;
