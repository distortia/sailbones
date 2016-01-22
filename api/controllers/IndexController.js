/**
 * IndexController
 *
 * @description :: Server-side logic for managing indices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	//Gos to the home page and grabs the divs associated with the homepage, and passes other variable into the homepage as well
	index: function(req,res){
		Div.find({page: "/"}).sort({'index': 1}).exec(function(err, divs){
			if(err) unknownErrorLog(err,req,res);
			res.view('homepage', {
				div: divs,
				title: 'Home',
				user: req.user,
				editable: true
			});
		});
	},

	//Goes to the login page via get request
	login: function(req,res){
		res.view('sandcastle/user/login');
	},

	//Goes to the signup page via get request
	signup: function(req,res){
		res.view('sandcastle/user/signup');
	},

	//Goes to the reset page via get request
	reset: function(req,res){
		res.view('sandcastle/user/reset');
	},
	
	//Goes to the actual form to reset the user's password	
	reset_pw: function(req, res){
		res.view('sandcastle/user/resetPassword', {email: req.params.email});
	},
	
	//Sends an email with a unique ID for the user to reset
	reset_post: function(req, res){
		User.findOne({email: req.body.email}).exec(function findOneCB(err, found) {
			if (err) unknownErrorLog(err, req, res);
			if (found) {
				found.uniqueId = randomAuth();
				found.save(function (error) {
				    if (error) unknownErrorLog(error,req,res);
                    EmailService.resetPassword({email: found.email, uniqueId: found.uniqueId});
                    req.session.flash = {resetMessage: 'An email has been sent to ' + found.email + ' with instructions on how to reset your password'};
                    res.redirect('/');
				})
			}
			else{
				req.session.flash = {resetPasswordError: 'No user found with the email of ' + req.body.email};
				res.redirect('/sandcastle/user/reset');
			}
		});
	},
	
	//Changes the user's password if the unique ID is entered correctly
	reset_pw_post: function(req, res){
		User.findOne({email: req.params.email}, function(err, user){
            if (err) unknownErrorLog(err, req, res);
			if(user.uniqueId === req.body.uniqueId && user.uniqueId != 'undefined'){
				if(req.body.password === req.body.confirm){
					user.uniqueId = 'undefined';
					require('bcryptjs').hash(req.body.password, 10, function passwordEncrypted(err, encryptedPW){
						if(err){
                            sails.log.error(err);
                            return next(err);
                        }
						user.password = encryptedPW;
						user.save(function(error){
                            if(error) unknownErrorLog(error, req, res);
						})
					})
					
				}
				else{
					req.session.flash = {passowrdResetError: 'Passwords do not match'};
					res.redirect('/sandcastle/user/resetPassword/' + req.params.email);
				}
			}
			else{
				req.session.flash = {passowrdResetError: 'Invalid unique ID'};
				res.redirect('/sandcastle/user/resetPassword/' + req.params.email);
			}
		})
	},
	
	//Calls the Email service and sends over the email address and the body message, and then redirects to the homepage
	//with a flash message
	mail: function(req, res){
		EmailService.sendMail({email: req.body.email, message: req.body.message});
		req.session.flash = {thankyou: 'Message Sent! Thank You!'};
		res.redirect('/');
	}

};


//Password Reset random number generation for verification
function randomAuth(){
	var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}

//Function to log unknown errors
function unknownErrorLog(error, req, res){
    req.session.flash = {unknownError: 'An unknown error has occured'};
    sails.log.error(error);
    res.redirect('/');
}
