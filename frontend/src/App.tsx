import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import LoginPage from './components/Login';
import { fetchAllProjects } from './redux/reducer/projectReducer';
import { getAllTasks } from './redux/reducer/taskReducer';

function App() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector(state => state.projectReducer);
  const tasks = useAppSelector(state => state.taskReducer);

  useEffect(() => {
    dispatch(fetchAllProjects());
    dispatch(getAllTasks())
  }, []);
  
  console.log(projects);
  console.log(tasks);
  return (
    <></>
  );
}

export default App;
