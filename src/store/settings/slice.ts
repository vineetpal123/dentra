import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Settings {
  clinicName: string;
  email: string;
  phone: string;
  address: string;
  profileImage?: string;
  notifications: boolean;
}

export interface SettingsState {
  data: Settings;
  loading: boolean;
  saving: boolean;
  error: null | string;
}

const initialState: SettingsState = {
  data: {
    clinicName: "",
    email: "",
    phone: "",
    address: "",
    profileImage: undefined,
    notifications: true,
  },
  loading: false,
  saving: false,
  error: null,
};
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    fetchSettingsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSettingsSuccess(state, action: PayloadAction<Settings>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchSettingsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addSettingsRequest(state, action: PayloadAction<Settings>) {
      state.loading = true;
      state.error = null;
    },
    addSettingsSuccess(state, action: PayloadAction<Settings>) {
      state.loading = false;
      state.data = { ...state.data, ...action.payload };
    },
    addSettingsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSettingsRequest,
  fetchSettingsSuccess,
  fetchSettingsFailure,
  addSettingsRequest,
  addSettingsSuccess,
  addSettingsFailure,
} = settingsSlice.actions;

export default settingsSlice.reducer;
