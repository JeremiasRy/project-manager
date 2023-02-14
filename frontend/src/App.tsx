import { useEffect } from "react";
import { SideNav } from "./components/SideNav";
import { useAppSelector } from "./hooks/reduxHook";
import "./styles/compiled/styles.css";

function App() {
  const logging = useAppSelector(state => state.login);

  useEffect(() => {
      //dispatch(login(credentials));
      //dispatch(getProjects());
  }, []);


  return (
    <div className="App">
    </div>
  )
}

export default App
