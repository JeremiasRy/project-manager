import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getProjectById } from "../redux/reducers/projectReducer";
import { Project } from "../types/project";

export function ProjectView() {
    const { id } = useParams()
    const project = useAppSelector(state => state.project);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProjectById(parseInt(id as string)))
    }, [id])

    if (Array.isArray(project)) {
        return <></>;
    }
    let view = project as Project;

    return (
        <div className="project-holder">
            <h1>{view.title}</h1>
        </div>
    );
}