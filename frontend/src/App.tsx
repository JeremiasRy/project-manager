import React from 'react';
import './App.css';
import ProjectForm from './components/forms/ProjectForm';
import TaskForm from './components/forms/TaskForm';

function App() {
  return (
    <div className="App">
      <ProjectForm/>
      <TaskForm/>
    </div>
  );
}

export default App;
