/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt-nodejs');

module.exports = {

	attributes: {
	  	email: {
	  		type: 'string',
	  		index: {unique: true}
	  	},
	  	password: 'string',
	  	isAdmin: {
	  		type: 'boolean',
	  		defaultsTo : false
	  	},
	  	canEdit: {
	  		type: 'boolean',
	  		defaultsTo : false
	  	},
	  	uniqueId: {
	  		type: 'string',
	  		defaultsTo : false
	  	}
	  	//The password methods have been commented out for now, currently testing out other User controller 
	  	//functions before moving on to encryption.
	  	/*,
	  	validatePassword: function (password, next) {
	      bcrypt.compare(password, this.password, next);
	    } */
  	}/*,

  	beforeCreate: function(values, next) {
		if (!values.password || values.password != values.confirm) {
			return next({
				err: ["Password does not match password confirmation."]
			});
		}
		bcrypt.hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
			if (err) return next(err);
			values.password = encryptedPassword;
			next();
		});
	},

	beforeUpdate: function(values, next) {
		if (!values.password || values.password != values.confirm) {
			return next({
				err: ["Password does not match password confirmation."]
			});
		}
		bcrypt.hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
			if (err) return next(err);
			values.password = encryptedPassword;
			next();
		});
	}*/

};

