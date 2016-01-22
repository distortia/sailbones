/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcryptjs');

module.exports = {

	create: function(req, res, next) {
		//Check if email or password exists
		if (!req.body.email || !req.body.password) {
			req.session.flash = {UserLoginError: 'You must enter both a username and a password.'};
			res.redirect('/sandcastle/user/login');
            return;
		}
		User.findOneByEmail(req.body.email, function foundUser(err, user) {
			if (err){
                sails.log.error(err);
                return next(err);
            }
			if (!user) {
				req.session.flash = {UserLoginError: 'The email address ' + req.body.email + ' was not found'};
				res.redirect('/sandcastle/user/login');
                return;
			}
			bcrypt.compare(req.body.password, user.password, function(err, valid) {
				if (err){
                    sails.log.error(err);
                    return next(err);
                }
				if (!valid) {
					req.session.flash = {UserLoginError: 'Invalid username and password combination'};
					res.redirect('/sandcastle/user/login');
                    return;
				}
				//Authenticate User
				req.session.authenticated = true;
				req.session.user = user;
				res.redirect('/');
			});
		});
	},

	destroy: function(req, res, next) {
		User.findOne(req.session.user.id, function foundUser(err, user) {
			var userId = req.session.user.id;
			if (user) {
				// The user is "logging out" (e.g. destroying the session) so change the online attribute to false.
				User.update(userId, {
					online: false
				}, function(err) {
					if (err){
                        sails.log.error(err);
                        return next(err);
                    }

					// Inform other sockets (e.g. connected sockets that are subscribed) that the session for this user has ended.
					User.publishUpdate(userId, {
						loggedIn: false,
						id: userId,
						name: user.name,
						action: ' has logged out.'
					});

					// Wipe out the session (log out)
					req.session.destroy();

					// Redirect the browser to the sign-in screen
					res.redirect('/sandcastle/user/login');
				});
			} 
			else {
				User.update(userId, {
					online: false
				}, function(err){
					if (err){
                        sails.log.error(err);
                        return next(err);
                    }
				});
				// Wipe out the session (log out)
				req.session.destroy();
				// Redirect the browser to the sign-in screen
				res.redirect('/sandcastle/user/login');
			}
		});
	}
	
};