import { useState, useEffect } from 'react'
// We must import axios in each component where we want to use it
import axios from 'axios'
import Header from '../Header/Header'
const length = require('array-length')


function Form() {


    const [task, setTask] = useState('')
    const [priority, setPriority] = useState()
    const [status, setStatus]= useState('')
    const [listOfTask, setListOfTask] = useState(['No Items'])
    let countOfTask = length(listOfTask)
    
    //GET
const fetchTaskList = () => {
    axios.get('/todo').then((response)=>{
        setListOfTask(response.data)
    }).catch((error)=>{
        console.log(`Error in GET ${error}`)
        alert('Something Went Wrong')
    })
}
useEffect(()=> {
    // At this point, React is Ready!
    fetchTaskList()
},[]) //!Remember the empty array


return (

        <>
            <Header countOfTaskProp = { length(listOfTask)}/>
                {
                    listOfTask.map((task)=>(
                        //what we wanter to render
                        <div id={"taskList"} key={task.id}>
                            {task.task} <br/> 
                            {task.priority_lev}<br/> 
                            {String(task.status_comp)}
                        </div>
                    ))
                }
        </>

    )
}

export default Form