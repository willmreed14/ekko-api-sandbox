import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to track current path, including changes made by window.history.replaceState()
 * @returns The current path from the window.location.pathname
 */

export function useCurrentPath(): string {
  // Get the location object from React Router
  const location = useLocation();

  // State to track the current path
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  useEffect(() => {
    // Update the path when location changes via React Router
    setCurrentPath(window.location.pathname);

    // Function to check if the URL has been changed by something else (like window.history.replaceState)
    const checkForUrlChanges = () => {
      // if path has changed...
      if (currentPath !== window.location.pathname) {
        setCurrentPath(window.location.pathname); // ... then update current path
      }
    };

    // Check for path changes periodically (every 100ms)
    const intervalId = setInterval(checkForUrlChanges, 100);

    // Set up an event listener for popstate events (browser back/fwd buttons)
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);

    // Clean up
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location, currentPath]);

  return currentPath;
}
