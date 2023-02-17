import { Outlet, useNavigate } from "react-router-dom";
import { LoginRegisterForm } from "../components/LoginRegisterForm";
import { useAppSelector } from "../hooks/reduxHook"
import { useEffect } from "react";

export function Root() {
    const loggedIn = useAppSelector(state => state.login);
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn === null || loggedIn.user === null) {
            navigate("/main");
        }
    }, [loggedIn])
    
    return (
        <div className="App">
            {loggedIn === null || loggedIn.user === null ? <LoginRegisterForm/> : <Outlet />}
        </div>
    )
}