import { NavProps } from "../types/props";

export function NavElement(props:NavProps) {
    return (
        <div className="side-nav_nav-element">
            <h3>{props.name}</h3>
        </div>
    )
};