import { RootState } from "../store";

export const selectBusinessHours = (state: RootState) =>
  state.businessHours.data;
export const selectLoading = (state: RootState) => state.businessHours.loading;
export const selectError = (state: RootState) => state.businessHours.error;
