import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppSelector } from "./hooks/reduxHook";
import { Main } from "./routes/Main";
import { Root } from "./routes/Root";
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
        element: <Main />
      }]
    }
  ])


  return (
      <RouterProvider router={router} />
  )
}

export default App
