/**
 * IndexController
 *
 * @description :: Server-side logic for managing indices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	//Gos to the home page and grabs the divs associated with the homepage, and passes other variable into the homepage as well
	index: function(req,res){
		Div.find({page: "/"}).sort('index DESC').exec(function(err, divs){
			if(err) throw err;
			res.view('homepage', {
				div: divs,
				title: 'Home',
				user: req.user,
				editable: true
			});
		});
	},

	//Goes to the login page via get request
	login: function(req,res){
		res.view('sandcastle/user/login');
	},

	//Goes to the signup page via get request
	signup: function(req,res){
		res.view('sandcastle/user/signup');
	},

	//Goes to the reset page via get request
	reset: function(req,res){
		res.view('sandcastle/user/reset');
	}

};


//Password Reset random number generation for verification
function randomAuth(){
	var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}


