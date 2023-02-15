import { Project } from "./project"
import { Task } from "./task"

export type InputProps = {
    state: string,
    setState: React.Dispatch<React.SetStateAction<string>>,
    name: string,
    isPassword: boolean
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