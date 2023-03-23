import {useState} from 'react';
import Form from '../Form/Form';
import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';
import './App.css'
function App () {
  
  return (
    
      <div>
        <Header />
        {/* <Form /> */}
        <TaskList />
      </div>
  );

}

export default App
