import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { GET_REQUEST, POST_REQUEST, PUT_REQUEST, DELETE_REQUEST } from '../../services/apiHelper';
import {
  fetchPatientsRequest,
  fetchPatientsSuccess,
  fetchPatientsFailure,
  addPatientRequest,
  addPatientSuccess,
  addPatientFailure,
  updatePatientRequest,
  updatePatientSuccess,
  updatePatientFailure,
} from './slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { Patient } from './slice';
import API_ENDPOINTS from '../../services/apiEndPoint';
import { showSnackbar } from '../appointments/slice';
import { hideFormDialog, hideLoader, showLoader } from '../global/slice';

function* fetchPatientsSaga() {
  try {
    yield put(showLoader());
    const response: { data: Patient[] } = yield call(GET_REQUEST, API_ENDPOINTS.PATIENTS.GET_ALL);

    const { patients } = response.data || {};

    console.log('Fetched patients saga:', patients);

    yield put(fetchPatientsSuccess(patients || []));
  } catch (error: any) {
    yield put(fetchPatientsFailure('Unable to fetch patients'));
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

function* addPatientSaga(action: PayloadAction<Patient>) {
  try {
    yield put(showLoader());
    
   
    const response: { data: Patient } = yield call(
      POST_REQUEST,
      API_ENDPOINTS.PATIENTS.CREATE,
      action.payload
    );
    yield put(addPatientSuccess(response.data));
    yield put(
      showSnackbar({
        message: 'Patient added successfully',
        severity: 'success',
      })
    );
    yield put(hideFormDialog());
  } catch (error: any) {
    yield put(addPatientFailure('Failed to add patient'));
    yield put(
      showSnackbar({
        message: error?.message || 'Failed to create patient',
        severity: 'error',
      })
    );
  } finally {
    
    yield put(hideLoader());
  }
}

function* updatePatientSaga(action: PayloadAction<Patient>) {
  try {
    yield put(showLoader());
    console.log('Updating patient saga with data:', action.payload);
    const id = action.payload['_id'];
    console.log('Updating patient saga with id:', id);

    const body = {
      name: action.payload.name,
      phone: action.payload.phone,
      age: action.payload.age,
      gender: action.payload.gender
    }
    console.log('Updating patient saga with body:', body);

    
    const response: { data: Patient } = yield call(
      PUT_REQUEST,
      API_ENDPOINTS.PATIENTS.UPDATE(id),
      body
    );
    yield put(updatePatientSuccess(response.data));
    yield put(
      showSnackbar({
        message: 'Patient updated successfully',
        severity: 'success',
      })
    );
    yield put(hideFormDialog());
  } catch (error: any) {
    yield put(updatePatientFailure('Failed to update patient'));
    yield put(
      showSnackbar({
        message: error?.message || 'Failed to update patient',
        severity: 'error',
      })
    );
  } finally {
    
    yield put(hideLoader());
  }
}

export default function* patientSaga() {
  yield all([
    takeLatest(fetchPatientsRequest.type, fetchPatientsSaga),
    takeLatest(addPatientRequest.type, addPatientSaga),
    takeLatest(updatePatientRequest.type, updatePatientSaga),
  ]);
}
