import Form from "../Form/Form"


function Header({countOfTaskProp}) {


    return (
        <header>
        <h1> Mitch's To-do App </h1>
        <h2> Total Task to complete are {countOfTaskProp}</h2>
        
        </header>
        
    ) 
    }
    export default Header