const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
console.log('env', import.meta.env);

const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    SEND_OTP: `${BASE_URL}/auth/send-otp`,
  },
  APPOINTMENTS: {
    GET_ALL: `${BASE_URL}/appointments`,
    GET_BY_ID: (id: number | string) => `${BASE_URL}/appointments/${id}`,
    CREATE: `${BASE_URL}/appointments`,
    UPDATE: (id: number | string) => `${BASE_URL}/appointments/${id}`,
    DELETE: (id: number | string) => `${BASE_URL}/appointments/${id}`,
  },
  DASHBOARD: {
    GET: `${BASE_URL}/dashboard`,
  },
  PATIENTS: {
    GET_ALL: `${BASE_URL}/patients`,
    GET_BY_ID: (id: number | string) => `${BASE_URL}/patients/${id}`,
    CREATE: `${BASE_URL}/patients`,
    UPDATE: (id: number | string) => `${BASE_URL}/patients/${id}`,
    DELETE: (id: number | string) => `${BASE_URL}/patients/${id}`,
  },
  BUSINESS_HOURS: {
    GET_ALL: `${BASE_URL}/business-hours`,
    GET_BY_ID: (id: number | string) => `${BASE_URL}/business-hours/${id}`,
    CREATE: `${BASE_URL}/business-hours`,
    UPDATE: (id: number | string) => `${BASE_URL}/business-hours/${id}`,
    DELETE: (id: number | string) => `${BASE_URL}/business-hours/${id}`,
  },
  SETTINGS: {
    GET: `${BASE_URL}/settings`,
    UPDATE: `${BASE_URL}/settings`,
  },
};

export default API_ENDPOINTS;
