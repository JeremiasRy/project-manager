import { current } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { getProjects } from '../redux/reducers/projectReducer';
import { filterOutUser, getUsers } from '../redux/reducers/userReducer';
import { User } from '../types/user';
import { Button } from './Button';
import {Input} from './Input'

export function ProjectTaskForm(props: {isProject:boolean}) {
    const users = useAppSelector(state => state.user);
    const projects = useAppSelector(state => state.project);
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(new Date(Date.now()).toISOString().split('T')[0]);
    const [dueDate, setDuedate] = useState<string>("");
    const [projectId, setProjectId] = useState<null | number>(null);
    const [assign, setAssign] = useState<User[]>([]);
    const [currentSelect, setCurrentSelect] = useState<number | null>(null)

    useEffect(() => {
        if (!props.isProject) {
            dispatch(getProjects());
        }
        dispatch(getUsers());
    }, []);

    function options() {
        if (!props.isProject) {
            return projects.map(project => <option value={project.projectId}>{project.title}</option>);
        } else {
            return users.map(user => <option value={user.userId}>{user.username}</option>);
        }
    }
    function onPersonAdd() {
        let user:User | undefined = users.find(user => user.userId === currentSelect);
        if (user !== undefined) {
            setAssign([...assign, user])
        }
        dispatch(filterOutUser(currentSelect as number));
    }

    function onSubmit() {

    }

    return (
        <div className='project-task-form'>
            <h1>New {props.isProject ? "Project" : "Task"}</h1>
            {props.isProject && <>
            <h4>Team assembled</h4>
            <ul>
                {assign.map(user => <li>{user.username}</li>)}
            </ul>
            </>
            }
            <label>
                <p>{props.isProject ? "Assign people to this project" : "Select a project for this task"}</p>
                <select onChange={!props.isProject ? (e) => setProjectId(parseInt(e.currentTarget.value)) : (e) => setCurrentSelect(parseInt(e.currentTarget.value))}>
                    <option>{props.isProject ? "(Select people)" : "Select project"}</option>
                    {options()}
                </select>
                {props.isProject && <Button name="Add person"  onClick={onPersonAdd} class="btn"/>}
            </label>
            <Input name='Title' state={title} setState={setTitle} type='text'/>
            <h4>Starting day</h4>
            <Input name='Start date' state={startDate} setState={setStartDate} type='date'/>
            <h4>Due date</h4>
            <Input name='Due date' state={dueDate} setState={setDuedate} type='date' />
            <textarea name='Description' placeholder="Enter a description" value={description} onChange={(e) => setDescription(e.currentTarget.value)} cols={20} rows={10} />
            <Button name={`Add ${props.isProject ? "Project" : "Task"}`} onClick={onSubmit} class='btn'/>
        </div>
    )
}