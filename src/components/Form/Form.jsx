import { useState, useEffect } from 'react'
// We must import axios in each component where we want to use it
import axios from 'axios'

function Form() {
    const [task, setTask] = useState('')
    const [priority, setPriority] = useState()
    const [status, setStatus]= useState('')
    const [listOfTask, setListOfTask] = useState(['No Items'])

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
        <div>
                {
                    listOfTask.map((task)=>(
                        //what we wanter to render
                        <div id="taskList" key={task.id}>
                            {task.task} <br/> 
                            {task.priority_lev}<br/> 
                            {String(task.status_comp)}
                        </div>
                    ))
                }
        </div>

    )
}

export default Form