/* Request Form Component */

import { type FC } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

// Define the form data structure
interface RequestFormData {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers: { key: string; value: string }[];
  body: string;
}

// Create the form component
const RequestForm: FC = () => {
  // Create the form itself
  const { control, register, handleSubmit, watch } = useForm<RequestFormData>({
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
  const currentMethod = watch('method');
  const showBody = ['POST', 'PUT', 'PATCH'].includes(currentMethod); // Only show the body for POST, PUT, PATCH methods.

  // Handle form submission
  const onSubmit = (data: RequestFormData) => {
    // Filter out empty headers
    const filteredHeaders = data.headers.filter((h) => h.key.trim() != '' && h.value.trim() !== '');
    const cleanData = { ...data, headers: filteredHeaders };

    console.log('Form submitted with data:', cleanData);
    // TODO: wire this up to actually make the API call
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
