export const dashboardMock = {
  summary: {
    todayAppointments: 12,
    newPatients: 3,
    pendingCancellations: 1,
  },
  calendar: {
    "2026-03-28": 5,
    "2026-03-29": 3,
  },
  selectedDateAppointments: [
    {
      id: 1,
      patientName: "John Doe",
      time: "10:00 AM",
      type: "Checkup",
    },
  ],
  timeline: [
    {
      time: "10:00 AM",
      patientName: "John Doe",
      treatment: "Checkup",
    },
  ],
};
