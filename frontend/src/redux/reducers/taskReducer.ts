import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Assign } from "../../types/assign";
import { Task, AddTask, EditTask } from "../../types/task";


const initialState: Task[] | Task = [];

const taskReducer = createSlice({
    name: "taskReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getTasks.fulfilled, (_, action) => {
            return action.payload;
        })
        .addCase(getTask.fulfilled, (_, action) => {
            return action.payload;
        })
    }
})

export default taskReducer.reducer;

export const getTasks = createAsyncThunk(
    "getTasks",
    async () => {
        try {
            let result = await axios.get("https://localhost:7050/api/Task");
            let data = result.data.value;
            if (data.hasOwnProperty("detail")) {
                throw new Error(data.detail)
            }
            return data;
        } catch(e:any) {
            console.log(e);
        }
    }
)
export const getTask = createAsyncThunk(
    "getTask",
    async (id:number) => {
        try {
            let result = await axios.get(`https://localhost:7050/api/Task/${id}`);
            let data = result.data.value;
            if (data.hasOwnProperty("detail")) {
                throw new Error(data.detail)
            }
            return [data];
        } catch(e:any) {
            console.log(e);
        }
    }
)
export const addTask = createAsyncThunk(
    "addTask",
    async (newTask:AddTask, thunkAPI) => {
        try {
            let result = await axios.post("https://localhost:7050/api/Task", newTask);
            let data = result.data.value;
            if (data.hasOwnProperty("detail")) {
                throw new Error(data.detail);
            }
            //notify succesfull add
            thunkAPI.dispatch(getTasks());
        } catch (e:any) {
            console.log(e);
        }
    }
)
export const editTask = createAsyncThunk(
    "editTask",
    async (upTask:EditTask, thunkAPI) => {
        try {
            let result = await axios.put("https://localhost:7050/api/Task", upTask);
            let data = result.data.value;
            if (data.hasOwnProperty("detail")) {
                throw new Error(data.detail);
            }
            //notify succesfull edit
            thunkAPI.dispatch(getTask(upTask.taskId));
        } catch (e:any) {
            console.log(e);
        }
    }
)
export const assignTask = createAsyncThunk(
    "assignTask",
    async (assign:Assign, thunkAPI) => {
        try {
            let result = await axios.post("https://localhost:7050/api/Task/assign", assign);
            let data = result.data.value;
            if (data.hasOwnProperty("detail")) {
                throw new Error(data.detail);
            }
            //notify succesfull assignment
            thunkAPI.dispatch(getTask(assign.assignId));
        } catch (e:any) {
            console.log(e);
        }
    }
)
export const deleteTask = createAsyncThunk(
    "deleteTask",
    async (id:number, thunkAPI) => {
        try {
            let result = await axios.delete(`https://localhost:7050/api/Task/${id}`);
            let data = result.data.value;
            if (data.hasOwnProperty("detail")) {
                throw new Error(data.detail);
            }
            //notify succesful delete
            thunkAPI.dispatch(getTasks());
        } catch (e:any) {
            console.log(e);
        }
    }
)
export const completeTask = createAsyncThunk(
    "completeTask",
    async (id:number, thunkAPI) => {
        try {
            let result = await axios.post(`https://localhost:7050/api/Task/complete/${id}`);
            let data = result.data.value;
            if (data.hasOwnProperty("detail")) {
                throw new Error(data.detail);
            }
            //notify successful completion
            thunkAPI.dispatch(getTask(id));
        } catch (e:any) {
            console.log(e)
        }
    }
)
