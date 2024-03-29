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
    let queryText = `select * from todo order by status_comp`
    pool.query(queryText).then((result)=>{
        //sending table rows for use in JS
        res.send(result.rows)
    }).catch((error)=>{
        console.log(`Error in GET ${error}`)
        res.sendStatus(500)
        //error message
    })
})
//postman test @ http://localhost:5001/todo
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
router.post('/',(req,res)=>{
    console.log('IN POST')
    console.log(req.body)
    let newToDO = req.body
    let queryText = `insert into todo(task,priority_Lev,status_comp)
                values($1, $2, $3)`
                            //text           text               bool
    pool.query(queryText,[newToDO.task, newToDO.priority_Lev, newToDO.status_comp]).then((result)=>{
        res.sendStatus(201)
    }).catch((error)=>{
        console.log(`error in POST ${error}`)
        res.sendStatus(500)
    })       
})
//postman response created. test adding values newTODO.task 
// newToDO.priority_Lev, and false since bool is required.
//created row in db null ,null , false  with id 2 

// PUT

router.put('/:id', (req, res) => {
    let update = req.body
    const sqlText = `
    update todo
	set 
	status_comp = $1
	where id = $2`
    
    pool.query(sqlText, [update.status_comp, req.params.id]).then((result)=>{
        res.sendStatus(201)
    }).catch((error)=> {
        console.log(`error in PUT ${error}`)
        res.sendStatus(500)
    })
})

// DELETE
router.delete('/:id', (req, res) => {
    // When you fetch all things in these GET routes, strongly encourage ORDER BY
    // so that things always come back in a consistent order 
    const sqlText = `DELETE FROM "todo" WHERE "id" = $1;`;
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
})



module.exports = router;
