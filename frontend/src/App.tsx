import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { LoginRegisterForm } from "./components/LoginRegisterForm";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHook";
import "./styles/compiled/styles.css";

function App() {
  const logging = useAppSelector(state => state.login);

  useEffect(() => {
      //dispatch(login(credentials));
      //dispatch(getProjects());
  }, []);


  return (
    <div className="App">
      <LoginRegisterForm/>
    </div>
  )
}

export default App
