//Checks if the user is an admin, by using the saves user object in the session
module.exports = function(req, res, ok){
	if(req.session.user && req.session.user.isAdmin) return ok();
	else{
		req.session.flash = {requireAdmin: 'You do not have administrative permissions to access this feature.'};
		res.redirect('/sandcastle/user/login');
		return;
	}
}
