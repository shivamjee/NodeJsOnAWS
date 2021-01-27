const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locSchema = new Schema
(
	{
		
		address:{
			type: String,
			required: true,
		},
		long:{
	        type: Number,
	        required: true
	    },
	    lat:{
	        type: Number,
	        required: true
	    },
	},
	{
		timestamps: true
	}
);
const userSchema = new Schema
(
	{
		name:{
			type: String,
			required: true,
			unique: true
		},
		location:locSchema
	},
	{
		timestamps: true
	}
);
var users = mongoose.model('user',userSchema);

module.exports = users;