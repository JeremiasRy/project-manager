import { Action, configureStore, ThunkAction, } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginReducer";
import projectReducer from "./reducers/projectReducer";
import taskReducer from "./reducers/taskReducer";

let preAccessToken:string = "";
const accessToken = localStorage.getItem("access_token");

if (preAccessToken === "") {
  preAccessToken = JSON.parse(accessToken as string);
}

const preLoadedState = {
  login: preAccessToken
}

const saveState = (state:RootState) => {
  try {
    const accesToken = JSON.stringify(state.login);
    localStorage.setItem("access_token", accesToken);
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