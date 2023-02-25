import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AssignPerson } from "../components/AssignPerson";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { completeTask, getTask } from "../redux/reducers/taskReducer";
import { Project } from "../types/project";

export function TaskView() {
    const { id } = useParams();
    const task = useAppSelector(state => state.task);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTask(parseInt(id as string)));
    }, [id]);

    function onComplete() {
        dispatch(completeTask(parseInt(id as string)));
    }

    console.log(task);

    return(
        <div className="task-holder">
            <h1>{task[0].title}</h1>
            <div className="info">
                <div className="task-holder__left-column">
                    <div className="description">
                        <h4>Description</h4>
                        <p>{task[0].description}</p>
                    </div>
                    <div className="dates">
                        <h4>Start:</h4>
                        <p>{new Date(task[0].start_date).toDateString()}</p>
                        {task[0].due_date !== null && 
                        <>
                        <h4>Due date:</h4>
                        <p>{new Date(task[0].due_date).toDateString()}</p>
                        </>}
                    </div>
                    <div className="complete-task">
                        {task[0].completed ? "This task is completed!" :<Button class="btn complete-task" name="Complete" onClick={onComplete} /> }
                    </div>
                </div>
                <div className="task-holder__right-column">
                    <div>
                        <h4>Project</h4>
                        <Card item={task[0].project as Project} link="project" />
                    </div>
                    <div className="userAssigned">
                        {task[0].userAssigned === null || task[0].userAssigned === undefined ? <AssignPerson taskId={task[0].taskId}/> : <div><h4>Person assigned:</h4><p>{task[0].userAssigned.username}</p></div>}
                    </div>
                </div>
            </div>
        </div>
    );
}