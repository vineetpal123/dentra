import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface BusinessDay {
  day: string;
  isClosed: boolean;
  slots: TimeSlot[];
}

interface BusinessHoursState {
  data: BusinessDay[];
  loading: boolean;
  error: string | null;
  saving: boolean;
}

const initialState: BusinessHoursState = {
  data: [],
  loading: false,
  error: null,
  saving: false,
};

const businessHoursSlice = createSlice({
  name: "businessHours",
  initialState,
  reducers: {
    fetchBusinessHoursRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBusinessHoursSuccess(state, action: PayloadAction<BusinessDay[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchBusinessHoursFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addBusinessHoursRequest(state, action: PayloadAction<BusinessDay[]>) {
      state.loading = true;
      state.error = null;
    },
    addBusinessHoursSuccess(state, action: PayloadAction<BusinessDay[]>) {
      state.loading = false;
      state.data = [...state.data, ...action.payload];
    },
    addBusinessHoursFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchBusinessHoursRequest,
  fetchBusinessHoursSuccess,
  fetchBusinessHoursFailure,
  addBusinessHoursRequest,
  addBusinessHoursSuccess,
  addBusinessHoursFailure,
} = businessHoursSlice.actions;

export default businessHoursSlice.reducer;
