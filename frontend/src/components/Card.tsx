import { CardProps } from "../types/props";

export function Card(props:CardProps) {
    return (
        <div className="card">
            <h3>{props.item.title}</h3>
            <p>{props.item.description}</p>
            <p>{props.item.completed ? "Completed" : "Not completed" }</p>
        </div>
    )
}