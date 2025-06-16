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
