import { NavElement } from "./SideNavElement";

export function SideNav() {
    return (
        <div className="side-nav">
            <h1>Project manager</h1>
            <NavElement name="Projects" link="projects"/>
            <NavElement name="Tasks" link="tasks"/>
            <NavElement name="Users" link="users"/>
            <NavElement name="Log out" link="/" />
        </div>
    )
}