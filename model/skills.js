// Load Mongoose object modeling
var mongoose = require('mongoose');

// Define Patient schema
module.exports = mongoose.model('Skills', {
	sID: String,
    name: String,
  	description: String,
});