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
};
