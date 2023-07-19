// import models
const db = require("../models");

// import Sequelize Staff model
const Staff = db.staff;

// Creates and Saves a new Staff
exports.create = (req, res) => {
    // validate the request
    if(!req.body.first_name){
        res.status(400).send({
            message: "Fill in the First Name"
        });
        return;
    }

    // create staff json object
    const add_staff = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        phone_number: req.body.phone_number
    }

    // pass student object to Sequelize Create function
    // Sequelize Create helps add object to DB
    Staff.create(add_staff)
        .then(data => {

            
            // return data on success
            // res.send(data);

            // modified response
            res.send(
                {
                "status": "Successful",
                "status_code": "100",
                "data": data

            });
        })
        .catch(err => {
            // return error on failure
            res.status(400).send({
                message: err.message || "Error occured while adding Staff."
            });
        });

};