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
			if(err) res.send(err)
			res.view('sandcastle/user/users',{users: users});
		})
	},

	//Goes to the specific user's information edi page, when a get request is routed
	edit: function(req,res){
		User.findOne({id: req.params.id}).exec(function findOneCB(err, found){
			if(err) throw err;
			res.view('sandcastle/user/user',{user: found});
		});
	},

	//After the information is updated for the user, save the data in its model and redirect the user, when a post request is routed
	edit_post: function(req, res){
		User.findOne({id: req.params.id}).exec(function findOneCB(err, user){
			if(err) throw err;
			user.email = req.body.email;
			user.isAdmin = (req.body.isAdmin === 'on' ? true : false);
			user.canEdit = (req.body.canEdit === 'on' ? true: false);
			user.save(function(error){
				if(error) throw err;
				res.redirect('sandcastle/user/users');
			})
		});		
	},

	//After hitting delete, the user with the associated id is removed, using Post request
	delete_post: function(req, res){
		User.findOne({id: req.params.id}).exec(function findOneCB(err, found){
			if(err) throw err;
			User.destroy(found.id).exec(function deleteCB(err){
				if(err) throw err;
				res.redirect('sandcastle/user/users');
			})
		});
	}
	
};

