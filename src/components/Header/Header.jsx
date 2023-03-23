import Form from "../Form/Form"


function Header({countOfIncomplete,countOfComplete}) {


    return (
        <header>
        <h1> Mitch's To-do App </h1>
        <h3> Total Task to complete are {countOfIncomplete}</h3>
        <h3> You have completed {countOfComplete}</h3>
        
        </header>
        
    ) 
    }
    export default Header