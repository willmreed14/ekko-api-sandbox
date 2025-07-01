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
      path: '/',
    },
    {
      id: 'identity-proofing',
      name: 'Identity Proofing',
      path: '/identity-proofing',
      endpoints: [
        {
          id: 'start-verification',
          name: 'Start ID Verification',
          path: '/identity-proofing/start-verification',
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
          <li key={section.id} className="mb-2">
            <div className="flex flex-col">
              {/* Section header with expandable arrow */}
              <div className="flex items-center">
                {section.endpoints && section.endpoints.length > 0 ? (
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-5 h-5 mr-1 flex items-center justify-center"
                  >
                    <svg
                      className={`w-3 h-3 transition-transform ${
                        expandedSections[section.id] ? 'transform rotate-90' : ''
                      }`}
                      fill="gray-600"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                ) : (
                  <div className="w-5 h-5 mr-1"></div>
                )}

                {/* Section link */}
                <NavLink
                  to={section.path}
                  end={section.endpoints && section.endpoints.length > 0}
                  className={({ isActive }) =>
                    `flex-grow px-3 py-2 rounded-md text-sm ${
                      isActive
                        ? 'bg-gray-100 text-gray-900 font-medium'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  {section.name}
                </NavLink>
              </div>

              {/* Endpoints submenu */}
              {section.endpoints &&
                section.endpoints.length > 0 &&
                expandedSections[section.id] && (
                  <ul className="pl-6 mt-1 space-y-1">
                    {section.endpoints.map((endpoint) => (
                      <li key={endpoint.id}>
                        <NavLink
                          to={endpoint.path}
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-xs ${
                              isActive
                                ? 'bg-gray-100 text-gray-900 font-medium'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`
                          }
                        >
                          {endpoint.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
