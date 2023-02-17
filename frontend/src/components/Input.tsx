import { InputProps } from "../types/props";

export function Input(props:InputProps) {
    return (
        <input type={props.type} value={props.state} onChange={(e) => props.setState(e.currentTarget.value)} placeholder={props.name}></input>
    )
}