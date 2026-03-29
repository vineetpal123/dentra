import axios from "axios";

const axiosInstance = axios.create({
  timeout: 100,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const getPathFromUrl = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname;
  } catch (error) {
    console.error("Invalid URL:", url);
    return "";
  }
};

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // preserve axios shape so callsites get response.data
  },
  (error) => {
    console.log("Error Interceptor:", error);
    // Check if the error is for appointments endpoint and return mock data
    if (error.config && error.config.url) {
      const path = getPathFromUrl(error.config.url);
      if (path === "/appointments") {
        const mockResponse = {
          data: [
            {
              id: 1,
              patient: "John Doe",
              doctor: "Dr. Smith",
              date: "2026-01-15",
              time: "10:00",
              status: "Confirmed",
            },
            {
              id: 2,
              patient: "Jane Roe",
              doctor: "Dr. Adams",
              date: "2026-01-16",
              time: "14:00",
              status: "Pending",
            },
            {
              id: 1768137080637,
              patient: "New Patient",
              doctor: "Dr New",
              date: "2026-01-21",
              time: "11:00",
              status: "Pending",
            },
            {
              id: 1768137087589,
              patient: "New Patient",
              doctor: "Dr New",
              date: "2026-01-21",
              time: "11:00",
              status: "Pending",
            },
            {
              id: 1768152309565,
              patient: "vineet",
              doctor: "abcd",
              date: "2026-01-14",
              time: "22:55",
              status: "Pending",
            },
            {
              id: 1768235141105,
              patient: "vineet",
              doctor: "ramesh",
              date: "2026-01-13",
              time: "10:55",
              status: "Pending",
            },
            {
              id: 1768238903316,
              patient: "vineet",
              doctor: "ramesh",
              date: "2026-01-13",
              time: "01:58",
              status: "Confirmed",
            },
            {
              id: 1768239345000,
              patient: "vineet pal",
              doctor: "ramesh",
              date: "2026-01-13",
              time: "11:05",
              status: "Pending",
            },
            {
              id: 1768731745450,
              patient: "vineet",
              doctor: "ramesh",
              date: "2026-01-19",
              time: "09:00",
              status: "Pending",
            },
            {
              id: 1768731935328,
              patient: "vineet",
              doctor: "ramesh",
              date: "2026-01-19",
              time: "03:55",
              status: "Pending",
            },
            {
              id: 1773940637907,
              patient: "ramesh",
              doctor: "suresh",
              date: "2026-03-20",
              time: "10:47",
              status: "Pending",
            },
            {
              id: 1774188400753,
              patient: "gojo",
              doctor: "saturo",
              date: "2026-03-23",
              time: "10:39",
              status: "Pending",
            },
          ],
          status: 200,
          statusText: "OK",
          headers: error.response?.headers || {},
          config: error.config,
          request: error.request,
        };
        console.log("Returning mock response for error:", mockResponse);
        return Promise.resolve(mockResponse);
      } else if (path === "/dashboard") {
        const mockResponse = {
          data: {
            summary: {
              todayAppointments: 12,
              newPatients: 3,
              pendingCancellations: 1,
            },
            calendar: [
              {
                title: "All Day Event very long title",
                allDay: true,
                start: new Date(2026, 3, 0),
                end: new Date(2026, 3, 1),
              },
              {
                title: "Long Event",
                start: new Date(2026, 3, 7),
                end: new Date(2026, 3, 10),
              },

              {
                title: "DTS STARTS",
                start: new Date(2016, 2, 13, 0, 0, 0),
                end: new Date(2016, 2, 20, 0, 0, 0),
              },

              {
                title: "DTS ENDS",
                start: new Date(2016, 10, 6, 0, 0, 0),
                end: new Date(2016, 10, 13, 0, 0, 0),
              },

              {
                title: "Some Event",
                start: new Date(2026, 3, 9, 0, 0, 0),
                end: new Date(2026, 3, 9, 0, 0, 0),
              },
              {
                title: "Conference",
                start: new Date(2026, 3, 11),
                end: new Date(2026, 3, 13),
                desc: "Big conference for important people",
              },
              {
                title: "Meeting",
                start: new Date(2026, 3, 12, 10, 30, 0, 0),
                end: new Date(2026, 3, 12, 12, 30, 0, 0),
                desc: "Pre-meeting meeting, to prepare for the meeting",
              },
              {
                title: "Lunch",
                start: new Date(2026, 3, 12, 12, 0, 0, 0),
                end: new Date(2026, 3, 12, 13, 0, 0, 0),
                desc: "Power lunch",
              },
              {
                title: "Meeting",
                start: new Date(2026, 3, 12, 14, 0, 0, 0),
                end: new Date(2026, 3, 12, 15, 0, 0, 0),
              },
              {
                title: "Happy Hour",
                start: new Date(2026, 3, 12, 17, 0, 0, 0),
                end: new Date(2026, 3, 12, 17, 30, 0, 0),
                desc: "Most important meal of the day",
              },
              {
                title: "Dinner",
                start: new Date(2026, 3, 12, 20, 0, 0, 0),
                end: new Date(2026, 3, 12, 21, 0, 0, 0),
              },
              {
                title: "Birthday Party",
                start: new Date(2026, 3, 13, 7, 0, 0),
                end: new Date(2026, 3, 13, 10, 30, 0),
              },
              {
                title: "Birthday Party 2",
                start: new Date(2026, 3, 13, 7, 0, 0),
                end: new Date(2026, 3, 13, 10, 30, 0),
              },
              {
                title: "Birthday Party 3",
                start: new Date(2026, 3, 13, 7, 0, 0),
                end: new Date(2026, 3, 13, 10, 30, 0),
              },
              {
                title: "Late Night Event",
                start: new Date(2026, 3, 17, 19, 30, 0),
                end: new Date(2026, 3, 18, 2, 0, 0),
              },
              {
                title: "Multi-day Event",
                start: new Date(2026, 3, 20, 19, 30, 0),
                end: new Date(2026, 3, 22, 2, 0, 0),
              },
            ],
            todayAppointments: [
              {
                id: 1,
                patientName: "John Doe",
                time: "10:00 AM",
                type: "Checkup",
                status: "Confirmed",
              },
              {
                id: 2,
                patientName: "Anna Lee",
                time: "11:00 AM",
                type: "Cleaning",
                status: "Pending",
              },
            ],
            timeline: [
              {
                time: "10:00 AM",
                patientName: "John Doe",
                type: "Checkup",
              },
              {
                time: "11:00 AM",
                patientName: "Anna Lee",
                type: "Cleaning",
              },
            ],
          },
          status: 200,
          statusText: "OK",
          headers: error.response?.headers || {},
          config: error.config,
          request: error.request,
        };
        console.log("Returning mock response for dashboard:", mockResponse);
        return Promise.resolve(mockResponse);
      } else if (path === "/patients") {
        const mockResponse = {
          data: [
            {
              id: 1,
              name: "John Doe",
              phone: "123-456-7890",
              lastVisit: "2023-10-01",
              status: "Active",
            },
            {
              id: 2,
              name: "Anna Lee",
              phone: "098-765-4321",
              lastVisit: "2023-10-02",
              status: "Inactive",
            },
          ],
          status: 200,
          statusText: "OK",
          headers: error.response?.headers || {},
          config: error.config,
          request: error.request,
        };
        console.log("Returning mock response for patients:", mockResponse);
        return Promise.resolve(mockResponse);
      } else if (path === "/business-hours") {
        const mockResponse = {
          data: [
            {
              day: "Monday",
              isClosed: false,
              slots: [{ startTime: "08:00", endTime: "17:00" }],
            },
            {
              day: "Tuesday",
              isClosed: false,
              slots: [{ startTime: "08:00", endTime: "17:00" }],
            },
            {
              day: "Wednesday",
              isClosed: false,
              slots: [{ startTime: "08:00", endTime: "13:00" }],
            },
            {
              day: "Thursday",
              isClosed: false,
              slots: [{ startTime: "09:00", endTime: "18:00" }],
            },
            {
              day: "Friday",
              isClosed: false,
              slots: [{ startTime: "09:00", endTime: "15:00" }],
            },
            { day: "Saturday", isClosed: true, slots: [] },
            { day: "Sunday", isClosed: true, slots: [] },
          ],
          status: 200,
          statusText: "OK",
          headers: error.response?.headers || {},
          config: error.config,
          request: error.request,
        };
        console.log(
          "Returning mock response for business hours:",
          mockResponse,
        );
        return Promise.resolve(mockResponse);
      }
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;
