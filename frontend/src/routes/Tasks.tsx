import { useEffect } from "react";
import { CardListView } from "../components/CardListView";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getTasks } from "../redux/reducers/taskReducer";

export function Tasks() {
    const tasks = useAppSelector(state => state.task);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(getTasks());
    }, []);

    return (
        <>
            <h1>All tasks</h1>
            <CardListView items={tasks} />
        </>
    )
}