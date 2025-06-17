/* Response Viewer Component */

import { type FC } from 'react';

// Define response data structure
interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  time?: number; // Response time in ms
}

// Define props data structure
interface ResponseViewerProps {
  response: ResponseData | null;
  error: Error | null;
  isLoading: boolean;
}

const ResponseViewer: FC<ResponseViewerProps> = ({ response, error, isLoading }) => {
  return (
    <div className="space-y-4">
      <div className="text-white">Response Viewer (to be implemented)</div>
    </div>
  );
};

export default ResponseViewer;
