module.exports = app => {

    // import staff controller
    const staff_logic = require("../controllers/staff.controller.js");

    // import express router
    var router = require("express").Router();

    // create staff api route
    router.post("/add", staff_logic.create);

    // define default route of staff
    app.use('/staff', router);

}
// http://localhost:8082/staff/add