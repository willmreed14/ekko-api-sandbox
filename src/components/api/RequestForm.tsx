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
  const { control, register, handleSubmit, watch } = useForm<FormData>({
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
      body: showBody && data.body ? JSON.parse(data.body) : undefined,
    };

    // Call the onSubmit handler
    onSubmit(requestConfig);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* URL and Method */}
      <div className="flex gap-2">
        <select {...register('method')} className="bg-slate-700 text-white rounded px-3 py-2">
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>

        <input
          {...register('url')}
          placeholder="Enter API URL"
          className="flex-1 bg-slate-700 text-white rounded px-3 py-2"
        ></input>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
        >
          Send
        </button>
      </div>

      {/* Headers Section */}
      <div className="bg-slate-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-medium">Headers</h3>

          {/* Add Header Button - Appends a new empty header row */}
          <button
            type="button"
            onClick={() => append({ key: '', value: '' })}
            className="text-sm bg-slate-700 hover:bg-slate-600 text-white rounded px-2 py-1"
          >
            Add Header
          </button>
        </div>

        {/* Accept inputs for new header row */}
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            {/* Input for header key */}
            <input
              {...register(`headers.${index}.key`)}
              placeholder="Header name"
              className="flex-1 bg-slate-700 text-white rounded px-3 py-2"
            ></input>

            {/* Input for header value */}
            <input
              {...register(`headers.${index}.value`)}
              placeholder="Value"
              className="flex-1 bg-slate-700 text-white rounded px-3 py-2"
            ></input>

            {/* Remove header row */}
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-700 hover:bg-red-600 text-white rounded px-3 py-2"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Request Body - Only show for POST, PUT, PATCH */}
      {showBody && (
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Request Body</h3>
          <textarea
            {...register('body')}
            rows={8}
            placeholder="Enter request body (JSON)"
            className="w-full bg-slate-700 text-white font-mono rounded px-3 py-2 resize-none"
          ></textarea>
        </div>
      )}
    </form>
  );
};

export default RequestForm;
