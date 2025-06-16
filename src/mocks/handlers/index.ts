/* Mock Handlers via MSW */

import { http, HttpResponse } from 'msw';

// Define mock API handlers
export const handlers = [
  // Example handler for a GET request
  http.get('/api/example', () => {
    return HttpResponse.json({
      message: 'This is a mocked API response',
      success: true,
    });
  }),
];
