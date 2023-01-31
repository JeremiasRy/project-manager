import { Project, ProjectProps } from "./Project";
import { User } from "./User";

export interface TaskProps{
    id: number,
    title: string,
    description: string,
    createAt: Date,
    project: ProjectProps,
}
export type Task = {
    taskId: number,
    title: string,
    description: string,
    created_at: string,
    due_date: string | null,
    project: Project, 
    userAssigned: Omit<User, "password" | "tasks" | "projects">
}