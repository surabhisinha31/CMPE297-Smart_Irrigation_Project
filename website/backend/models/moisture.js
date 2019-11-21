var mongoose = require('mongoose');

var SoilMoisture = mongoose.model('SoilMoisture',{
        humidity_level :  {type : String, required : false},
        time : { type : Number, required : false }
    });

module.exports = {SoilMoisture};
