import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../Header/Header'
import './TaskList.css'

function TaskList() {
    const [task, setTask] = useState('')
    const [priority, setPriority] = useState()
    const [status, setStatus]= useState('')
    const [listOfTask, setListOfTask] = useState([])
    const countOfTask = listOfTask.length

    useEffect(() => {
        // fetch the list of tasks from routes
        axios.get('/todo').then(response => {
            setListOfTask(response.data)
        }).catch((error)=>{
            console.log(`Error in GET ${error}`)
            alert('Something Went Wrong')
        })
    }, []) // run this effect only once, when the component mounts
    const handleToggleStatus = (id) => {
        // find the task with the matching id
        const updatedListOfTask = listOfTask.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              status_comp: !task.status_comp, // toggle the status_comp
            };
          } else {
            return task;
          }
        });
    
        setListOfTask(updatedListOfTask);
      };
    
      return (
        <>
          <div id="taskListHeader">
            <span>Task</span>
            <span>Priority</span>
            <span>Status</span>
          </div>
          {listOfTask.map((task) => (
            <div
              id="taskList"
              key={task.id}
              className={task.status_comp ? 'completed task-completed' : 'task-not-completed'}
              
            >
              <span className={task.status_comp ? 'completed' : ''}>
                {task.task}
              </span>
              <span>{task.priority_lev}</span>
              <span>
                {task.status_comp ? (
                  <span onClick={() => handleToggleStatus(task.id)}className="completed">&#10004;</span>
                  
                ) : (
                  <span onClick={() => handleToggleStatus(task.id)} className="not-completed">&#9888;</span>
                )}
              </span>
            </div>
          ))}
        </>
      );
    }
    
    export default TaskList;
