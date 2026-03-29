import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import appointmentReducer from "./appointments/slice";
import appointmentSaga from "./appointments/saga";
import dashboardReducer from "./dashboard/slice";
import dashboardSaga from "./dashboard/saga";
import patientReducer from "./patients/slice";
import patientSaga from "./patients/saga";

import { all } from "redux-saga/effects";
import businessHoursSaga from "./businessHours/saga";
import businessHoursReducer from "./businessHours/slice";

function* rootSaga() {
  yield all([
    appointmentSaga(),
    dashboardSaga(),
    patientSaga(),
    businessHoursSaga(),
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
    dashboard: dashboardReducer,
    patients: patientReducer,
    businessHours: businessHoursReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
