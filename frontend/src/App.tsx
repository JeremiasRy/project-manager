import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProjectTaskForm } from "./components/ProjectTaskForm";
import { useAppSelector } from "./hooks/reduxHook";
import { Add } from "./routes/Add";
import { Main } from "./routes/Main";
import { Projects } from "./routes/Projects";
import { Root } from "./routes/Root";
import { Tasks } from "./routes/Tasks";
import "./styles/compiled/styles.css";

function App() {
  const logging = useAppSelector(state => state.login);

  useEffect(() => {
      //dispatch(login(credentials));
      //dispatch(getProjects());
  }, []);

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
            element: <ProjectTaskForm />
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
