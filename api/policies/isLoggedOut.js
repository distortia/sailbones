//Checks if user is logged off by looking at its authenticated session variable
module.exports = function(req, res, ok){
	
	if (!req.session.authenticated){
		return ok();
	} 
	else{
		var requireLoginError = [{name: 'loggedIn', message: 'You are already logged in!.'}]
		req.session.flash = {
			err: requireLoginError
		}
		res.redirect('/');
		return;
	}
}