/* Request Form Component */

import { type FC } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { type ApiRequestConfig } from '../../services/apiService';

// Define the form props
interface RequestFormProps {
  onSubmit: (config: ApiRequestConfig) => Promise<void>;
  isLoading: boolean;
}

// Define the form data structure
interface FormData {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers: { key: string; value: string }[];
  body: string;
}

// Create the form component
const RequestForm: FC<RequestFormProps> = ({ onSubmit, isLoading }) => {
  // Create the form itself
  const { control, register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      url: '',
      method: 'GET',
      headers: [{ key: '', value: '' }],
      body: '',
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

    // Create the API request config
    const requestConfig: ApiRequestConfig = {
      url: data.url,
      method: data.method,
      headers,
      body: undefined, // default to undefined
    };

    // Handle JSON body for methods that support it
    if (showBody && data.body) {
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
        // Show error is JSON is invalid (alert for now)
        alert('Invalid JSON in request body. Please check your syntax.');
        console.error('JSON parse error:', error);
        return;
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
            Request Body (JSON)
          </label>
          <textarea
            id="body"
            {...register('body')}
            className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white text-sm font-mono h-32"
            placeholder='{\n "key": "value"\n}'
            disabled={isLoading}
          ></textarea>
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
