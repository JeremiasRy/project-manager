import { Action, configureStore, ThunkAction, } from "@reduxjs/toolkit";
import projectReducer from "./reducers/projectReducer";

export const createStore = () => {
    return configureStore({
        reducer: {
            project: projectReducer
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