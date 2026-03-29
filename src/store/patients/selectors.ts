import { RootState } from "../store";

export const selectPatients = (state: RootState) => state.patients.list;
export const selectLoading = (state: RootState) => state.patients.loading;
export const selectError = (state: RootState) => state.patients.error;
