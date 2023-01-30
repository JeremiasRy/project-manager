import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { LoginDataType, RegisterDataType } from "../../type/Authenticate";
import { UserProps } from "../../type/User";

export const authenticateUser = createAsyncThunk(
    'authenticateUser',
    async (token:string) => {
        try{
            const res = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
        localStorage.setItem("userInfo", JSON.stringify(res.data))
        return res.data
        }catch (e){
            console.log(e)
        }
})

export const loginUser = createAsyncThunk(
    "loginUser",
    async ({email, password}:LoginDataType, thunkAPI) => {
        try{
            const res = await axios.post( "https://api.escuelajs.co/api/v1/auth/login",
            {
              email: email,
              password: password,
            }
            )
            const data: {token: string} = res.data
            await thunkAPI.dispatch(authenticateUser(data.token))
            return data.token
        }catch(e){
            console.log(e)
        }
   }
)

export const createUser = createAsyncThunk(
    "createUser",
    async ({email, password}:RegisterDataType) => {
        try{
            const res = await axios.post("https://api.escuelajs.co/api/v1/users/",
            {
                email: email,
                password: password,
            }
            )
            return res.data
        }catch(e){
            console.log(e)
        }
    }
)

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