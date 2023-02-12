import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { LoggedIn, SignInCredentials } from "../../types/user";

const initialState:LoggedIn = {user: null, access_token: null}

const loginReducer = createSlice({
    name: "loginReducer",
    initialState,
    reducers: {
        logout: () => {
            return {user: null, access_token: null};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (_, action) => {
            action.payload.access_token = `Bearer ${action.payload.access_token}`
            return action.payload;
        })
    }
})

export default loginReducer.reducer;
export const { logout } = loginReducer.actions;

export const login = createAsyncThunk(
    "login",
    async (credentials:SignInCredentials, thunkAPI) => {
        try {
            let result = await axios.post("https://localhost:7050/api/User/login", credentials);
            let data = result.data.value;
            if (data.hasOwnProperty("detail")) {
                throw new Error(data.detail);
            }
            return data;
            //dispatch getUser notify login
        } catch (e:any) {
            console.log(e);
        }
    }
)
