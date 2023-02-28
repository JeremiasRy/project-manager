import { Outlet, useNavigate } from "react-router-dom";
import { LoginRegisterForm } from "../components/LoginRegisterForm";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { useEffect } from "react";
import { getTasks } from "../redux/reducers/taskReducer";
import { getProjects } from "../redux/reducers/projectReducer";
import { getUsers } from "../redux/reducers/userReducer";

export function Root() {
    const loggedIn = useAppSelector(state => state.login);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getTasks());
        dispatch(getProjects());
        dispatch(getUsers());
        if (loggedIn.user !== null) {
            navigate("/main");
        }
    }, [loggedIn])
    
    return (
        <div className="App">
            {loggedIn === null || loggedIn.user === null ? <LoginRegisterForm/> : <Outlet />}
        </div>
    )
}