var mongoose = require('mongoose');

var SoilMoisture = mongoose.model('SoilMoisture',{
        humidity_level :  {type : String, required : false},
        time : { type : Date, default: Date.now }
    });

module.exports = {SoilMoisture};
