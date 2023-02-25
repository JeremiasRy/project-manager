import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { assignTask } from "../redux/reducers/taskReducer";
import { Button } from "./Button";

export function AssignPerson(props:{taskId:number}) {
    const users = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [selected, setSelected] = useState<number | null>(null);

    function options() {
        return users.map(user => <option value={user.userId}>{user.username}</option>);
    }

    function onSubmit() {
        dispatch(assignTask({assignId: props.taskId, userId: selected as number}))
    }
    return (
        <div className="select-form">
            <h4>Assign a person</h4>
            <select onChange={(e) => setSelected(parseInt(e.currentTarget.value))}>
                <option>Select user</option>
                {options()}
            </select>
            <Button class="btn" onClick={onSubmit} name="Assign"/>
        </div>
    )

}