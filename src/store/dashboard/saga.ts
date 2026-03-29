import { call, put, takeLatest, all, select } from "redux-saga/effects";
import { GET_REQUEST } from "../../services/apiHelper";
import {
  fetchDashboardSuccess,
  fetchDashboardFailure,
  DashboardState,
  fetchDashboardRequest,
} from "./slice";
import { showSnackbar } from "../appointments/slice";
import API_ENDPOINTS from "../../services/apiEndPoint";

function* fetchDashboardSaga() {
  try {
    const response: { data: DashboardState[] } = yield call(
      GET_REQUEST,
      API_ENDPOINTS.DASHBOARD.GET,
    );
    console.log("Dashboard data from API:fetchDashboardSaga", response.data);
    yield put(fetchDashboardSuccess(response.data));
  } catch (error: any) {
    yield put(fetchDashboardFailure("Unable to fetch dashboard data"));
    yield put(
      showSnackbar({
        message: error?.message || "Failed to fetch",
        severity: "error",
      }),
    );
  }
}

export default function* dashboardSaga() {
  yield all([takeLatest(fetchDashboardRequest.type, fetchDashboardSaga)]);
}
