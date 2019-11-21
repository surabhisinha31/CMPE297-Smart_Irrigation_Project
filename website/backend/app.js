var bodyParser = require("body-parser");
const express = require('express');
const app = express();
var http = require('http');
var path = require("path");
var nodemailer = require("nodemailer");
var session = require("express-session");
var cors = require("cors");
var cookieParser = require("cookie-parser");

const server = http.createServer(app);
const WebSocket = require('ws');
const webServer = new WebSocket.Server({ server });
var { mongoose } = require("./db/mongoose");
var { SoilMoisture } = require('./models/moisture');
const url = "http://localhost:3000";
var startValue = 0 ;

app.use(cors({ origin: url, credentials: true }));

app.use(function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', url);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// SMTP setup for sending email to user
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "480b5373040087",
    pass: "48bd7f094aaf39"
  }
});

var startTime = Date.now();
var endTime = 0;
console.log("Start time : " + startTime);
console.log("End time : " + endTime);
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('server IP address: '+add);
})

app.get('/', function(req, res) {
res.sendFile(path.join(__dirname + '/index.html'));
});

//====================================GET TRACE DATA==========================================================

app.post('/getTraceData/:ID', function (req,res,next) {
  console.log("inside get graph trace data",req.params.ID);
  var mydate = new Date().toISOString();
  var query = req.params.ID;
  console.log("Value of mydate: ", query);
  var d = new Date();
  d.setMonth(d.getMonth() - 1);
  console.log("Value of d: ", d);
  SoilMoisture.find({
    "time": { $gte: query}
  })
  .exec()
  .then(result => {
    console.log("Response sent for time after fetching is : ", result);
    // var largest = query;
    // for(var i = 0 ; i < result.length ; i++) {
    //   var timeValue = result[i].time;
    //   var humidityValue = 0;
    //   if(largest < timeValue) {
    //     largest = timeValue;
    //     humidityValue = result[i].humidity_level.split(',')[0];
    //   }
    // }
    startValue++;
    console.log("timeValue : " +startValue);
    res.status(200).json({
        message : "trace data fetched",
        soilTraceDetails : startValue
    });
  });
});
//==============================================================================================

// Email details

const email = {
  from: 'iotproject@sjsu.com',
  to: 'shikhasurabhi3108@gmail.com',
  subject: 'Immediate Action Required',
  text: 'Water level is going down. Please turn on the sprinkler.!!\n\n\nRegards, \nIOT Management Team'
};

// Web socket connection of server with ESP8266 Module

webServer.on('connection',function(ws,req){
    ws.on('message',function(message){
        console.log("Received sensor data: "+message);
        var moisture = new SoilMoisture({
          humidity_level : message,
          time : Date.now()
        });
        moisture.save(function (err) {
          if (err) return handleError(err)
        });
        var split = message.split(" , ");
        if(parseInt(split[0]) >= 800) {
            var startTime = Date.now();
            if(endTime == 0 || endTime - startTime >= 60) {
                transport.sendMail(email, function(err, info) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log(info);
                  }
                });
            }
        }
        endTime = Date.now();
  });
  ws.on('close', function(){
    console.log("lost connection with the ESP8266 Module");
  });
console.log("ESP8266 module is connected");
});
server.listen(3001);
