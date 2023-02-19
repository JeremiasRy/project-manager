import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EditProject, AddProject, Project } from "../../types/project";
import axios from "axios";
import { Assign } from "../../types/assign";
import { login } from "./loginReducer";
import { useAppSelector } from "../../hooks/reduxHook";
import { RootState } from "../store";

const initialState: Project[] | Project = [];

const productReducer = createSlice({
    name: "projectReducer",
    initialState,
    reducers: {

    }, extraReducers: (builder) => {
        builder.addCase(getProjects.fulfilled, (_, action) => {
            return action.payload;
        })
        .addCase(getProjectsByUser.fulfilled, (_, action) => {
            return action.payload;
        })
        .addCase(getProjectById.fulfilled, (_, action) => {
            return action.payload;
        })
    }
});

export default productReducer.reducer;

export const getProjects = createAsyncThunk(
    "getProjects",
    async (_, thunkAPI) => {
        try {
            let state = thunkAPI.getState() as RootState;
            let result = await axios.get("https://localhost:7050/api/Project", { headers: { Authorization: state.login.access_token } })
            let data = result.data.value
            if (data.hasOwnProperty("detail")) {
                throw new Error(data.detail);
            }
            return data;
        } catch (e:any) {
            console.log(e);
        }
    }
)
export const getProjectsByUser = createAsyncThunk(
    "getProjectsByUser",
    async (id:number) => {
        try {
            let result = await axios.get(`https://localhost:7050/api/Project/User/${id}`)
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
export const getProjectById = createAsyncThunk(
    "getProjectById",
    async (id:number) => {
        try {
            let result = await axios.get(`https://localhost:7050/api/Project/${id}`)
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
export const assignProjectToUser = createAsyncThunk(
    "assignProjectToUser",
    async (assign:Assign, thunkAPI) => {
        try {
            let result = await axios.post("https://localhost:7050/api/Project/assign", assign);
            let data = result.data.value;
            if (data.hasOwnProperty("detail")) {
                throw new Error(data.detail);
            }
            //Notify succesfully assigned
            thunkAPI.dispatch(getProjectById(assign.assignId));
        } catch (e:any) {
            console.log(e);
        }
    }
)
export const addProject = createAsyncThunk(
    "addProject",
    async (newProject:AddProject, thunkAPI) => {
        try {
            let result = await axios.post("https://localhost:7050/api/Project", newProject);
            let data = result.data.value;
            if (data.hasOwnProperty("detail")) {
                throw new Error(data.detail);
            }
            console.log(data);
            //Notify succesfully added
            if (newProject.usersIds !== null) {
                newProject.usersIds.forEach(async id => {
                    await axios.post("https://localhost:7050/api/Project/assign", {userId: id, assignId: data.projectId});
                })
            }
            thunkAPI.dispatch(getProjects());
        } catch (e:any) {
            console.log(e);
        }
    }
)
export const deleteProject = createAsyncThunk(
    "deleteProject",
    async (id:number, thunkAPI) => {
        try {
            let result = await axios.delete(`https://localhost:7050/api/Project/${id}`);
            let data = result.data.value;
            if (data.hasOwnProperty("detail")) {
                throw new Error(data.detail);
            }
            //notify succesful delete
            thunkAPI.dispatch(getProjects());
        } catch (e:any) {
            console.log(e);
        }
    }
)
export const updateProject = createAsyncThunk(
    "updateProject",
    async (upProject:EditProject, thunkAPI) => {
        try {
            let result = await axios.put(`https://localhost:7050/api/Project`, upProject);
            let data = result.data.value;
            if (data.hasOwnProperty("detail")) {
                throw new Error(data.detail);
            }
            //notify succesful update
            thunkAPI.dispatch(getProjectById(upProject.projectId));
        } catch (e:any) {
            console.log(e);
        } 
    }
)
export const completeProject = createAsyncThunk(
    "completeProject",
    async (id:number, thunkAPI) => {
        try {
            let result = await axios.post(`https://localhost:7050/api/Project/${id}`);
            let data = result.data.value;
            if (data.hasOwnProperty("detail")) {
                throw new Error(data.detail);
            }
            //notify completion
            thunkAPI.dispatch(getProjectById(id));
        } catch (e:any) {
            console.log(e);
        }
        
    }
)
