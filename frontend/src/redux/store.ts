import { Action, configureStore, ThunkAction, } from "@reduxjs/toolkit";
import { LoggedIn } from "../types/user";
import loginReducer from "./reducers/loginReducer";
import projectReducer from "./reducers/projectReducer";
import taskReducer from "./reducers/taskReducer";

let preLoggedIn:LoggedIn = {user: null, access_token: null}

const loggedIn = localStorage.getItem("logged_in");

if (preLoggedIn.user === null || preLoggedIn.access_token === null) {
  preLoggedIn = JSON.parse(loggedIn as string);
}

const preLoadedState = {
  login: preLoggedIn
}

const saveState = (state:RootState) => {
  try {
    const accesToken = JSON.stringify(state.login);
    localStorage.setItem("logged_in", accesToken);
  } catch (e:any) {
    throw new Error(e);
  }
}

export const createStore = () => {
    return configureStore({
        reducer: {
            project: projectReducer,
            task: taskReducer,
            login: loginReducer
        }, 
        preloadedState: preLoadedState
    });
  }
export const store = createStore();

store.subscribe(() => saveState(store.getState()))

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;