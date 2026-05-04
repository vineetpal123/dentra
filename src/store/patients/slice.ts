import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Patient {
   _id: string;   // ✅ fix this
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

  // 🔥 NEW
  identifiedPatient: Patient | null;
  isNewPatient: boolean | null;
  identifyLoading: boolean;

  // 🔥 cache by phone
  patientCache: Record<string, Patient | null>;
}

const initialState: State = {
  list: [],
  loading: false,
  error: null,

  identifiedPatient: null,
  isNewPatient: null,
  identifyLoading: false,
  patientCache: {}
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
    identifyPatientRequest(state, action: PayloadAction<string>) {
  state.identifyLoading = true;
},identifyPatientSuccess(
  state,
  action: PayloadAction<{ phone: string; patient: Patient | null }>
) {
  state.identifyLoading = false;
  state.identifiedPatient = action.payload.patient;
  state.isNewPatient = !action.payload.patient;

  // cache
  state.patientCache[action.payload.phone] = action.payload.patient;
},
identifyPatientFailure(state, action: PayloadAction<string>) {
  state.identifyLoading = false;
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
  identifyPatientRequest,
  identifyPatientSuccess,
  identifyPatientFailure,
} = patientSlice.actions;

export default patientSlice.reducer;
