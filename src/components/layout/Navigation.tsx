/* Navigation Component */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCurrentPath } from '../../hooks/useCurrentPath';

const Navigation = () => {
  // Get current path from custom hook that tracks URL changes
  const currentPath = useCurrentPath();

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

  // Check if a path is active
  const isPathActive = (path: string): boolean => {
    // Exact match for root path
    if (path === '/' && currentPath === '/') {
      return true;
    }

    // For other paths, check if current path starts w/ this path,
    // but only mark parent paths active when they match exact
    if (path !== '/') {
      if (currentPath === path) {
        return true;
      }

      // For endpoint paths (deeper nesting) do an exact match
      if (path.split('/').length > 2) {
        return currentPath === path;
      }
    }

    return false;
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
        {
          id: 'check-session-status',
          name: 'Check Session Status',
          path: '/identity-proofing/check-session-status',
        },
        // Note: Add more endpoints as needed
      ],
    },
    // Note: Add more sections as needed
  ];

  // Automatically expand sections based on current path
  useEffect(() => {
    // Find which section should be expanded based on the current path
    sections.forEach((section) => {
      if (section.endpoints && currentPath.startsWith(section.path) && section.path !== '/') {
        setExpandedSections((prev) => ({
          ...prev,
          [section.id]: true,
        }));
      }
    });
  }, [currentPath]);

  return (
    <nav className="w-64 bg-gray-900 border-r border-gray-700 flex flex-col h-full">
      {/* Brand Logo/Name at the top */}
      <div className="p-4">
        <Link to="/" className="flex items-center">
          <span className="text-lg font-bold text-white">Ekko API</span>
        </Link>
      </div>

      {/* API Sections header */}
      <div className="p-4">
        <div className="text-sm font-medium text-gray-400">API SECTIONS</div>
      </div>

      {/* Scrollable navigation content */}
      <div className="overflow-y-auto flex-1 p-4 pt-0">
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id} className="mb-2">
              <div className="flex flex-col">
                {/* Section header with expandable arrow */}
                <div className="flex items-center">
                  {section.endpoints && section.endpoints.length > 0 ? (
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-5 h-5 mr-1 flex items-center justify-center text-gray-400 hover:text-gray-300"
                    >
                      <svg
                        className={`w-3 h-3 transition-transform ${
                          expandedSections[section.id] ? 'transform rotate-90' : ''
                        }`}
                        fill="currentColor"
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
                  <Link
                    to={section.path}
                    className={`flex-grow px-3 py-2 rounded-md text-sm ${
                      isPathActive(section.path)
                        ? 'bg-gray-800 text-white font-medium border-l-2 border-blue-500'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {section.name}
                  </Link>
                </div>

                {/* Endpoints submenu */}
                {section.endpoints &&
                  section.endpoints.length > 0 &&
                  expandedSections[section.id] && (
                    <ul className="pl-6 mt-1 space-y-1">
                      {section.endpoints.map((endpoint) => (
                        <li key={endpoint.id}>
                          <Link
                            to={endpoint.path}
                            className={`block px-3 py-2 rounded-md text-xs ${
                              isPathActive(endpoint.path)
                                ? 'bg-gray-800 text-white font-medium border-l-2 border-blue-500'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'
                            }`}
                          >
                            {endpoint.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
