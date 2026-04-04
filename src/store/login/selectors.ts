import { RootState } from "../store";
import { LoginState } from "./slice";

export const selectAuthToken = (state: RootState) => state.login.authToken;
export const selectUser = (state: RootState) => state.login.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.login.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.login.loading;
export const selectError = (state: RootState) => state.login.error;

export const selectStep = (state: RootState) => state.login.step;
