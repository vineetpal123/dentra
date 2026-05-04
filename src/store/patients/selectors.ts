import { RootState } from "../store";

export const selectPatients = (state: RootState) => state.patients.list;
export const selectLoading = (state: RootState) => state.patients.loading;
export const selectError = (state: RootState) => state.patients.error;

export const selectIdentifiedPatient = (state: RootState) =>
  state.patients.identifiedPatient;

export const selectIsNewPatient = (state: RootState) =>
  state.patients.isNewPatient;

export const selectIdentifyLoading = (state: RootState) =>
  state.patients.identifyLoading;