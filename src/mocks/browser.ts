/* MSW: Browser-specific setup */

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Create the mock service worker
export const worker = setupWorker(...handlers);
