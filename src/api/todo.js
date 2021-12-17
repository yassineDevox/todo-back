const { db } = require("../config/mysql")
const { TaskStatusEnum } = require("../data/enum/TaskStatus")
const { TaskTypeEnum } = require("../data/enum/TaskType")
const { Todo } = require("../models/todo")

exports.addTodo = (req, resp) => {

    //fetch task data
    let newTask = new Todo(
        "create usecase diagram",
        req.params.userId
    )

    //validate data  (fields )  
    let titlePattern = /^.{4,12}$/
    let statusPattern = /^(TODO|CANCELED|INPROGRESS|COMPLETED)$/
    let typePatten = /^(FRONT|BACK|DESIGN|TESTING)$/ 
    let userIdPattern = /^[1-9][0-9]*$/


    //test if the userId is valid 
    db.query(
        `  SELECT userId 
            FROM USERS 
            WHERE id=${req.params.userId}
            `,
        (err, resQ1) => {
            if (err) throw err
            else {
                if (resQ1.length === 0) {
                    resp.send("<h1 style='color:red'>invalid userId</h1> ")
                } else {
                    //query
                    let query = `INSERT INTO TODOS SET ?`
                    //apply query
                    db.query(query, newTask, (err, resQ2) => {
                        if (err) throw err
                        console.log(resQ2);

                        resp.send("todo added...")
                    })
                }

            }
        })

}