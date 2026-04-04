import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import appointmentReducer from "./appointments/slice";
import appointmentSaga from "./appointments/saga";
import dashboardReducer from "./dashboard/slice";
import dashboardSaga from "./dashboard/saga";
import patientReducer from "./patients/slice";
import patientSaga from "./patients/saga";
import globalReducer from "./global/slice";

import { all } from "redux-saga/effects";
import businessHoursSaga from "./businessHours/saga";
import businessHoursReducer from "./businessHours/slice";

import settingsSaga from "./settings/saga";
import settingsReducer from "./settings/slice";
import loginReducer from "./login/slice";
import loginSaga from "./login/saga";

function* rootSaga() {
  yield all([
    appointmentSaga(),
    dashboardSaga(),
    patientSaga(),
    businessHoursSaga(),
    settingsSaga(),
    loginSaga(),
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
    dashboard: dashboardReducer,
    patients: patientReducer,
    businessHours: businessHoursReducer,
    settings: settingsReducer,
    login: loginReducer,
    global: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
