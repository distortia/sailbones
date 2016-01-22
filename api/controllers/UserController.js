/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	//Goes to the users page if there's users in the model, when a get request is routed
	user: function(req, res){
		User.find().exec(function(err, users){
			if(err) unknownErrorLog(err, req, res);
			res.view('sandcastle/user/users',{users: users});
		})
	},

	create_post: function(req, res, next){
		User.create({email: req.body.email, password: req.body.password, confirm: req.body.confirm})
		.exec(function createCB(err, created){
			if(err){
                if(err.code == "E_VALIDATION"){
                    req.session.flash = {UserError: req.body.email + ' Already Exists'};
                    res.redirect('sandcastle/user/signup');
                }
                else if(err.toJSON().raw['passwordMisMatch']){
                    req.session.flash = {UserError: 'Passwords Do not Match'};
                    res.redirect('sandcastle/user/signup');
                }
                else{
                    req.session.flash = {UserError: 'Unknown Error Has Occurred, Please Try again'};
                    sails.log.error(err);
                    res.redirect('sandcastle/user/signup');
                } 
            }
			else{
				req.session.flash = {UserMessage: 'User Created'}; //Need to implement the flash on view layer
				req.session.authenticated = true;
				req.session.user = created;
				res.redirect('/');
			}
		});
	},

	//Goes to the specific user's information edi page, when a get request is routed
	edit: function(req,res){
		User.findOne({id: req.params.id}).exec(function findOneCB(err, found){
			if(err) unknownErrorLog(err, req, res);
			res.view('sandcastle/user/user',{user: found});
		});
	},

	//After the information is updated for the user, save the data in its model and redirect the user, when a post request is routed
	edit_post: function(req, res){
		User.findOne({id: req.params.id}).exec(function findOneCB(err, user){
			if(err) unknownErrorLog(err, req, res);
			user.email = req.body.email;
			user.isAdmin = (req.body.isAdmin === 'on' ? true : false);
			user.canEdit = (req.body.canEdit === 'on' ? true: false);
			user.save(function(error){
				if(error){
                    if(error.code == "E_VALIDATION"){
                        req.session.flash = {UserError: req.body.email + ' Already Exists'};
                        res.redirect('sandcastle/user/edit/' + req.params.id);
                    }
                    else{
                        req.session.flash = {UserError: 'Unknown Error Has Occurred, Please Try again'};
                        sails.log.error(error);
                        res.redirect('sandcastle/user/edit/' + req.params.id);  
                    }
                }
                else{
				    req.session.flash = {UserMessage: 'User Updated'};
				    res.redirect('sandcastle/user/users');
                }
			})
		});		
	},

	//After hitting delete, the user with the associated id is removed, using Post request
	delete_post: function(req, res){
		User.findOne({id: req.params.id}).exec(function findOneCB(err, found){
			if(err) unknownErrorLog(err, req, res);
			User.destroy(found.id).exec(function deleteCB(err){
				if(err) unknownErrorLog(err, req, res);
				req.session.flash = {UserMessage: 'User Deleted'};
				res.redirect('sandcastle/user/users');
			})
		});
	}
	
};

//Function to log unknown errors
function unknownErrorLog(error, req, res){
    req.session.flash = {unknownError: 'An unknown error has occured'};
    sails.log.error(error);
    res.redirect('/');
}