import { call, put, takeLatest, all, select } from "redux-saga/effects";
import {
  GET_REQUEST,
  POST_REQUEST,
  PUT_REQUEST,
  DELETE_REQUEST,
} from "../../services/apiHelper";
import {
  fetchBusinessHoursRequest,
  fetchBusinessHoursSuccess,
  fetchBusinessHoursFailure,
  addBusinessHoursRequest,
  addBusinessHoursSuccess,
  addBusinessHoursFailure,
} from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { BusinessDay } from "./slice";
import API_ENDPOINTS from "../../services/apiEndPoint";

import {
  isOverlapping,
  isWithinBusinessHours,
} from "../../utils/appointment.utils";
import { showSnackbar } from "../appointments/slice";

function* fetchBusinessHoursSaga() {
  try {
    const response: { data: BusinessDay[] } = yield call(
      GET_REQUEST,
      API_ENDPOINTS.BUSINESS_HOURS.GET_ALL,
    );

    console.log("Fetched business hours saga:", response.data);

    yield put(fetchBusinessHoursSuccess(response.data));
  } catch (error: any) {
    yield put(fetchBusinessHoursFailure("Unable to fetch business hours"));
    yield put(
      showSnackbar({
        message: error?.message || "Failed to fetch",
        severity: "error",
      }),
    );
  }
}

export default function* businessHoursSaga() {
  yield all([
    takeLatest(fetchBusinessHoursRequest.type, fetchBusinessHoursSaga),
  ]);
}
