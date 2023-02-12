import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHook"
import { login, logout } from "./redux/reducers/loginReducer";
import { getProjects, updateProject } from "./redux/reducers/projectReducer";
import { addTask, assignTask, completeTask, deleteTask, editTask, getTask, getTasks } from "./redux/reducers/taskReducer";
import { Assign } from "./types/assign";
import { EditProject } from "./types/project";
import { AddTask, EditTask } from "./types/task";
import { SignInCredentials } from "./types/user";

function App() {
  const loggedIn = useAppSelector(state => state.login);
  const projects = useAppSelector(state => state.project);
  const dispatch = useAppDispatch();

  const credentials:SignInCredentials = {
    username: "Jeremias",
    password: "qwerty"
  } 

  useEffect(() => {
      //dispatch(login(credentials));
      dispatch(getProjects());
  }, []);

  console.log(projects);

  

  return (
    <div className="App">
    </div>
  )
}

export default App
