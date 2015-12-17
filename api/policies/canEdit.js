//Checks if user is logged in by looking at its authenticated session variable
module.exports = function(req, res, ok){
	if (req.session.authenticated && req.session.user.canEdit) return ok();
	else{
		req.session.flash = {requireLoginError: 'You must be signed in to access this page.'};
		res.redirect('/sandcastle/user/login');
		return;
	}
}