import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { clearMessages } from '../store/appointments/slice';

export default function GlobalSnackbar() {
  const dispatch = useDispatch();
  const { error, successMessage } = useSelector(
    (state: RootState) => state.appointments
  );

  const handleClose = () => {
    dispatch(clearMessages());
  };

  return (
    <>
      {error && (
        <Snackbar open autoHideDuration={4000} onClose={handleClose}>
          <Alert severity="error" onClose={handleClose}>
            {error}
          </Alert>
        </Snackbar>
      )}

      {successMessage && (
        <Snackbar open autoHideDuration={3000} onClose={handleClose}>
          <Alert severity="success" onClose={handleClose}>
            {successMessage}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
