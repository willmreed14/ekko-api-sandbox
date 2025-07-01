/* Navigation Component */

import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  // Track which sections are expanded
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'identity-proofing': true, // Default expanded (for now)
  });

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Define API sections with nested endpoints
  const sections = [
    {
      id: 'sandbox',
      name: 'API Sandbox',
      path: '/'
    },
    {
      id: 'identity-proofing',
      name: 'Identity Proofing',
      path: '/identity-proofing',
      endpoints: [
        {
          id: 'start-verification',
          name: 'Start ID Verification',
          path: '/identity-proofing/start-verification'
        },
        // Note: Add more endpoints as needed
      ],
    },
    // Note: Add more sections as needed
  ];

  return (
    <nav className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <div className="text-sm font-medium text-gray-500 py-2">API SECTIONS</div>
      <ul className="space-y-1 py-2">
        {sections.map((section) => (
          <li key={section.id}>
            <NavLink
              to={section.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm ${
                  isActive
                    ? 'bg-gray-100 text-gray-900 font-medoum'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              {section.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
