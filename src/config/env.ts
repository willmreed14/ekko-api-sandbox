/* Environment Variable Config Utility */

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '{BASE_URL}';

// Environment Detection
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;
