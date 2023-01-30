import { ProjectProps } from "./Project";

export interface TaskProps{
    id: number,
    title: string,
    description: string,
    createAt: Date,
    project: ProjectProps,
}