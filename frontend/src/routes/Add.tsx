import { NavElement } from "../components/SideNavElement";

export function Add() {
    return (
        <div className="add-routes-holder">
            <h1>What do you want to add?</h1>
            <NavElement name="Project" link={"project"}/>
            <NavElement name="Task" link={"task"}/>
            <NavElement name="Assign user" link={"assign-user"} />
        </div>
    )
}