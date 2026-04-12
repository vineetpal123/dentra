export const getPatientFormFields = () => [
  {
    name: 'name',
    label: 'Patient',
    type: 'text',
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
  },
   {
    name: 'age',
    label: 'Age',
    type: 'number',
  },
  {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ],
  },
  //   { name: 'lastVisit', label: 'Last Visit', type: 'date' },
];

export const defaultPatientFormValues = {
  name: '',
  phone: '',
  age: '',
  gender: '',
  //lastVisit: '',
};
