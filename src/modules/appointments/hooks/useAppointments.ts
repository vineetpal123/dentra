import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAppointmentRequest,
  fetchAppointmentsRequest,
  setSelectedAppointment,
} from '../../../store/appointments/slice';
import { hideFormDialog, showFormDialog } from '../../../store/global/slice';
import { selectAppointments } from '../../../store/appointments/selectors';
import { getAppointmentFields, defaultAppointmentValues } from '../config/appointmentForm.config';

export function useAppointments() {
  const dispatch = useDispatch();
  const appointments = useSelector(selectAppointments);

  const [view, setView] = useState<'calendar' | 'table'>('calendar');

  // mock data (later replace with API)
  const patients = [
    { _id: '1', name: 'John Doe' },
    { _id: '2', name: 'Jane Smith' },
  ];

  const users = [{ _id: '1', name: 'Dr. House', role: 'doctor' }];

  const fields = getAppointmentFields(patients, users);

  useEffect(() => {
    dispatch(fetchAppointmentsRequest());
  }, [dispatch]);

  const onClose = () => {
    dispatch(setSelectedAppointment(null));
    dispatch(hideFormDialog());
  };

  const openForm = (mode: 'create' | 'edit', data?: any) => {
    dispatch(setSelectedAppointment(data || null));
    alert('Opening form in ' + mode + ' mode with data: ' + JSON.stringify(data));
    dispatch(
      showFormDialog({
        open: true,
        mode,
        title: mode === 'edit' ? 'Edit Appointment' : 'Create Appointment',
        fields,
        initialValues: data || defaultAppointmentValues,
        onClose: onClose,
        onSubmit: (formData: any) => {
          if (mode === 'create') {
            console.log('Creating appointment with data:', formData);
            dispatch(addAppointmentRequest(formData));
            // dispatch create action here
          } else {
            console.log('Updating appointment with data:', formData);
            // dispatch update action here
          }
          // dispatch create/update here
        },
      })
    );
  };

  return {
    view,
    setView,
    appointments,
    openForm,
  };
}
