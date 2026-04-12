import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

type FieldType = {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'time' | 'select' | 'autocomplete';
  options?: { label: string; value: any }[];
};

export default function FormDialog() {
  const formDialog = useSelector((state: RootState) => state.global.formDialog);

  const [form, setForm] = useState<Record<string, any>>({});

  useEffect(() => {
    setForm(formDialog.initialValues || {});
  }, [formDialog.initialValues]);

  const handleChange = (name: string, value: any) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const renderField = (field: FieldType) => {
    switch (field.type) {
      case 'select':
        return (
          <TextField
            select
            label={field.label}
            value={form[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            fullWidth
          >
            {field.options?.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        );

      case 'autocomplete':
        return (
          <Autocomplete
            options={field.options || []}
            getOptionLabel={(option) => option.label}
            value={field.options?.find((opt) => opt.value === form[field.name]) || null}
            onChange={(_, value) => handleChange(field.name, value?.value || '')}
            renderInput={(params) => <TextField {...params} label={field.label} />}
          />
        );

      default:
        return (
          <TextField
            label={field.label}
            type={field.type || 'text'}
            value={form[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            fullWidth
          />
        );
    }
  };

  const handleSave = () => {
    formDialog.onSubmit(form);
  };

  return (
    <Dialog open={formDialog.open} onClose={formDialog.onClose} fullWidth>
      <DialogTitle>{formDialog.title}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          {formDialog.fields.map((field) => (
            <div key={field.name}>{renderField(field)}</div>
          ))}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={formDialog.onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
