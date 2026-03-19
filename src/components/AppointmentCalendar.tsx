import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/timegrid/main.css';

import { useDispatch, useSelector } from "react-redux";
import { selectAppointments } from "../store/appointments/selectors";
import {
  fetchAppointmentsRequest,
  setSelectedAppointment,
  updateAppointmentRequest,
} from "../store/appointments/slice";
import { useEffect } from "react";
import { DateSelectArg, EventDropArg } from "@fullcalendar/core/index.js";

interface Props {
  onEdit: () => void;
}

export default function AppointmentCalendar({ onEdit }: Props) {
  const appointments = useSelector(selectAppointments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAppointmentsRequest());
  }, [dispatch]);

  // Convert appointments → FullCalendar events

  const events = appointments.map((appt) => ({
    id: appt.id,
    title: `${appt.patient} - ${appt.doctor}`,
    start: `${appt.date}T${appt.time}`,
    extendedProps: {
      patient: appt.patient,
      doctor: appt.doctor,
    },
  }));

  // Handle drag & drop event
  const handleEventDrop = (info: EventDropArg) => {
    const { event, revert } = info;
    const newTime = event.startStr.split("T")[1].slice(0, 5);

    // Business hours enforcement
    if (!isWithinBusinessHours(newTime)) {
      dispatch(
        showSnackbar({
          message: "Appointments must be between 09:00 and 18:00",
          severity: "error",
        }),
      );
      revert();
      return;
    }

    dispatch(
      updateAppointmentRequest({
        id: event.id,
        patient: event.extendedProps.patient,
        doctor: event.extendedProps.doctor,
        date: event.startStr.split("T")[0],
        time: newTime,
        revert, // allow saga to revert on overlap
      }),
    );
  };

  // Optional: handle new event select (create)
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // Can open create appointment modal
    // Example:
    // openCreateModal(selectInfo.startStr)
  };

  return (
    <div style={{ marginTop: 20 }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        editable={true} // ✅ ENABLE DRAG
        selectable
        selectMirror
        dayMaxEvents
        eventDrop={handleEventDrop}
        select={handleDateSelect}
        eventClick={(info) => {
          const [patient, doctor] = info.event.title.split(" - ");
          dispatch(
            setSelectedAppointment({
              id: Number(info.event.id),
              patient,
              doctor,
              date: info.event.start!.toISOString().split("T")[0],
              time: info.event.start!.toTimeString().slice(0, 5),
              status: "Confirmed",
            }),
          );
          onEdit();
        }}
        height="auto"
      />
    </div>
  );
}
