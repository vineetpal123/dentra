export const getAppointmentFields = (patients: any[], users: any[]) => [
  //   {
  //     name: 'patientId',
  //     label: 'Patient',
  //     type: 'autocomplete',
  //     options: patients.map((p) => ({
  //       label: p.name,
  //       value: p._id,
  //     })),
  //   },
  //   {
  //     name: 'doctorId',
  //     label: 'Doctor',
  //     type: 'select',
  //     options: users
  //       .filter((u) => u.role === 'doctor')
  //       .map((d) => ({
  //         label: d.name,
  //         value: d._id,
  //       })),
  //   },

  {
    name: 'patientName',
    label: 'Patient',
    type: 'text',
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
  },
  {
    name: 'doctorId',
    label: 'Doctor',
    type: 'text',
  },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'startTime', label: 'Time', type: 'time' },
];

export const defaultAppointmentValues = {
  patientId: '',
  doctorId: '',
  phone: '',
  date: '',
  startTime: '',
};
