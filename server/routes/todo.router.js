const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

/**
 * steps 
 * --GET will need to pull values from db
 * which is named weenend-to-do-app --table todo
 * --Populate DOM with the response keys task, priority_Lev, status_comp
 * ----write query to pull * from db
 * 
 * --POST will need to take values from html input, and 
 * send back to router, 
 * --query to insert into db will be required
 * 
 * --PUT when a task is completed or updated will need to
 * alter db by index updating table
 * update query will be needed. JS must reload GET function
 * at this point 
 * 
 * --Delete using index value of Item from table, which GET has 
 * writen into the DOM with template literal.
 * write delete query to remove index item from the table
 */


// GET
router.get('/',(req,res)=>{
    console.log('IN GET')
    //query to get all items from todo table
    let queryText = `select * from todo`
    pool.query(queryText).then((result)=>{
        //sending table rows for use in JS
        res.send(result.rows)
    }).catch((error)=>{
        console.log(`Error in GET ${error}`)
        res.sendStatus(500)
        //error message
    })
})
//postman http://localhost:5001/todo
/*
[
    {
        "id": 1,
        "task": "Create a Todo App",
        "priority_lev": "High",
        "status_comp": true
    }
]
 */

// POST

// PUT

// DELETE

module.exports = router;
