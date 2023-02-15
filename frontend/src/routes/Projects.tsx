import { useEffect } from "react";
import { CardListView } from "../components/CardListView";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getProjects } from "../redux/reducers/projectReducer";

export function Projects() {
    const projects = useAppSelector(state => state.project);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(getProjects());
    }, []);

    return (
        <>
            <h1>All projects</h1>
            <CardListView items={projects} />
        </>
    )
}