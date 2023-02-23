import { Project } from "../types/project";
import { Task } from "../types/task";
import { Card } from "./Card";

export function CardListView(props: {items: Task[] | Project[] }) {
    
    if (!Array.isArray(props.items)) {
        return <></>;
    }
    function MapItems():JSX.Element[] {
        
        let elements = props.items.map(item => {
            if (Object.hasOwn(item, "taskId")) {
                let task = item as Task;
                return <Card key={`${task.taskId}$`} item={task} link="task" />
            } else {
                return <Card key={`${item.projectId}$`} item={item} link="project" />
            }})

        return elements;
    }

    return (
        <div className="list-view">
            {MapItems()}
        </div>
    )
}