import { useState } from 'react';
import { User } from '../types/user';
import { Button } from './Button';
import {Input} from './Input'

export function ProjectTaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(new Date(Date.now()).toISOString().split('T')[0]);
    const [dueDate, setDuedate] = useState<string>("");
    const [assign, setAssign] = useState<User[]>([]);

    function onSubmit() {

    }
    console.log("täh");
    return (
        <div className='project-task-form'>
            <h1>New project</h1>
            <Input name='Title' state={title} setState={setTitle} type='text'/>
            <h4>Starting day</h4>
            <Input name='Start date' state={startDate} setState={setStartDate} type='date' />
            <h4>Due date</h4>
            <Input name='Due date' state={dueDate} setState={setDuedate} type='date' />
            <textarea name='Description' placeholder="Enter a description" value={description} onChange={(e) => setDescription(e.currentTarget.value)} cols={20} rows={10} />
            <Button name='Add a project' onClick={onSubmit} class='btn'/>
        </div>
    )
}