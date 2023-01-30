import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { ProjectProps } from "../../type/Project";

const initialState: ProjectProps[] = [];

export const fetchProjectBasedOnUser = createAsyncThunk(
    'fetchProjectBasedOnUser',
    async (id:number) => {
        try{
            const res = await axios.get(`https://api.escuelajs.co/api/v1/categories/${id}/products`)
            return res.data
        } catch (e){
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
        })
    }
})

const projectReducer = projectSlice.reducer;
export default projectReducer;