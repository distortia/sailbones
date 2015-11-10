//Checks if user is logged in by looking at its authenticated session variable
module.exports = function(req, res, ok){
	
	if (req.session.authenticated && req.session.user.canEdit){
		return ok();
	} 
	else{
		var requireLoginError = [{name: 'requireLogin', message: 'You must be signed in to access this page.'}]
		req.session.flash = {
			err: requireLoginError
		}
		res.redirect('/sandcastle/user/login');
		return;
	}
}