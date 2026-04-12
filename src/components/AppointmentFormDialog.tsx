import { useDispatch, useSelector } from 'react-redux';
import {
  addAppointmentRequest,
  updateAppointmentRequest,
  setSelectedAppointment,
} from '../store/appointments/slice';
import { RootState } from '../store/store';
import FormDialog from './FormDialog';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AppointmentFormDialog({ open, onClose }: Props) {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.appointments.selectedAppointment);

  const patients = [
    { _id: '1', name: 'John Doe' },
    { _id: '2', name: 'Jane Smith' },
  ];

  const users = [{ _id: '1', name: 'Dr. House', role: 'doctor' }];

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      title={selected ? 'Edit Appointment' : 'Create Appointment'}
      fields={[
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
      ]}
      initialValues={
        selected || {
          patientId: '',
          doctorId: '',
          date: '',
          startTime: '',
        }
      }
      onSubmit={(data) => {
        if (selected) {
          dispatch(updateAppointmentRequest({ ...selected, ...data }));
        } else {
          dispatch(addAppointmentRequest(data));
        }

        dispatch(setSelectedAppointment(null));
        onClose();
      }}
    />
  );
}
