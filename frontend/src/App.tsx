import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHook"
import { updateProject } from "./redux/reducers/projectReducer";
import { EditProject } from "./types/project";

function App() {
  const projects = useAppSelector(state => state.project);
  const dispatch = useAppDispatch();

  const upProj:EditProject = {
    projectId: 1,
    title: "This was changed from front",
    description: "Great hope it works",
    due_date: new Date("2024-02-08")
  } 

  useEffect(() => {
    dispatch(updateProject(upProj))
  }, []);

  console.log(projects);
  return (
    <div className="App">
    </div>
  )
}

export default App
