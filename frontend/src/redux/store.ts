import { Action, configureStore, ThunkAction, } from "@reduxjs/toolkit";
import projectReducer from "./reducers/projectReducer";
import taskReducer from "./reducers/taskReducer";

export const createStore = () => {
    return configureStore({
        reducer: {
            project: projectReducer,
            task: taskReducer
        },
    });
  }
export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;