import { Project } from "./project";
import { Task } from "./task";

export type User = {
    userId:number;
    username:string;
    password:string;
    projects: Omit<Project, "tasks" | "usersAssigned">[];
    tasks: Omit<Task, "project" | "userAssigned">[];
}

export type SignInCredentials = Omit<User, "userId" | "projects" | "tasks">;

export type LoggedIn = {
    user:User | null,
    access_token: string | null
}