import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Options for the useScrollNavigation hook
 */
interface UseScrollNavigationOptions {
  // Root path for this section (e.g., '/identity-proofing')
  rootPath: string;
  // Map of section IDs to their respective sub-paths
  // e.g., { 'start-verification': 'start-verification' }
  sectionPaths: Record<string, string>;
  // Optional threshold to determine when a section is considered "in view"
  // Default is 0.5 (50% of the section visible)
  threshold?: number;
  // Optional ID of parent section to observe for resetting URL
  // When this section is in view, URL will revert to rootPath
  parentSectionId?: string;
}

/**
 * Hook for scroll-linked navigation
 * Tracks sections in view and updates the URL accordingly
 * Also handles initial scrolling to the right section when a direct URL is loaded
 */
export function useScrollNavigation({
  rootPath,
  sectionPaths,
  threshold = 0.5,
  parentSectionId = 'identity-proofing-main', // Default to the parent section ID we've added
}: UseScrollNavigationOptions) {
  const location = useLocation();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPathRef = useRef<string>(rootPath);

  // Set up intersection observer to track sections in view
  useEffect(() => {
    // Clean up any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create a new intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            const sectionId = entry.target.id;

            // Check if this is a subsection with a defined path
            if (sectionPaths[sectionId]) {
              const newPath = `${rootPath}/${sectionPaths[sectionId]}`;

              // Only update if path has changed
              if (newPath !== lastPathRef.current) {
                lastPathRef.current = newPath;
                // Update URL without causing a re-render
                window.history.replaceState(null, '', newPath);
              }
            }
            // Check if this is the parent section - reset URL to root path
            else if (sectionId === parentSectionId && lastPathRef.current !== rootPath) {
              lastPathRef.current = rootPath;
              window.history.replaceState(null, '', rootPath);
            }
          }
        });
      },
      { threshold }
    );

    // Observe all sections
    Object.keys(sectionPaths).forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    // Also observe the parent section
    const parentElement = document.getElementById(parentSectionId);
    if (parentElement) {
      observerRef.current?.observe(parentElement);
    }

    // Clean up observer on unmount
    return () => {
      observerRef.current?.disconnect();
    };
  }, [rootPath, sectionPaths, threshold, parentSectionId]);

  // Handle initial scrolling to the right section on load
  useEffect(() => {
    const currentPath = location.pathname;

    // Find the section that matches the current path
    const targetSectionId = Object.entries(sectionPaths).find(
      ([_, path]) => currentPath === `${rootPath}/${path}`
    )?.[0];

    if (targetSectionId) {
      // Scroll to the target section
      const targetElement = document.getElementById(targetSectionId);
      if (targetElement) {
        // Use a small delay to ensure rendering is complete
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.pathname, rootPath, sectionPaths]);
}
