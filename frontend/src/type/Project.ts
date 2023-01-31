import { Task } from "./Task"
import { User } from "./User"

export interface ProjectProps{
    id: number,
    title: string,
    description: string,
    createAt: Date,
    dueAt: Date
}
export type Project = {
    projectId: number,
    title: string,
    description: string,
    created_at: string,
    due_date: string | null,
    tasks: Omit<Task, "project" | "userAssigned">[],
    usersAssigned: Omit<User, "password" | "tasks" | "projects">[]
}