import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function GlobalLoader() {
  const loading = useSelector(
    (state: RootState) => state.appointments.loading
  );

  return (
    <Backdrop open={loading} sx={{ zIndex: 1300 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
