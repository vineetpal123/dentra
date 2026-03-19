import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import appointmentReducer from './appointments/slice';
import appointmentSaga from './appointments/saga';
import { all } from 'redux-saga/effects';

function* rootSaga() { yield all([appointmentSaga()]); }

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { appointments: appointmentReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
