// import express, body-parser and cors

// building Rest APIs
const express = require("express");

// help to parse the request and create the request.body object
const bodyParser = require("body-parser");

// middleware to protect api
// const cors = require("cors");

// define app framework
const app = express();

// Only allow requests from our front end
// var corsOptions = {
//     origin: "http://localhost:8081"
// };
  
// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// simple API request
app.get("/v1/get-root", (request, response) => {

    response.json({
        message: "Your first API Request"
    });

});

// addition api
// assignment
app.get("/v1/add-numbers", (request, response) => {
  // get the number a
  // get the number b

  // add a + b = c

  // return c

});

app.get("/v1/get-root-param", (request, response) => {
    const id_ = request.query.id;
    const number_a = request.query.a;
    console.log("Params A :- "+ request.query.a);
    console.log("Params ID :- "+ request.query.id);
    if(!id_){
        // Invalid request if ID param isnt included
        response.status(400).send({
            message: "ID Param not passed, please pass required parameter",
            status: "Error",
            status_code: 400
        });

        return;
    
    }else if (id_ == 100){
        // Valid request if ID is 100
        response.json({
            message: "Valid ID",
            status: "Success",
            status_code: 200
        });
    
        return;
    }else{
        // Invalid request if ID is not 100
        response.status(400).send({
            message: "Invalid ID",
            status: "Error",
            status_code: 400
        });

        return;
    }
});

// send sms
app.post("/v1/send-sms", (request, response) => {
    const phone_number_ = request.body.phone_number;
    // const number_a = request.body.a;
    console.log("Send to Phone Number :- "+ phone_number_);
    // console.log("Params ID :- "+ number_a);
    

    'use strict';

    var AWS = require('aws-sdk');
    require('aws-sdk/lib/maintenance_mode_message').suppress = true;

    // The AWS Region that you want to use to send the message. For a list of
    // AWS Regions where the Amazon Pinpoint API is available, see
    // https://docs.aws.amazon.com/pinpoint/latest/apireference/.
    var aws_region = "us-east-1";

    // The phone number or short code to send the message from. The phone number
    // or short code that you specify has to be associated with your Amazon Pinpoint
    // account. For best results, specify long codes in E.164 format.
    // var originationNumber = "+12065550199";
    // var originationNumber = "UgandaLove";

    // The recipient's phone number.  For best results, you should specify the
    // phone number in E.164 format.
    var destinationNumber = "+256783723617";

    // The content of the SMS message.
    var message = "Your OTP Code for BMD is"
                + " 324112."
                + " Enjoy";

    // The Amazon Pinpoint project/application ID to use when you send this message.
    // Make sure that the SMS channel is enabled for the project or application
    // that you choose.

    // mama connect 256
    var applicationId = "6818d99c2dfb4245b509e4c721ee22b4";

    // The type of SMS message that you want to send. If you plan to send
    // time-sensitive content, specify TRANSACTIONAL. If you plan to send
    // marketing-related content, specify PROMOTIONAL.
    var messageType = "TRANSACTIONAL";
    // var messageType = "PROMOTIONAL";

    // The registered keyword associated with the originating short code.
    // var registeredKeyword = "myKeyword";

    // The sender ID to use when sending the message. Support for sender ID
    // varies by country or region. For more information, see
    // https://docs.aws.amazon.com/pinpoint/latest/userguide/channels-sms-countries.html
    // var senderId = "UgandaLove";
    var senderId = "BeMyDate";

    // Specify that you're using a shared credentials file, and optionally specify
    // the profile that you want to use.
    var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
    AWS.config.credentials = credentials;

    // Specify the region.
    // AWS.config.update({region:aws_region});

    AWS.config.update({
        region: aws_region,
        apiVersion: 'latest',
        credentials: {
          accessKeyId: 'AKIASIN5SDCKYNGHVFVE',
          secretAccessKey: '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'
        }
      })

    //Create a new Pinpoint object.
    var pinpoint = new AWS.Pinpoint();

    // Specify the parameters to pass to the API.
    var params = {
    ApplicationId: applicationId,
    MessageRequest: {
        Addresses: {
        [destinationNumber]: {
            ChannelType: 'SMS'
        }
        },
        MessageConfiguration: {
        SMSMessage: {
            Body: message,
            // Keyword: registeredKeyword,
            MessageType: messageType,
            // OriginationNumber: originationNumber,
            SenderId: senderId,
        }
        }
    }
    };

    //Try to send the message.
    pinpoint.sendMessages(params, function(err, data) {
    // If something goes wrong, print an error message.
    if(err) {
        console.log(err.message);

        response.status(400).send({
            message: ""+err.message,
            status: "Error",
            status_code: 400
        });

        return;
    // Otherwise, show the unique ID for the message.
    } else {
        console.log("Message sent! " 
            + data['MessageResponse']['Result'][destinationNumber]['StatusMessage']);
    
            // console.log(data);

            response.json({
                message_id: "Message Sent Successfully",
                status: "Success",
                status_code: 100
            });
    
        }
    });

});


// import models

// create tables of they dont exist
const db = require("./models");

db.sequelize_me.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.sequelize_me.sync();

// define other routes
require("./routes/student.routes")(app);
require("./routes/staff.routes")(app);

// define port the project will run on
// const PORT = process.env.PORT;
const PORT = 8086;

// Listen to Port
app.listen(PORT, () => {
    console.log(`Server successfully started at port - ${PORT}.`);
});

