import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHook"
import { updateProject } from "./redux/reducers/projectReducer";
import { addTask, assignTask, completeTask, deleteTask, editTask, getTask, getTasks } from "./redux/reducers/taskReducer";
import { Assign } from "./types/assign";
import { EditProject } from "./types/project";
import { AddTask, EditTask } from "./types/task";

function App() {
  const projects = useAppSelector(state => state.project);
  const tasks = useAppSelector(state => state.task);
  const dispatch = useAppDispatch();
  useEffect(() => {
  }, []);

  console.log(tasks);
  return (
    <div className="App">
    </div>
  )
}

export default App
