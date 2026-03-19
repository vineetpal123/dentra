import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Appointment {
  id: number;
  patient: string;
  doctor: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Cancelled";
}

export interface SnackbarPayload {
  message: string;
  severity: string;
}

export interface AppointmentState {
  appointments: Appointment[];
  loading: boolean;
  error?: string | null;
  selectedAppointment?: Appointment | null;
  successMessage: string | null;
}

const initialState: AppointmentState = {
  appointments: [],
  loading: false,
  error: null,
  selectedAppointment: null,
  successMessage: null,
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    fetchAppointmentsRequest(state) {
      state.loading = true;
      state.error = undefined;
    },
    fetchAppointmentsSuccess(state, action: PayloadAction<Appointment[]>) {
      state.loading = false;
      state.appointments = action.payload;
    },
    fetchAppointmentsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addAppointmentRequest(state, action: PayloadAction<Appointment>) {
      state.loading = true;
      state.error = undefined;
    },
    addAppointmentSuccess(state, action: PayloadAction<Appointment>) {
      state.loading = false;
      state.appointments.push(action.payload);
    },
    addAppointmentFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    updateAppointmentFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteAppointmentRequest(state, action: PayloadAction<number>) {
      state.loading = true;
      state.error = undefined;
    },
    deleteAppointmentSuccess(state, action: PayloadAction<number>) {
      state.loading = false;
      state.appointments = state.appointments.filter(
        (a) => a.id !== action.payload,
      );
      state.successMessage = "Appointment deleted successfully";
    },
    deleteAppointmentFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = "Failed to delete appointment";
    },
    updateAppointmentRequest(state, _action: PayloadAction<Appointment>) {
      state.loading = true;
    },
    updateAppointmentSuccess(state, action: PayloadAction<Appointment>) {
      state.loading = false;
      state.appointments = state.appointments.map((a) =>
        a.id === action.payload.id ? action.payload : a,
      );
      state.successMessage = "Appointment updated successfully";
    },
    setSelectedAppointment(state, action: PayloadAction<Appointment | null>) {
      state.selectedAppointment = action.payload;
    },
    clearMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
    showSnackbar(state, action: PayloadAction<SnackbarPayload>) {
      if (action.payload.severity === "error") {
        state.error = action.payload.message;
      } else {
        state.successMessage = action.payload.message;
      }
    },
  },
});

export const {
  fetchAppointmentsRequest,
  fetchAppointmentsSuccess,
  fetchAppointmentsFailure,
  addAppointmentRequest,
  addAppointmentSuccess,
  addAppointmentFailure,
  updateAppointmentRequest,
  updateAppointmentSuccess,
  updateAppointmentFailure,
  deleteAppointmentRequest,
  deleteAppointmentSuccess,
  deleteAppointmentFailure,
  setSelectedAppointment,
  clearMessages,
  showSnackbar,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
