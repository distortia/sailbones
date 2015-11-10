//Default policy, allows any user, regardless of authentication, through
//Also clears the flash session variable.
module.exports = function(req, res, next) {
	res.locals.flash = {};
	if(!req.session.flash) return next();
	res.locals.flash = _.clone(req.session.flash);
	//clear flash
	req.session.flash = {};
	next();
}
