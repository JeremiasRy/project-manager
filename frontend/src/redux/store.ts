import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import projectReducer from './reducer/projectReducer';
import taskReducer from './reducer/taskReducer';
import userReducer from './reducer/userReducer';

export const store = configureStore({
  reducer: {
    projectReducer,
    userReducer,
    taskReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
