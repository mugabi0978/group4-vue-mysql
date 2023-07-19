// import models
const db = require("../models");

// import Sequelize Student model
const Student = db.students;

// Sequelize clause
const Op = db.Sequelize.Op;

// Creates and Saves a new Student
exports.create = (req, res) => {
    // validate the request
    if(!req.body.first_name){
        res.status(400).send({
            message: "Fill in the First Name"
        });
        return;
    }

    // create student object
    const add_student = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        class: req.body.class,
        physical_address: req.body.physical_address,
        status: req.body.status ? req.body.status : false
    }

    // pass student object to Sequelize Create function
    // Sequelize Create helps add object to DB
    Student.create(add_student)
        .then(data => {
            // return data on success
            res.send(data);
        })
        .catch(err => {
            // return error on failure
            res.status(400).send({
                message: err.message || "Error occured while adding Student."
            });
        });

};

// Retrieves all Students
exports.retrieve_students = (req, res) => {
    const first_name = req.query.first_name;
    console.log("First Name = "+ first_name);
    // {"first_name": "Sa"}
    var condition_like = first_name ? { first_name: { [Op.like]: `%${first_name}%` } } : null; 

    var condition_equals = first_name ? { first_name: `${first_name}` } : null; 

    // Student.findAll()

    Student.findAll({ where: condition_equals})
        .then(data => {
            res.send(data);
        })
        .catch(err => {

            // send error response
            res.status(400).send({
                message: err.message || "Error occurred while retrieving students"
            });

        });

};

// Update Student by id
exports.update_student = (req, res) => {
    const id = req.params.id;

    Student.update(req.body, {
       where: {id: id} 
    }).then(num => {
        console.log("RETURN", num);
        if(num > 0){
            res.send({
                status: 100,
                status_message: "Success",
                message: `Student with id = ${id} updated successfully.`
            });
        }else{
            res.send({
                status: 400,
                status_message: "Error",
                message: `Student with id = ${id} not found.`
            
            });

        }
    }).catch(err => {
        res.status(500).send({
            message: `Error updating Student with id =${id}. Error message is ${err}.`
        });
    });
}; 

// Delete Student by id
exports.delete_student = (req, res) => {
    const id = req.params.id;

    Student.destroy({
       where: {id: id} 
    }).then(num => {
        console.log("RETURN", num);
        if(num > 0){
            res.send({
                status: 100,
                status_message: "Success",
                message: `Student with id = ${id} deleted successfully.`
            });
        }else{
            res.send({
                status: 400,
                status_message: "Error",
                message: `Student with id = ${id} not found.`
            
            });

        }
    }).catch(err => {
        res.status(500).send({
            message: `Error deleting Student with id =${id}. Error message is ${err}.`
        });
    });
}; 