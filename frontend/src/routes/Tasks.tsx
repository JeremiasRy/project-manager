import { useEffect } from "react";
import { CardListView } from "../components/CardListView";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getTasks } from "../redux/reducers/taskReducer";

export function Tasks() {
    const tasks = useAppSelector(state => state.task);
    const dispatch = useAppDispatch();
    const projects = Array.from(new Set(tasks.map(task => task.project.title)));

    useEffect(() => {
        dispatch(getTasks());
    }, []);

    

    return (
        <>
        <h1>Tasks</h1>
        {projects.map(projectInfo => 
            <>
                <h2>{projectInfo}</h2>
                <CardListView key={projectInfo} items={tasks.filter(task => task.project.title === projectInfo)}/>
            </>
        )}
        </>
    )
}