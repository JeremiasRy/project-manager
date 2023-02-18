import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types/user";

const initialState: User[] | User = [];

const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        filterOutUser(state, action:{payload:number}) {
            return state.filter(user => user.userId !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (_, action) => {
            return action.payload;
        })
        .addCase(getUser.fulfilled, (_, action) => {
            return action.payload;
        })

    }
})

export default userReducer.reducer;
export const { filterOutUser } = userReducer.actions;

export const getUsers = createAsyncThunk(
    "getUsers",
    async () => {
        try {
            let result = await axios.get("https://localhost:7050/api/User");
            let data = result.data.value;
            if (data.hasOwnProperty("detail")) {
                throw new Error(data.detail);
            }
            return data;
        } catch (e:any) {
            console.log(e);
        }
    } 
)
export const getUser = createAsyncThunk(
    "getUser",
    async (id:number) => {
        try {
            let result = await axios.get(`https://localhost:7050/api/User/${id}`);
            let data = result.data.value;
            if (data.hasOwnProperty("detail")) {
                throw new Error(data.detail);
            }
            return data;
        } catch (e:any) {
            console.log(e);
        }
    }
)
