import { Task } from "./task";
import { User } from "./user";

export type Project = {
    projectId: number;
    title: string;
    description: string;
    completed: boolean;
    created_at: Date;
    start_date: Date | null;
    completed_at: Date | null;
    due_date: Date | null;
    tasks: Omit<Task, "project" | "userAssigned">[];
    usersAssigned: Omit<User, "password" | "projects" | "tasks">[];
    usersIds: number[] | null;
}
export type EditProject = Omit<Project, "completed" | "created_at" | "completed_at" | "tasks" | "usersAssigned" | "usersIds">;
export type AddProject = Omit<Project, "projectId" | "completed" | "created_at" | "completed_at" | "tasks" | "usersAssigned" >;
