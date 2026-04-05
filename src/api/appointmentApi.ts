import axios from 'axios';
import { Appointment } from '../store/appointments/slice';
console.log('env', import.meta.env);
console.log('env', import.meta.env.VITE_API_BASE_URL);
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

export const fetchAppointments = () => api.get<Appointment[]>('/appointments');
export const addAppointment = (data: Appointment) => api.post('/appointments', data);
export const updateAppointment = (data: Appointment) => api.put(`/appointments/${data.id}`, data);
export const deleteAppointment = (id: number) => api.delete(`/appointments/${id}`);
