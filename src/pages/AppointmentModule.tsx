import { useEffect, useState } from 'react';
import { Button, Stack, Switch, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import AppointmentCalendar from '../components/AppointmentCalendar';
import { fetchAppointmentsRequest, setSelectedAppointment } from '../store/appointments/slice';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import AppointmentTable from '../components/AppointmentTable';
import { selectAppointments } from '../store/appointments/selectors';
import { showFormDialog } from '../store/global/slice';

export default function AppointmentModule() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAppointmentsRequest());
  }, [dispatch]);

  const [openForm, setOpenForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState<'calendar' | 'table'>('calendar');
  const appointments = useSelector(selectAppointments);
  console.log('Appointments in Module:', appointments);
  const patients = [
    { _id: '1', name: 'John Doe' },
    { _id: '2', name: 'Jane Smith' },
  ];

  const users = [{ _id: '1', name: 'Dr. House', role: 'doctor' }];

  const fields = [
    {
      name: 'patientId',
      label: 'Patient',
      type: 'autocomplete',
      options: patients.map((p) => ({
        label: p.name,
        value: p._id,
      })),
    },
    {
      name: 'doctorId',
      label: 'Doctor',
      type: 'select',
      options: users
        .filter((u) => u.role === 'doctor')
        .map((d) => ({
          label: d.name,
          value: d._id,
        })),
    },
    { name: 'date', label: 'Date', type: 'date' },
    { name: 'startTime', label: 'Time', type: 'time' },
  ];

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
    // Dispatch create or update action based on form mode
  };

  const addAppointment = () => {
    dispatch(setSelectedAppointment(null));
    setOpenForm(true);

    dispatch(
      showFormDialog({
        open: true,
        mode: 'create',
        fields: fields,
        title: 'Create Appointment',
        initialValues: {
          patientId: '',
          doctorId: '',
          date: '',
          startTime: '',
        },
        onSubmit: onSubmit,
      })
    );
  };

  return (
    <>
      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <ToggleButtonGroup value={view} exclusive onChange={(_, val) => val && setView(val)}>
          <ToggleButton value="calendar">Calendar</ToggleButton>
          <ToggleButton value="table">Table</ToggleButton>
        </ToggleButtonGroup>

        <Stack direction="row" spacing={2} alignItems="center">
          {/* <Typography>Dark Mode</Typography>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} /> */}

          <Button variant="contained" onClick={addAppointment}>
            Add Appointment
          </Button>
        </Stack>
      </Stack>

      {/* CALENDAR */}

      {view === 'calendar' ? (
        <AppointmentCalendar onEdit={() => setOpenForm(true)} />
      ) : (
        <AppointmentTable appointments={appointments} onEdit={() => setOpenForm(true)} />
      )}
    </>
  );
}
