import { call, put, takeLatest, all, select } from "redux-saga/effects";
import {
  GET_REQUEST,
  POST_REQUEST,
  PUT_REQUEST,
  DELETE_REQUEST,
} from "../../services/apiHelper";
import {
  fetchPatientsRequest,
  fetchPatientsSuccess,
  fetchPatientsFailure,
  addPatientRequest,
  addPatientSuccess,
  addPatientFailure,
} from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { Patient } from "./slice";
import API_ENDPOINTS from "../../services/apiEndPoint";
import { selectAppointments } from "./selectors";
import {
  isOverlapping,
  isWithinBusinessHours,
} from "../../utils/appointment.utils";
import { showSnackbar } from "../appointments/slice";

function* fetchPatientsSaga() {
  try {
    const response: { data: Patient[] } = yield call(
      GET_REQUEST,
      API_ENDPOINTS.PATIENTS.GET_ALL,
    );

    console.log("Fetched patients saga:", response.data);

    yield put(fetchPatientsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchPatientsFailure("Unable to fetch patients"));
    yield put(
      showSnackbar({
        message: error?.message || "Failed to fetch",
        severity: "error",
      }),
    );
  }
}

export default function* patientSaga() {
  yield all([takeLatest(fetchPatientsRequest.type, fetchPatientsSaga)]);
}
