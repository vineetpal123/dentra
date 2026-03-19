import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addAppointmentRequest } from '../store/appointments/slice';

export default function AppointmentForm() {
  const dispatch = useDispatch();

  return (
    <Button
      variant="contained"
      onClick={() =>
        dispatch(
          addAppointmentRequest({
            id: Date.now(),
            patient: 'New Patient',
            doctor: 'Dr New',
            date: '2026-01-21',
            time: '11:00',
            status: 'Pending'
          })
        )
      }
    >
      Add Appointment
    </Button>
  );
}
