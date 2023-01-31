import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { ProjectProps } from "../../type/Project";

const initialState: ProjectProps[] = [];

export const fetchProjectBasedOnUser = createAsyncThunk(
    'fetchProjectBasedOnUser',
    async (id:number) => {
        try{
            const res = await axios.get(`https://localhost:7050/api/Project/user/${id}`)
            return res.data
        } catch (e){
            console.log(e)
        }
    }
)
export const fetchAllProjects = createAsyncThunk(
    'getAll',
    async () => {
        try {
            const res = await axios.get('https://localhost:7050/api/Project')
            return res.data
        } catch (e) {
            console.log(e)
        }
    }
)

const projectSlice = createSlice({
    name: 'projectSlice',
    initialState,
    reducers:{},
    extraReducers: (build) => {
        build.addCase(fetchProjectBasedOnUser.fulfilled, (state,action) => {
            if (action.payload && "message" in action.payload) {
                return state
              } else if (!action.payload) {
                return state
              }
              return action.payload
        }).addCase(fetchAllProjects.fulfilled, (state, action) => {
            if (action.payload && "message" in action.payload) {
                return state
              } else if (!action.payload) {
                return state
              }
              console.log(action.payload)
              return action.payload
        })
    }
})

const projectReducer = projectSlice.reducer;
export default projectReducer;