const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
console.log('env', import.meta.env);
const PREFIX = '/api/v1';

const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/verify-otp`,
    SEND_OTP: `${BASE_URL}/auth/send-otp`,
  },
  APPOINTMENTS: {
    GET_ALL: `${BASE_URL}${PREFIX}/appointments`,
    GET_BY_ID: (id: number | string) => `${BASE_URL}${PREFIX}/appointments/${id}`,
    CREATE: `${BASE_URL}${PREFIX}/appointments`,
    UPDATE: (id: number | string) => `${BASE_URL}${PREFIX}/appointments/${id}`,
    DELETE: (id: number | string) => `${BASE_URL}${PREFIX}/appointments/${id}`,
  },
  DASHBOARD: {
    GET: `${BASE_URL}${PREFIX}/dashboard`,
  },
  PATIENTS: {
    GET_ALL: `${BASE_URL}${PREFIX}/patients`,
    GET_BY_ID: (id: number | string) => `${BASE_URL}${PREFIX}/patients/${id}`,
    CREATE: `${BASE_URL}${PREFIX}/patients`,
    UPDATE: (id: number | string) => `${BASE_URL}${PREFIX}/patients/${id}`,
    DELETE: (id: number | string) => `${BASE_URL}${PREFIX}/patients/${id}`,
  },
  BUSINESS_HOURS: {
    GET_ALL: `${BASE_URL}${PREFIX}/business-hours`,
    GET_BY_ID: (id: number | string) => `${BASE_URL}${PREFIX}/business-hours/${id}`,
    CREATE: `${BASE_URL}${PREFIX}/business-hours`,
    UPDATE: (id: number | string) => `${BASE_URL}${PREFIX}/business-hours/${id}`,
    DELETE: (id: number | string) => `${BASE_URL}${PREFIX}/business-hours/${id}`,
  },
  SETTINGS: {
    GET: `${BASE_URL}${PREFIX}/settings`,
    UPDATE: `${BASE_URL}${PREFIX}/settings`,
  },
};

export default API_ENDPOINTS;
