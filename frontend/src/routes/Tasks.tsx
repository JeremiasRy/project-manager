import { useEffect } from "react";
import { CardListView } from "../components/CardListView";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getTasks } from "../redux/reducers/taskReducer";

export function Tasks() {
    const tasks = useAppSelector(state => state.task);
    const dispatch = useAppDispatch();
    const projects = Array.from(new Set(tasks.map(task => ({title: task.project.title, projectId: task.projectId}))));

    
    useEffect(() => {
        dispatch(getTasks());
    }, []);

    return (
        <>
        {projects.map(projectInfo => 
            <>
                <h1>{projectInfo.title}</h1>
                <CardListView key={projectInfo.projectId} items={tasks.filter(task => task.project.title === projectInfo.title)}/>
            </>
        )}
        </>
    )
}