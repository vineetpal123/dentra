import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { GET_REQUEST, POST_REQUEST, PUT_REQUEST, DELETE_REQUEST } from '../../services/apiHelper';
import {
  fetchAppointmentsRequest,
  fetchAppointmentsSuccess,
  fetchAppointmentsFailure,
  addAppointmentRequest,
  addAppointmentSuccess,
  addAppointmentFailure,
  updateAppointmentRequest,
  updateAppointmentSuccess,
  updateAppointmentFailure,
  deleteAppointmentRequest,
  deleteAppointmentSuccess,
  deleteAppointmentFailure,
  showSnackbar,
} from './slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { Appointment } from './slice';
import API_ENDPOINTS from '../../services/apiEndPoint';
import { selectAppointments } from './selectors';
import { isOverlapping, isWithinBusinessHours } from '../../utils/appointment.utils';
import { hideFormDialog, hideLoader, showLoader } from '../global/slice';

function* fetchAppointmentsSaga() {
  try {
    yield put(showLoader());
    const response: { data: Appointment[] } = yield call(
      GET_REQUEST,
      API_ENDPOINTS.APPOINTMENTS.GET_ALL
    );

    const { appointments } = response.data || {};

    yield put(fetchAppointmentsSuccess(appointments || []));
  } catch (error: any) {
    yield put(fetchAppointmentsFailure('Unable to fetch appointments'));
    yield put(
      showSnackbar({
        message: error?.message || 'Failed to fetch',
        severity: 'error',
      })
    );
  } finally {
    yield put(hideLoader());
  }
}

function* addAppointmentSaga(action: PayloadAction<Appointment>) {
  try {
    yield put(showLoader());
    const existingAppointments: Appointment[] = yield select(selectAppointments);

    // const hasConflict = existingAppointments.some((appt) => isOverlapping(action.payload, appt));

    // if (hasConflict) {
    //   yield put(
    //     showSnackbar({
    //       message: 'Doctor already has an appointment at this time',
    //       severity: 'error',
    //     })
    //   );
    //   return;
    // }

    // if (!isWithinBusinessHours(action.payload.time)) {
    //   yield put(
    //     showSnackbar({
    //       message: `Appointments can only be scheduled between 09:00 and 18:00`,
    //       severity: 'error',
    //     })
    //   );
    //   return;
    // }

    const body = {
      patient: {
        name: action.payload.patientName,
        phone: action.payload.phone,
      },
      doctorId: action?.payload?.doctorId,
      patientId: action?.payload?.patientId,
      date: action.payload.date,
      startTime: action.payload.startTime,
    };

    console.log('body', body);
    const response: { data: Appointment } = yield call(
      POST_REQUEST,
      API_ENDPOINTS.APPOINTMENTS.CREATE,
      body
    );

    console.log('response', response);

    yield put(addAppointmentSuccess(response.data));

    yield put(
      showSnackbar({
        message: 'Appointment added successfully',
        severity: 'success',
      })
    );
    yield put(hideFormDialog());
  } catch (error: any) {
    console.log('error-------', error);
    yield put(addAppointmentFailure('Failed to add appointment'));
    yield put(
      showSnackbar({
        message: error?.message || 'Failed to create appointment',
        severity: 'error',
      })
    );
  } finally {
    yield put(hideLoader());
  }
}

function* updateAppointmentSaga(action: PayloadAction<Appointment>) {
  try {
    yield put(showLoader());
    const existingAppointments: Appointment[] = yield select(selectAppointments);

    const hasConflict = existingAppointments.some((appt) => isOverlapping(action.payload, appt));
    if (hasConflict) {
      yield put(
        showSnackbar({
          message: 'Doctor already has an appointment at this time',
          severity: 'error',
        })
      );
      return;
    }

    if (!isWithinBusinessHours(action.payload.time)) {
      yield put(
        showSnackbar({
          message: `Appointments can only be scheduled between 09:00 and 18:00`,
          severity: 'error',
        })
      );
      return;
    }
    const response: { data: Appointment } = yield call(
      PUT_REQUEST,
      API_ENDPOINTS.APPOINTMENTS.UPDATE(action.payload.id),
      action.payload
    );

    yield put(updateAppointmentSuccess(response.data));
    yield put(
      showSnackbar({
        message: 'Appointment updated successfully',
        severity: 'success',
      })
    );
  } catch (error: any) {
    yield put(updateAppointmentFailure('Failed to update appointment'));
    yield put(
      showSnackbar({
        message: error?.message || 'Failed to update appointment',
        severity: 'error',
      })
    );
  } finally {
    yield put(hideLoader());
  }
}

function* deleteAppointmentSaga(action: PayloadAction<number>) {
  try {
    yield put(showLoader());
    alert('Deleting appointment with ID: ' + action.payload);
    yield call(DELETE_REQUEST, API_ENDPOINTS.APPOINTMENTS.DELETE(action.payload));
    yield put(deleteAppointmentSuccess(action.payload));

    yield put(
      showSnackbar({
        message: 'Appointment deleted successfully',
        severity: 'error',
      })
    );

    yield put(fetchAppointmentsRequest());
  } catch (error: any) {
    yield put(deleteAppointmentFailure(error.message || 'Failed to delete appointment'));
  } finally {
    yield put(hideLoader());
  }
}

export default function* appointmentSaga() {
  yield all([
    takeLatest(fetchAppointmentsRequest.type, fetchAppointmentsSaga),
    takeLatest(addAppointmentRequest.type, addAppointmentSaga),
    takeLatest(updateAppointmentRequest.type, updateAppointmentSaga),
    takeLatest(deleteAppointmentRequest.type, deleteAppointmentSaga),
  ]);
}
