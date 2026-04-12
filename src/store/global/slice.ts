import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SnackbarPayload {
  message: string;
  severity: string;
}

export interface GlobalState {
  loading: boolean;
  error?: string | null;
  snackbar?: SnackbarPayload | null;
  successMessage: string | null;
  formDialog: any;
}

const initialState: GlobalState = {
  loading: false,
  error: null,
  snackbar: null,
  successMessage: null,
  formDialog: {
    open: false,
    onClose: () => {},
    title: '',
    fields: [],
    initialValues: {},
    onSubmit: () => {},
  },
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    showLoader(state) {
      state.loading = true;
      state.error = undefined;
    },
    hideLoader(state) {
      state.loading = false;
      state.error = undefined;
    },
    showSnackbar(state, action: PayloadAction<SnackbarPayload>) {
      if (action.payload.severity === 'error') {
        state.error = action.payload.message;
      } else {
        state.successMessage = action.payload.message;
      }
    },
    showFormDialog(state, action: PayloadAction<any>) {
      state.formDialog = { ...state.formDialog, ...action.payload };
    },
    hideFormDialog(state) {
      state.formDialog = initialState.formDialog;
    },
  },
});

export const { showLoader, hideLoader, showSnackbar, showFormDialog, hideFormDialog } =
  globalSlice.actions;

export default globalSlice.reducer;
