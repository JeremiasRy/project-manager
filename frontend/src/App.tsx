import React from 'react';
import './App.css';
import { useAppDispatch } from './app/hooks';
import LoginPage from './components/Login';
import { fetchAllProjects } from './redux/reducer/projectReducer';

function App() {
  const dispatch = useAppDispatch();

  const projects = dispatch(fetchAllProjects());
  return (
    <></>
  );
}

export default App;
