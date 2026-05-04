import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginState {
  authToken: string | null;
  user: {
    id?: string;
    email?: string;
    name?: string;
    role?: string;
  } | null;
  isAuthenticated: boolean;
  loading: boolean;
  error?: string | null;
  step: 'phone' | 'otp';
}

const initialState: LoginState = {
  authToken:
    'aa',
  user: {},
  isAuthenticated: true,
  loading: false,
  error: null,
  step: 'phone',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    sendOtpRequest(state, action: PayloadAction<{ phone: string }>) {
      state.loading = true;
      state.error = null;
    },
    sentOtpSuccess(state) {
      state.step = 'otp';
      state.loading = false;
      state.error = null;
    },
    sendOtpFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    loginRequest(state, action: PayloadAction<{ email: string; password: string }>) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ token: string; user: any }>) {
      state.authToken = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.authToken = null;
      state.user = null;
    },
    logout(state) {
      state.authToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  setUser,
  sendOtpRequest,
  sentOtpSuccess,
  sendOtpFailure,
} = loginSlice.actions;
export default loginSlice.reducer;
