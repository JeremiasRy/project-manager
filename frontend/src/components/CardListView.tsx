import { Project } from "../types/project";
import { Task } from "../types/task";
import { Card } from "./Card";

export function CardListView(props: {items: Task[] | Project[] }) {
    return (
        <div className="list-view">
            {props.items.map(item => <Card item={item}/>)}
        </div>
    )
}