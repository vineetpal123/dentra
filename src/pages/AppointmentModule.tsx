import { useEffect, useState } from "react";
import { Button, Stack, Switch, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import AppointmentCalendar from "../components/AppointmentCalendar";
import AppointmentFormDialog from "../components/AppointmentFormDialog";
import {
  fetchAppointmentsRequest,
  setSelectedAppointment,
} from "../store/appointments/slice";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import AppointmentTable from "../components/AppointmentTable";
import { selectAppointments } from "../store/appointments/selectors";

export default function AppointmentModule() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAppointmentsRequest());
  }, [dispatch]);

  const [openForm, setOpenForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState<"calendar" | "table">("calendar");
  const appointments = useSelector(selectAppointments);

  return (
    <>
      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, val) => val && setView(val)}
        >
          <ToggleButton value="calendar">Calendar</ToggleButton>
          <ToggleButton value="table">Table</ToggleButton>
        </ToggleButtonGroup>

        <Stack direction="row" spacing={2} alignItems="center">
          {/* <Typography>Dark Mode</Typography>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} /> */}

          <Button
            variant="contained"
            onClick={() => {
              dispatch(setSelectedAppointment(null));
              setOpenForm(true);
            }}
          >
            Add Appointment
          </Button>
        </Stack>
      </Stack>

      {/* CALENDAR */}

      {view === "calendar" ? (
        <AppointmentCalendar onEdit={() => setOpenForm(true)} />
      ) : (
        <AppointmentTable
          appointments={appointments}
          onEdit={() => setOpenForm(true)}
        />
      )}

      {/* FORM DIALOG */}
      <AppointmentFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
      />
    </>
  );
}
