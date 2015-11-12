/**
 * DivController
 *
 * @description :: Server-side logic for managing divs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	//Go to the main div page, where all divs are located when a get request when a get request is routed
	div: function(req, res){
		Div.find().sort({'index': 1}).exec(function(err, div){
			res.view('sandcastle/div/div',{divs: div});
		});
	},

	//Go to the edit div page, where one can edit the div's page, name and index, when a get request is routed
	edit: function(req,res){
		Div.findOne({id: req.params.id}).exec(function findOneCB(err, found){
			if(err) throw err;
			res.view('sandcastle/div/edit',{div: found});
		});
	},

	//After the user submits the form on the edit div page, save the information to its model and redirect the user, when a post request is routed
	edit_post: function(req, res){
		Div.findOne({id: req.params.id}).exec(function findOneCB(err, found){
			if(err) throw err;
			found.page = req.body.page;
			found.name = req.body.name;
			found.index = req.body.index;
			found.save(function(error){
				if(error) throw err;
				res.redirect('sandcastle/div/div');
			})
		});
	},

	//Go to the create a div page (called it design because create is one of the shortcuts for sails), when a get request is routed
	create: function(req, res){
		res.view('sandcastle/div/design');
	},


	//After the user submits the form on the create page, save the information to its model and redirect the user, when a post request is routed
	create_post: function(req, res){
		Div.create({page: '/' + req.body.page, name: req.body.name + '-summernote', index: req.body.index})
		.exec(function createCB(err, created){
			if(err)
				throw err;
			else{
				req.flash('divMessage', 'Div Created'); //Need to implement the flash on view layer
				res.view('sandcastle/div/design');
			}
		});
	},

	//After hitting delete, the div with the associated id is removed, using a post request
	delete_post: function(req, res){
		Div.findOne({id: req.params.id}).exec(function findOneCB(err, found){
			if(err) throw err;
			Div.destroy(found.id).exec(function deleteCB(err){
				if(err) throw err;
				res.redirect('sandcastle/div/div');
			})
		});
	}
};

