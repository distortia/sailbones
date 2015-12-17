/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcryptjs');

module.exports = {

	attributes: {
	  	email: {
	  		type: 'string',
	  		unique: true,
	  		required: true
	  	},
	  	password: {
	  		type: 'string',
	  		required: true
	  	},
	  	isAdmin: {
	  		type: 'boolean',
	  		defaultsTo : true
	  	},
	  	canEdit: {
	  		type: 'boolean',
	  		defaultsTo : false
	  	},
	  	uniqueId: {
	  		type: 'string',
	  		defaultsTo : false
	  	},
  	},

  	//Executes after a new user is created, it checks if the the confirm passwords are the same and if the
  	//password is not blank
  	beforeCreate: function(values, next) {
		if (!values.password || values.password != values.confirm) {
			console.log(values);
			return next({
				err: ["Password does not match password confirmation."]
			});
		}
		bcrypt.hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
			if (err) return next(err);
			values.password = encryptedPassword;
			next();
		});
	}
};

