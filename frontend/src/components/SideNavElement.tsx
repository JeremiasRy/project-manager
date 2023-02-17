import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHook";
import { logout } from "../redux/reducers/loginReducer";
import { NavProps } from "../types/props";

export function NavElement(props:NavProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    function handleClick() {
        if (props.name === "Log out") {
            dispatch(logout());
            return;
        }
        navigate(props.link);
    }
    return (
        <div className="nav-element" onClick={handleClick}>
            <h3>{props.name}</h3>
        </div>
    )
};