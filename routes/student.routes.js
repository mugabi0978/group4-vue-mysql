module.exports = app => {

    // import student controller
    const students_logic = require("../controllers/student.controller.js");

    // import express router
    var router = require("express").Router();

    // create student api route
    router.post("/add", students_logic.create);

    // retrieve all students api route
    // http://localhost:8085/students/r
    router.get("/retrieve", students_logic.retrieve_students);
    
    // get a specific student
    router.get("/:id", students_logic.retrieve_student);

    // get a specific student by address
    router.get("/find/:physical_address", students_logic.find_students_by_location);

    // update students api route
    router.put("/update/:id", students_logic.update_student); 

    // update students api route
    router.delete("/delete/:id", students_logic.delete_student); 

    // define default base url route
    app.use('/students', router);

}
// http://localhost:8082/students/add