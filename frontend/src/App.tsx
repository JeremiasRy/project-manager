import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProjectTaskForm } from "./components/ProjectTaskForm";
import { useAppSelector } from "./hooks/reduxHook";
import { Add } from "./routes/Add";
import { Main } from "./routes/Main";
import { ProjectView } from "./routes/ProjectView";
import { Projects } from "./routes/Projects";
import { Root } from "./routes/Root";
import { Task } from "./routes/Task";
import { Tasks } from "./routes/Tasks";
import "./styles/compiled/styles.css";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [{
        path: "main",
        element: <Main />,
        children: [
          {
            path: "projects",
            element: <Projects />
          }, 
          {
            path: "tasks",
            element: <Tasks />
          },
          {
            path: "add",
            element: <Add />
          },
          {
            path: "add/project",
            element: <ProjectTaskForm isProject={true}/>
          },
          {
            path: "project/:id",
            element: <ProjectView />
          },
          {
            path: "task/:id",
            element: <Task />
          },
          {
            path: "add/task",
            element: <ProjectTaskForm isProject={false}/>
          }
        ]
      }]
    }
  ])


  return (
      <RouterProvider router={router} />
  )
}

export default App
