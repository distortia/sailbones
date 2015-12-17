//Checks if user is logged in by looking at its authenticated session variable
module.exports = function(req, res, ok){	
	if (req.session.authenticated) return ok(); 
	else{
		req.session.flash = {requireLoginError: 'You are not logged in'};		
		res.redirect('/');
		return;
	}
}