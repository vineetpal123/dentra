// Dashboard.tsx
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import * as S from "./dashboard.styled";
import AppointmentFormDialog from "../components/AppointmentFormDialog";
import { useDispatch, useSelector } from "react-redux";

import { fetchDashboardRequest } from "../store/dashboard/slice";
import { selectDashboardData } from "../store/dashboard/selectors";

const localizer = momentLocalizer(moment);

const initialEvents = [
  {
    id: 1,
    title: "John Doe - Checkup",
    start: new Date(2026, 3, 21, 10, 0),
    end: new Date(2026, 3, 21, 11, 0),
    patient: "John Doe",
    type: "Checkup",
  },
  {
    id: 2,
    title: "Anna Lee - Cleaning",
    start: new Date(2026, 2, 21, 12, 0),
    end: new Date(2026, 2, 21, 13, 0),
    patient: "Anna Lee",
    type: "Cleaning",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDashboardRequest());
  }, [dispatch]);
  const { summary, calendar, todayAppointments, timeline } =
    useSelector(selectDashboardData) || {};

  const [openForm, setOpenForm] = useState(false);

  return (
    <S.Container>
      <S.HeaderRow>
        <S.Title>Dashboard</S.Title>
        <S.AddBtn onClick={() => setOpenForm(true)}>+ New Appointment</S.AddBtn>
      </S.HeaderRow>

      <S.Cards>
        <S.Card onClick={() => (window.location.href = "/appointments")}>
          <S.CardTitle>Today's Appointments</S.CardTitle>
          <S.CardValue>{summary.todayAppointments || 0}</S.CardValue>
        </S.Card>
        <S.Card>
          <S.CardTitle>New Patients</S.CardTitle>
          <S.CardValue>{summary.newPatients || 0}</S.CardValue>
        </S.Card>
        <S.Card>
          <S.CardTitle>Pending Cancellations</S.CardTitle>
          <S.CardValue>{summary.pendingCancellations || 0}</S.CardValue>
        </S.Card>
      </S.Cards>

      <S.Section>
        <S.SectionTitle>Schedule Overview</S.SectionTitle>

        <S.ContentRow>
          <S.CalendarWrapper>
            <Calendar
              localizer={localizer}
              events={calendar}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 420 }}
              selectable
              onSelectEvent={(event) => {
                setOpenForm(true);
                //openEdit(event)
              }}
              onSelectSlot={(slot) => {
                //openForm({ start: slot.start, end: slot.end })
                setOpenForm(true);
              }}
            />
          </S.CalendarWrapper>

          <S.AppointmentsBox>
            {timeline.slice(0, 5).map((item) => (
              <S.AppointmentItem
                key={item.id}
                onClick={() => {
                  setOpenForm(true);
                  //openEdit(item)
                }}
              >
                <S.UserInfo>
                  <S.Avatar />
                  <div>
                    <strong>{item.patientName}</strong>
                    <S.SubText>Dental Care</S.SubText>
                  </div>
                </S.UserInfo>
                <S.Badge>{item.type}</S.Badge>
              </S.AppointmentItem>
            ))}

            <S.ViewAll onClick={() => (window.location.href = "/appointments")}>
              View All →
            </S.ViewAll>
          </S.AppointmentsBox>
        </S.ContentRow>
      </S.Section>

      <S.TableSection>
        <S.TableTitle>Today's Schedule</S.TableTitle>
        {todayAppointments.map((item) => (
          <S.TimeRow key={item.id}>
            <S.Time>{item.time}</S.Time>
            <S.TimeContent>
              {item.patientName} - {item.type}
              <S.Actions>
                <S.ActionBtn
                  onClick={() => {
                    setOpenForm(true);
                    //openEdit(item)
                  }}
                >
                  Edit
                </S.ActionBtn>
                <S.ActionBtn danger>Cancel</S.ActionBtn>
              </S.Actions>
            </S.TimeContent>
          </S.TimeRow>
        ))}
      </S.TableSection>
      {/* FORM DIALOG */}
      <AppointmentFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
      />
    </S.Container>
  );
};

export default Dashboard;
