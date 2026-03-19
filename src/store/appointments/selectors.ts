import { RootState } from '../store';

export const selectAppointments = (state: RootState) => state.appointments.appointments;
export const selectLoading = (state: RootState) => state.appointments.loading;
export const selectError = (state: RootState) => state.appointments.error;
