/* Request Form Component */

import { type FC, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { type ApiRequestConfig } from '../../services/apiService';

// Define the form props
interface RequestFormProps {
  onSubmit: (config: ApiRequestConfig) => Promise<void>;
  isLoading: boolean;
  defaultUrl?: string;
  defaultMethod?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  defaultHeaders?: { key: string; value: string }[];
  defaultBody?: string;
}

// Define the form data structure
interface FormData {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers: { key: string; value: string }[];
  body: string;
}

// Create the form component
const RequestForm: FC<RequestFormProps> = ({
  onSubmit,
  isLoading,
  defaultUrl = '',
  defaultMethod = 'GET',
  defaultHeaders = [{ key: '', value: '' }],
  defaultBody = '',
}) => {
  // State for JSON validation error
  const [bodyError, setBodyError] = useState<string | null>(null);

  // State for body format
  const [bodyFormat, setBodyFormat] = useState<'json' | 'xml'>('json');

  // Create the form itself
  const { control, register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      url: defaultUrl,
      method: defaultMethod,
      headers: defaultHeaders,
      body: defaultBody,
    },
  });

  // Setup dynamic header fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'headers',
  });

  // Watch the current method to conditionally show the body
  const method = watch('method');
  const showBody = method === 'POST' || method === 'PUT' || method === 'PATCH'; // Only show the body for POST, PUT, PATCH methods.

  // Handle form submission
  const handleFormSubmit = (data: FormData) => {
    // Filter out empty headers
    const headers: Record<string, string> = {};
    data.headers.forEach(({ key, value }) => {
      if (key && value) {
        headers[key] = value;
      }
    });

    // Clear any previous errors
    setBodyError(null);

    // Create the API request config
    const requestConfig: ApiRequestConfig = {
      url: data.url,
      method: data.method,
      headers,
      body: undefined, // default to undefined
    };

    // Handle body for necessary methods
    if (showBody && data.body) {
      // Validate JSON
      if (bodyFormat === 'json') {
        try {
          // Try to parse the JSON
          const parsedBody = JSON.parse(data.body);

          // Format the JSON with proper indentation
          const formattedJson = JSON.stringify(parsedBody, null, 2);

          // Update the form field with formatted JSON
          setValue('body', formattedJson);

          // Set the body in the request config
          requestConfig.body = parsedBody;
        } catch (error) {
          // Show error inline
          setBodyError('Invalid JSON in request body. Please check your syntax.');
          console.error('JSON parse error:', error);
          return;
        }
      } else if (bodyFormat === 'xml') {
        // For XML, we'll just pass it as a string (for now)
        // TODO: Add basic XML validation here as necessary

        // Basic check to verify it starts w/ < and ends w/ >
        if (!(data.body.trim().startsWith('<') && data.body.trim().endsWith('>'))) {
          setBodyError('Invalid XML in request body. Please check your syntax.');
          return;
        }

        // Set the body as a string in the request config
        requestConfig.body = data.body;

        // Add XML content type header if not already set
        if (!headers['Content-Type']) {
          headers['Content-Type'] = 'application/xml';
          // Update the requestConfig headers too
          requestConfig.headers = headers;
        }
      }
    }

    // Call the onSubmit handler
    onSubmit(requestConfig);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* URL Input */}
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-white mb-1">
          URL
        </label>
        <input
          type="text"
          id="url"
          {...register('url', { required: true })}
          className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white text-sm"
          placeholder="https://api.example.com/endpoint"
          disabled={isLoading}
        ></input>
      </div>

      {/* Method Select */}
      <div>
        <label htmlFor="method" className="block text-sm font-medium text-white mb-1">
          Method
        </label>
        <select
          id="method"
          {...register('method')}
          className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white text-sm"
          disabled={isLoading}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
      </div>

      {/* Headers */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-white">Headers</label>
          <button
            type="button"
            onClick={() => append({ key: '', value: '' })}
            className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
            disabled={isLoading}
          >
            Add Header
          </button>
        </div>

        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center">
              <input
                {...register(`headers.${index}.key`)}
                placeholder="Content-Type"
                className="flex-1 bg-slate-700 border border-slate-600 rounded p-1.5 text-white text-sm"
                disabled={isLoading}
              ></input>
              <input
                {...register(`headers.${index}.value`)}
                placeholder="application/json"
                className="flex-1 bg-slate-700 border border-slate-600 rounded p-1.5 text-white text-sm"
                disabled={isLoading}
              ></input>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-400 hover:text-red-300 p-1"
                  disabled={isLoading}
                >
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Request Body (Conditional) */}
      {showBody && (
        <div>
          <label htmlFor="body" className="block text-sm font-medium text-white mb-1">
            Request Body
          </label>
          <div className="flex space-x-4 mb-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="bodyFormat"
                value="json"
                checked={bodyFormat === 'json'}
                onChange={() => setBodyFormat('json')}
                className="text-blue-600"
                disabled={isLoading}
              />
              <span className="ml-2 text-white">JSON</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="bodyFormat"
                value="xml"
                checked={bodyFormat === 'xml'}
                onChange={() => setBodyFormat('xml')}
                className="text-blue-600"
                disabled={isLoading}
              />
              <span className="ml-2 text-white">XML</span>
            </label>
          </div>
          <textarea
            id="body"
            {...register('body')}
            className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white text-sm font-mono h-32"
            placeholder={
              bodyFormat === 'json'
                ? '{\n "key": "value\n}'
                : '<?xml version="1.0 encoding="UTF-8"?>\n<root>\n <element>value</element>\n</root>'
            }
            disabled={isLoading}
          ></textarea>
          {/* Display error w/ body syntax */}
          {bodyError && <p className="text-red-400 text-sm mt-1">{bodyError}</p>}
        </div>
      )}

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:bg-slate-600 disabled: cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Request'}
        </button>
      </div>
    </form>
  );
};

export default RequestForm;
