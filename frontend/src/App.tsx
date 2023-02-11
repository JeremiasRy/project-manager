import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHook"
import { getProjects, getProjectsByUser, getProjectById, assignProjectToUser, addProject } from "./redux/reducers/projectReducer";
import { Assign } from "./types/assign";
import { AddProject } from "./types/project";

function App() {
  const projects = useAppSelector(state => state.project);
  const dispatch = useAppDispatch();
  let newProject:AddProject = {
    title: "this one is from frontend",
    description: "I hope it works!!!!",
    due_date: new Date("2023-02-18")
  }

  useEffect(() => {
    dispatch(addProject(newProject));
  }, []);

  console.log(projects);
  return (
    <div className="App">
    </div>
  )
}

export default App
