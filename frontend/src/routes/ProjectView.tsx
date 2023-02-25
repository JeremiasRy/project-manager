import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getProjectById } from "../redux/reducers/projectReducer";
import { Task } from "../types/task";

export function ProjectView() {
    const { id } = useParams()
    const project = useAppSelector(state => state.project);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProjectById(parseInt(id as string)));
    }, [id])

    if (project.length === 0) {
        return <></>;
    }

    let sortedTasks;
    if (!project[0].tasks.some(task => task.start_date === null)) {
        sortedTasks = project[0].tasks.map(task => task).sort((a,b) => new Date(a.start_date).getMilliseconds() - new Date(b.start_date).getMilliseconds());
    }

    return (
        <div className="project-holder">
            <h1>{project[0].title}</h1>
            <div className="details">
                <div className="left-column">
                    <div className="left-column_description">
                        <h4>Description</h4>
                        <p>{project[0].description}</p>
                    </div>
                    <div className="left-column_team">
                        <h4>Team</h4>
                        {project[0].usersAssigned.map(user => <p key={user.userId}>{user.username}</p>)}
                    </div>
                    <div className="left-column_dates">
                        <h4>Start:</h4> 
                        <p>{new Date(project[0].start_date).toDateString()}</p>
                        {project[0].due_date !== null && 
                        <>
                            <h4>Due date:</h4> 
                            <p>{new Date(project[0].due_date).toDateString()}</p>
                        </>}
                    </div>
                </div>
                <div className="right-column">
                    <h4>Tasks</h4>
                    <div className="right-column_tasks">
                        {sortedTasks?.map(task => <Card item={task as Task} link="task" />)}
                    </div>
                </div>
            </div>
        </div>
    );
}