import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DashboardState {
  summary: {
    todayAppointments: number;
    newPatients: number;
    pendingCancellations: number;
  };
  calendar: any;
  todayAppointments: any[];
  timeline: any[];
  loading: boolean;
  error?: string | null;
}

const initialState: DashboardState = {
  summary: {
    todayAppointments: 0,
    newPatients: 0,
    pendingCancellations: 0,
  },
  calendar: [{}],
  todayAppointments: [],
  timeline: [],
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchDashboardRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardSuccess(state, action: PayloadAction<DashboardState>) {
      state.summary = action.payload.summary;
      state.calendar = action.payload.calendar;
      state.todayAppointments = action.payload.todayAppointments;
      state.timeline = action.payload.timeline;
      state.loading = false;
      state.error = null;
    },
    fetchDashboardFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDashboardRequest,
  fetchDashboardSuccess,
  fetchDashboardFailure,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
