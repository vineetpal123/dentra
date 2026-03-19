import { Appointment } from "../components/AppointmentTable";
import {
  APPOINTMENT_DURATION_MIN,
  BUSINESS_HOURS,
} from "../constants/appointment.constants";

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const isOverlapping = (newAppt: Appointment, existing: Appointment) => {
  if (
    newAppt.date !== existing.date ||
    newAppt.doctor !== existing.doctor ||
    newAppt.id === existing.id
  ) {
    return false;
  }

  const startA = toMinutes(newAppt.time);
  const endA = startA + APPOINTMENT_DURATION_MIN;

  const startB = toMinutes(existing.time);
  const endB = startB + APPOINTMENT_DURATION_MIN;

  return startA < endB && endA > startB;
};

export const isWithinBusinessHours = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  const start = BUSINESS_HOURS.start.split(":").map(Number);
  const end = BUSINESS_HOURS.end.split(":").map(Number);

  const totalMinutes = hour * 60 + minute;
  const startMinutes = start[0] * 60 + start[1];
  const endMinutes = end[0] * 60 + end[1];

  return totalMinutes >= startMinutes && totalMinutes < endMinutes;
};
