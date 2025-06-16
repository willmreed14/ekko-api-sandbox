/* Request Form Component */

import { type FC } from 'react';
import { useForm, Controller } from 'react-hook-form';

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
  const { control, register, handleSubmit } = useForm<RequestFormData>({
    defaultValues: {
      url: '',
      method: 'GET',
      headers: [{ key: '', value: '' }],
      body: '',
    },
  });

  // Handle form submission
  const onSubmit = (data: RequestFormData) => {
    console.log('Form submitted with data:', data);
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

      {/* Add more fields later */}
    </form>
  );
};

export default RequestForm;
