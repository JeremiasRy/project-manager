import { useNavigate } from "react-router-dom";
import { CardProps } from "../types/props";
import { Task } from "../types/task";

export function Card(props:CardProps) {
    const navigate = useNavigate();
    
    function itemLink():string {
        if (Object.hasOwn(props.item, "taskId")) {
            let task = props.item as Task;
            return `/main/${props.link}/${task.taskId}`;
        } else {
            return `/main/${props.link}/${props.item.projectId}`;
        }
    }
    return (
        <div className={`card ${props.item.completed ? "complete" : "not-complete" }`} onClick={() => navigate(itemLink())}>
            <h3>{props.item.title}</h3>
            <p>{props.item.completed ? "Completed" : "Not complete" }</p>
        </div>
    )
}