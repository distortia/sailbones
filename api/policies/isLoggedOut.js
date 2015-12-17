//Checks if user is logged off by looking at its authenticated session variable
module.exports = function(req, res, ok){
	if (!req.session.authenticated) return ok();
	else{
		req.session.flash = {requireLogOffError: 'You are already logged in!'};				
		res.redirect('/');
		return;
	}
}