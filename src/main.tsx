/* Main Entry Point */

// Imports
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';

// Import page componenets
import SandboxPage from './pages/SandboxPage.tsx';
import IdentityProofingPage from './pages/IdentityProofingPage.tsx';

// Create a QueryClient instance
const queryClient = new QueryClient();

// Initialize MSW in development mode
if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser');
  await worker.start({
    onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
  });
}

// Create a router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <SandboxPage />,
      },
      {
        path: 'identity-proofing',
        element: <IdentityProofingPage />,
        // Define child routes to support direct linking
        // Content itself is embedded in IdentityProofingPage
        children: [
          {
            path: 'start-verification',
            element: <></>,
          },
          {
            path: 'check-session-status',
            element: <></>,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
