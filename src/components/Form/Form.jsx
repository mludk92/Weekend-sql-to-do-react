
import axios from 'axios'

function Form({taskName,setTaskName, priority, setPriority, status, setStatus,fetchTaskList}) {

    const submitForm = (event) => {
        event.preventDefault();
        axios.post('/todo', {
            //Using values from our var in state
            task: taskName,
            priority_Lev: priority,
            status_comp: status,
        }).then((response)=>{
            //clear out input fields
            setTaskName('')
            setPriority('')
            setStatus('')
            // react version of get() after function
            fetchTaskList()
        }).catch((error)=>{
            console.log(`Error in POST ${error}`)
            alert('Something Went Wrong')
        })
    }
    


return (

        <>
        <form onSubmit={submitForm}>
               Task:   
            <input type="text" value={taskName} required
            onChange={(event)=> setTaskName(event.target.value)}/> 
               Priority:    
            <br />
            
            <input type="text" value={priority} required
            onChange={(event)=>setPriority(event.target.value)}/> 
               Status of Completion:    
            <input placeholder="true or false"type="boolean" list="bool" value={status} required
            onChange={(event)=>setStatus(event.target.value)}/> 
            <input type="submit"/> 

 

        </form>
        
        </>

    )
}

export default Form