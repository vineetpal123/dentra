import { RootState } from "../store";

export const selectSettings = (state: RootState) => state.settings.data;
export const selectLoading = (state: RootState) => state.settings.loading;
export const selectError = (state: RootState) => state.settings.error;
