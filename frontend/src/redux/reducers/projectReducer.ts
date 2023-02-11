import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddProject, Project } from "../../types/project";
import axios from "axios";
import { Assign } from "../../types/assign";

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
        .addCase(assignProjectToUser.fulfilled, (state, _) => {
            return state;
        })
        .addCase(addProject.fulfilled, (state) => {
            return state;
        })
    }
});

export default productReducer.reducer;

export const getProjects = createAsyncThunk(
    "getProjects",
    async () => {
        try {
            let result = await axios.get("https://localhost:7050/api/Project")
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
    async (assign:Assign) => {
        try {
            let result = await axios.post("https://localhost:7050/api/Project/assign", assign);
            let data = result.data.value;
            if (data.hasOwnProperty("detail")) {
                throw new Error(data.detail);
            }
            console.log(data);
        } catch (e:any) {
            console.log(e);
        }
    }
)
export const addProject = createAsyncThunk(
    "addProject",
    async (newProject:AddProject) => {
        try {
            let result = await axios.post("https://localhost:7050/api/Project", newProject);
            let data = result.data.value;
            if (data.hasOwnProperty("detail")) {
                throw new Error(data.detail);
            }
            console.log(data);
        } catch (e:any) {
            console.log(e);
        }
        
    }
)
