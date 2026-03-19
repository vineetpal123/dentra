import axios from 'axios';
import { Appointment } from '../store/appointments/slice';

const api = axios.create({ baseURL: 'http://localhost:4000' });

export const fetchAppointments = () => api.get<Appointment[]>('/appointments');
export const addAppointment = (data: Appointment) => api.post('/appointments', data);
export const updateAppointment = (data: Appointment) => api.put(`/appointments/${data.id}`, data);
export const deleteAppointment = (id: number) => api.delete(`/appointments/${id}`);
