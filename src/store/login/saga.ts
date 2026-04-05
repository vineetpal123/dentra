import { call, delay, put, takeEvery } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  sentOtpSuccess,
  sendOtpFailure,
  sendOtpRequest,
} from './slice';
import { AxiosResponse } from 'axios';
import axiosInstance from '../../services/axiosInstance';
import API_ENDPOINTS from '../../services/apiEndPoint';
import { POST_REQUEST } from '../../services/apiHelper';
import { hideLoader, showLoader } from '../global/slice';

function* sendOtp(action: any): any {
  try {
    yield put(showLoader());
    const { mobile } = action.payload;

    yield call(POST_REQUEST, API_ENDPOINTS.AUTH.SEND_OTP, { mobile });

    console.log('OTP sent to:', mobile);
    yield put(sentOtpSuccess());
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Failed to send OTP';
    yield put(sendOtpFailure(errorMessage));
  } finally {
    yield put(hideLoader());
  }
}

function* handleLogin(action: any): any {
  try {
    yield put(showLoader());
    const { mobile, otp } = action.payload;

    // const response: AxiosResponse = yield call(
    //   POST_REQUEST,
    //   API_ENDPOINTS.AUTH.LOGIN,
    //   { mobile, otp },
    // );

    yield delay(2000); // Simulate network delay

    const response = {
      data: {
        token: 'fake-jwt-token',
        user: {
          id: '123',
          email: 'user@example.com',
        },
      },
    };

    const { token, user } = response.data;

    yield put(loginSuccess({ token, user }));
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Login failed';
    yield put(loginFailure(errorMessage));
  } finally {
    yield put(hideLoader());
  }
}

export function* loginSaga() {
  yield takeEvery(loginRequest.type, handleLogin);
  yield takeEvery(sendOtpRequest.type, sendOtp);
}

export default loginSaga;
