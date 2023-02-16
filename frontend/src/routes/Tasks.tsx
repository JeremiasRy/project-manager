import { useEffect } from "react";
import { CardListView } from "../components/CardListView";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getTasks } from "../redux/reducers/taskReducer";

export function Tasks() {
    const tasks = useAppSelector(state => state.task);
    const dispatch = useAppDispatch();
    const projectTitles = Array.from(new Set(tasks.map(task => task.project.title)));

    
    useEffect(() => {
        dispatch(getTasks());
    }, []);
    console.log(projectTitles);

    return (
        <>
        {projectTitles.map(title => 
            <>
                <h1>{title}</h1>
                <CardListView items={tasks.filter(task => task.project.title === title)}/>
            </>
        )}
        </>
    )
}