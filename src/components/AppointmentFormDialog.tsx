import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  addAppointmentRequest,
  updateAppointmentRequest,
  setSelectedAppointment,
} from "../store/appointments/slice";
import { RootState } from "../store/store";
import { TimePicker } from "@mui/x-date-pickers";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AppointmentFormDialog({ open, onClose }: Props) {
  const dispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) => state.appointments.selectedAppointment,
  );

  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (selected) {
      setForm({
        patient: selected.patient,
        doctor: selected.doctor,
        date: selected.date,
        time: selected.time,
      });
    } else {
      setForm({ patient: "", doctor: "", date: "", time: "" });
    }
  }, [selected]);

  const handleSave = () => {
    if (selected) {
      dispatch(
        updateAppointmentRequest({
          ...selected,
          ...form,
        }),
      );
    } else {
      dispatch(
        addAppointmentRequest({
          id: Date.now(),
          ...form,
          status: "Pending",
        }),
      );
    }

    dispatch(setSelectedAppointment(null));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {selected ? "Edit Appointment" : "Add Appointment"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Patient Name"
            value={form.patient}
            onChange={(e) => setForm({ ...form, patient: e.target.value })}
            fullWidth
          />
          <TextField
            label="Doctor"
            value={form.doctor}
            onChange={(e) => setForm({ ...form, doctor: e.target.value })}
            fullWidth
          />
          <TextField
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            fullWidth
          />
          <TextField
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
