var mongoose = require('mongoose');
var config = require('../constants/constants');
mongoose.Promise = global.Promise;
// mongoose.connect(config.MONGO_URI);
mongoose.connect(config.MONGO_URI , (err) => {
   console.log("mongodb connected",err);
})
module.exports = {mongoose};
