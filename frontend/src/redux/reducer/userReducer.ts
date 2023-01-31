import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { UserProps } from "../../type/User";

export const authenticateUser = createAsyncThunk(
    'authenticateUser',
    async (token:string|null) => {
        try{
            const res = await axios.get('https://localhost:7050/', {
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
        return res.data
        }catch (e){
            console.log(e)
        }
})

const initialState: UserProps | null =  (()=> {
    const data = localStorage.getItem('user');
    if(data) {
        return JSON.parse(data)
    } else {
        return null
    }
})()



const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        logout(state) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')
            return state = null
        }
    },
    extraReducers: (build) => {
        build.addCase(authenticateUser.fulfilled, (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload));
            return action.payload
        });
    }
})

const userReducer = userSlice.reducer;
export default userReducer
export const {logout} = userSlice.actions