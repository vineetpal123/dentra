import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { GET_REQUEST, POST_REQUEST, PUT_REQUEST, DELETE_REQUEST } from '../../services/apiHelper';
import {
  fetchSettingsRequest,
  fetchSettingsSuccess,
  fetchSettingsFailure,
  addSettingsRequest,
  addSettingsSuccess,
  addSettingsFailure,
  Settings,
} from './slice';
import { PayloadAction } from '@reduxjs/toolkit';

import API_ENDPOINTS from '../../services/apiEndPoint';

import { isOverlapping, isWithinBusinessHours } from '../../utils/appointment.utils';
import { showSnackbar } from '../appointments/slice';
import { hideLoader, showLoader } from '../global/slice';

function* fetchSettingsSaga() {
  try {
    yield put(showLoader());
    const response: { data: Settings } = yield call(GET_REQUEST, API_ENDPOINTS.SETTINGS.GET);

    console.log('Fetched settings saga:', response.data);

    yield put(fetchSettingsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchSettingsFailure('Unable to fetch settings  data'));
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

export default function* settingsSaga() {
  yield all([takeLatest(fetchSettingsRequest.type, fetchSettingsSaga)]);
}
