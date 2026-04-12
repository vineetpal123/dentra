import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Patient {
  id: number;
  name: string;
  phone: string;
  age: number;
  gender: string;
  lastVisit: string;
  status: "Active" | "Inactive";
}

interface State {
  list: Patient[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: State = {
  list: [],
  loading: false,
  error: null,
};

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    fetchPatientsRequest(state) {
      state.loading = true;
      state.error = undefined;
    },
    fetchPatientsSuccess(state, action: PayloadAction<Patient[]>) {
      state.loading = false;
      state.list = action.payload;
    },
    fetchPatientsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addPatientRequest(state, action: PayloadAction<Patient>) {
      state.loading = true;
      state.error = undefined;
    },
    addPatientSuccess(state, action: PayloadAction<Patient>) {
      state.loading = false;
      state.list.push(action.payload);
    },
    addPatientFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
     updatePatientRequest(state) {
      state.loading = true;
      state.error = undefined;
    },
     updatePatientSuccess(state, action: PayloadAction<Patient>) {
          state.loading = false;
          state.list = state.list.map((p) =>
            p['_id'] === action.payload['_id'] ? action.payload : p
          );
    },
     updatePatientFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
      

export const {
  fetchPatientsRequest,
  fetchPatientsSuccess,
  fetchPatientsFailure,
  updatePatientRequest,
  updatePatientSuccess,
  updatePatientFailure,
  addPatientRequest,
  addPatientSuccess,
  addPatientFailure,
} = patientSlice.actions;

export default patientSlice.reducer;
