import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHook"
import { login, logout } from "./redux/reducers/loginReducer";
import { updateProject } from "./redux/reducers/projectReducer";
import { addTask, assignTask, completeTask, deleteTask, editTask, getTask, getTasks } from "./redux/reducers/taskReducer";
import { Assign } from "./types/assign";
import { EditProject } from "./types/project";
import { AddTask, EditTask } from "./types/task";
import { SignInCredentials } from "./types/user";

function App() {
  const dispatch = useAppDispatch();

  const credentials:SignInCredentials = {
    username: "Jeremias",
    password: "qwerty"
  } 

  useEffect(() => {
      dispatch(logout());
  }, []);
  

  return (
    <div className="App">
    </div>
  )
}

export default App
