import { ButtonProps } from "../types/props";

export function Button(props:ButtonProps) {
    return (
        <button className={props.class} onClick={() => props.onClick()}>{props.name}</button>
    )
}