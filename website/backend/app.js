var bodyParser = require("body-parser");
const express = require('express');
const app = express();
var http = require('http');
var path = require("path");
var nodemailer = require("nodemailer");
const server = http.createServer(app);
const WebSocket = require('ws');
const webServer = new WebSocket.Server({ server });
var { mongoose } = require("./db/mongoose");
var { SoilMoisture } = require('./models/moisture');
app.use(bodyParser.json());

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
        var moisture = new SoilMoisture({ humidity_level : message });
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
