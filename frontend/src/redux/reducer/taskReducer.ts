import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { TaskProps } from "../../type/Task";

const initialState: TaskProps[] = [];

export const fetchTaskBasedOnProject = createAsyncThunk(
    'fetchTaskBasedOnProject',
    async (id:number) => {
        try{
            const res = await axios.get(`/api/Task/user/${id}`)
            return res.data
        } catch (e){
            console.log(e)
        }
    }
)

export const deleteTask = createAsyncThunk(
    'deleteTask',
    async (id:number) => {
        try{
            const res = await axios.delete(`/api/Task/${id}`)
            return res.data
        } catch(e){
            console.log(e)
        }
    }
)

const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers:{},
    extraReducers: (build) => {
        build.addCase(fetchTaskBasedOnProject.fulfilled, (state,action) => {
            if(action.payload && 'message' in action.payload){
                console.log("error in fetching tasks")
                return state
            }else if (!action.payload){
                return state
            }else{
                return action.payload
            }
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
            if(!action.payload) {
                return state
            }
            if(action.payload && 'message' in action.payload) {
                console.log('Error in deleting product')
                return state
            }else {
                return action.payload
            }
        })
    }
})

const taskReducer = taskSlice.reducer;
export default taskReducer;
