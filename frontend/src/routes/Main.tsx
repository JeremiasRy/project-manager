import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Card } from "../components/Card";
import { SideNav } from "../components/SideNav";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getProjects } from "../redux/reducers/projectReducer";

export function Main() {
    return (
        <>
        <div className="main">
            <SideNav />
            <div className="main_outlet-holder">
                <Outlet />
            </div>
        </div>
        </>
    )
}