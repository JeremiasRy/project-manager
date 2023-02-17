import { Project } from "./project"
import { Task } from "./task"

export type InputProps = {
    state: string,
    setState: React.Dispatch<React.SetStateAction<string>>,
    name: string,
    type: string
}
export type ButtonProps = {
    name: string,
    class: string,
    onClick: VoidFunction,
}
export type NavProps = {
    link: string,
    name: string,
}
export type CardProps = {
    item: Project | Task
}