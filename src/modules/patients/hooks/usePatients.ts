import { useDispatch } from 'react-redux';
import { hideFormDialog, showFormDialog } from '../../../store/global/slice';
import { getPatientFormFields, defaultPatientFormValues } from '../config/patientForm.config';
import { addPatientRequest, updatePatientRequest } from '../../../store/patients/slice';

export function usePatients() {
  const dispatch = useDispatch();
  const fields = getPatientFormFields();

  const onClose = () => {
    dispatch(hideFormDialog());
  };

  const openForm = (mode: 'create' | 'edit', data?: any) => {
    
    dispatch(
      showFormDialog({
        open: true,
        mode,
        title: mode === 'edit' ? 'Edit Patient' : 'Create Patient',
        fields,
        initialValues: data || defaultPatientFormValues,
        onClose: onClose,
        onSubmit: (formData: any) => {
          if (mode === 'create') {
            dispatch(addPatientRequest(formData));
          } else {
            dispatch(updatePatientRequest(formData));
          }
        },
      })
    );
  };

  return {
    openForm,
  };
}
