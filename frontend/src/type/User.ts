import { Project } from "./Project"
import { Task } from "./Task"

export interface UserProps{
    id: number,
    email:string,
    password: string
}
export type User = {
    userid: number,
    username: string,
    password: string,
    projects: Omit<Project, "usersAssigned" | "tasks">[],
    tasks: Omit<Task, "userAssigned" | "project">[]
}