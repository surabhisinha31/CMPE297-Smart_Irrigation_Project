var bodyParser = require("body-parser");
const express = require('express');
const app = express();
var http = require('http');
var path = require("path");
const server = http.createServer(app);
const WebSocket = require('ws');
const webServer = new WebSocket.Server({ server });
var { mongoose } = require("./db/mongoose");
var { SoilMoisture } = require('./models/moisture');
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('server IP address: '+add);
})

app.get('/', function(req, res) {
res.sendFile(path.join(__dirname + '/index.html'));
});

webServer.on('connection',function(ws,req){
    ws.on('message',function(message){
        console.log("Received: "+message);
        var moisture = new SoilMoisture({ humidity_level : message });
        moisture.save(function (err) {
          if (err) return handleError(err)
        });
        webServer.clients.forEach(function(client){
        if(client!=ws && client.readyState ){
          client.send("broadcast: " +message);
        }
    });
  });
  ws.on('close', function(){
    console.log("lost one client");
  });
console.log("new client connected");
});
server.listen(3000);
