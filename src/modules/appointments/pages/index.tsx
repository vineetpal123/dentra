import { Button, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import AppointmentCalendar from '../components/AppointmentCalendar';
import AppointmentTable from '../components/AppointmentTable';
import { useAppointments } from '../hooks/useAppointments';

export default function AppointmentPage() {
  const { view, setView, appointments, openForm } = useAppointments();

  return (
    <>
      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <ToggleButtonGroup value={view} exclusive onChange={(_, val) => val && setView(val)}>
          <ToggleButton value="calendar">Calendar</ToggleButton>
          <ToggleButton value="table">Table</ToggleButton>
        </ToggleButtonGroup>

        <Button variant="contained" onClick={() => openForm('create')}>
          Add Appointment
        </Button>
      </Stack>

      {/* VIEW */}
      {view === 'calendar' ? (
        <AppointmentCalendar onEdit={(data) => openForm('edit', data)} />
      ) : (
        <AppointmentTable appointments={appointments} onEdit={(data) => openForm('edit', data)} />
      )}
    </>
  );
}
