import { Project } from "./project";
import { User } from "./user";

export type Task = {
    taskId: number;
    projectId: number;
    title: string;
    description: string;
    completed: boolean;
    created_at: Date;
    start_date: Date;
    due_date: Date | null;
    completed_at: Date | null;
    project: Omit<Project, "tasks" | "usersAssigned">;
    userAssigned: Omit<User, "password" | "projects" | "tasks">
}
export type EditTask = Omit<Task, "projectId" | "completed" | "created_at" | "completed_at" | "project" | "userAssigned">;
export type AddTask = Omit<Task,  "taskId" | "completed" | "created_at" | "completed_at" | "project" | "userAssigned">;
