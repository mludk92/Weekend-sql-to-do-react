import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../Header/Header'
import './TaskList.css'
import Form from '../Form/Form'

function TaskList() {
    const [taskName, setTaskName] = useState('')
    const [priority, setPriority] = useState()
    const [status, setStatus]= useState('')
    const [listOfTask, setListOfTask] = useState([])
    //filter for bool value of false then return the count will be passed to Header as props below. 
    const incompleteTasksFalse = listOfTask.filter(task => task.status_comp === false);
    const countOfIncomplete = () => { return (incompleteTasksFalse.length
        )
    }
    const completeTasksTrue = listOfTask.filter(task => task.status_comp === true);
    const countOfComplete = () => { return (completeTasksTrue.length
        )
    }



    const fetchTaskList = () => {
        // fetch the list of tasks from routes
        axios.get('/todo').then(response => {
            setListOfTask(response.data)
        }).catch((error)=>{
            console.log(`Error in GET ${error}`)
            alert('Something Went Wrong')
        })
    }
    useEffect(() => {
        fetchTaskList()
    }, []) // run this effect only once, when the component mounts
//replace this with an axios put 
    const handleToggleStatus = (id) => {
        //find the task with the matching id
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
       axios.put(`/todo/${id}`, { status_comp: !listOfTask.find((task) => task.id === id).status_comp }).then((response)=>{
                fetchTaskList()
            }).catch((error)=>{
                console.log(`error in PUT ${error}`)
                alert('something went wrong')
            })
      };
    //   const handleToggleStatus = (id, newStatus) =>{
    //     console.log(`updating task status of ${id}`)
    //     axios.put(`/todo/${id}`, {status_comp: newStatus }).then((response)=>{
    //         fetchTaskList()
    //     }).catch((error)=>{
    //         console.log(`error in PUT ${error}`)
    //         alert('something went wrong')
    //     })
    //   }

        const removeTask = (id) => {
        console.log(`removeTask ${id}`)
        axios.delete(`/todo/${id}`)
          .then((response) => {
            fetchTaskList()
          })
          .catch((error) => {
            console.log(`error in removeTask ${error}`)
            alert('something went wrong')
        })
    }
      return (
        <>
        <Header countOfIncomplete= {countOfIncomplete()}
                countOfComplete={countOfComplete()}/> 
        <div>
        <Form 
            
            taskName = {taskName}
            setTaskName = {setTaskName}
            priority = {priority}
            setPriority = {setPriority}
            status = {status} 
            setStatus = {setStatus}
            fetchTaskList = {fetchTaskList}
        />
        </div>
          <div id="taskListHeader">
            <span>Task</span>
            <span>Priority</span>
            <span>Status (Click symbol to update)</span>
            
          </div>
          {listOfTask.map((task) => (
            <div
              key={task.id}
              id="taskList"
              className={task.status_comp ? 'completed task-completed' : 'task-not-completed'}
              
            >
                <button onClick={() => removeTask(task.id)}>Delete Task</button>
                <span className={task.status_comp ? 'completed' : ''}>
                {task.task}
                </span>
                <span>{task.priority_lev}</span>
                <span>{task.status_comp ? (
                <span onClick={() => handleToggleStatus(task.id)}className="completed">&#10004;</span>
                  
                ) : (
                <span onClick={() => handleToggleStatus(task.id)} className="not-completed">&#9888; </span>
                )}
              </span>
              
            </div>
            
            
          ))}
        </>
      );
    }
    
    export default TaskList;
