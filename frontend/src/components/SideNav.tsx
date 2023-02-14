import { NavElement } from "./SideNavElement";

export function SideNav() {
    return (
        <div className="side-nav">
            <h1>Project manager</h1>
            <NavElement name="Projects" link=""/>
            <NavElement name="Tasks" link=""/>
            <NavElement name="Users" link=""/>
            <NavElement name="Log out" link="" />
        </div>
    )
}