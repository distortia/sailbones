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
            if(err) unknownErrorLog(err, req, res);
			res.view('sandcastle/div/div',{divs: div});
		});
	},

	//Go to the edit div page, where one can edit the div's page, name and index, when a get request is routed
	edit: function(req,res){
		Div.findOne({id: req.params.id}).exec(function findOneCB(err, found){
			if(err) unknownErrorLog(err, req, res);
			res.view('sandcastle/div/edit',{div: found});
		});
	},

	//After the user submits the form on the edit div page, save the information to its model and redirect the user, when a post request is routed
	edit_post: function(req, res){
		Div.findOne({id: req.params.id}).exec(function findOneCB(err, found){
			if(err) unknownErrorLog(err, req, res);
            //Append a backslash to the page if there is none or if the page is empty
            found.page = ((!req.body.page || req.body.page.charAt(0) != '/') ? '/' + req.body.page: req.body.page);			
            found.name = req.body.name;          
            //Default the index to 0 if nothing is entered into the index field
            found.index = (req.body.index ? req.body.index:0);			
            found.save(function(error){
				if(error) unknownErrorLog(error, req, res);
				req.session.flash = {divMessage: 'Div Updated!'};
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
        //Default the index to 0 if nothing is entered into the index field
        var divIndex = (req.body.index ? req.body.index:0);
		Div.create({page: '/' + req.body.page, name: req.body.name + '-sandcastle', index: divIndex}).exec(function createCB(err, created){
			if(err) unknownErrorLog(err, req, res);
			else{
				req.session.flash = {divMessage: 'Div Created!'}; //Need to implement the flash on view layer
				res.redirect('sandcastle/div/div');
			}
		});
	},

	//After hitting delete, the div with the associated id is removed, using a post request
	delete_post: function(req, res){
		Div.findOne({id: req.params.id}).exec(function findOneCB(err, found){
			if(err) unknownErrorLog(err, req, res);
			Div.destroy(found.id).exec(function deleteCB(err){
				if(err) unknownErrorLog(err, req, res);
				req.session.flash = {divMessage: 'Div Deleted'};
				res.redirect('sandcastle/div/div');
			})
		});
	},

	//This corresponds to the CMS save button, when editing the site's text in different areas.  This updates the
	//div's text or creates a new div if it doesn't exist
	save: function(req, res, next){
		Div.findOne({name: req.body.name}).exec(function findOneCB(err, found){
			if(err) unknownErrorLog(err, req, res);
			if(found){
				found.page = req.body.page;
				found.name = req.body.name;
				found.content = req.body.content;
				found.save(function(error){
					if(error) unknownErrorLog(error, req, res);
					next();
				})
			}
			else{
				Div.create({page: req.body.page, name: req.body.name, content: req.body.content}).exec(function createCB(err, created){
					if(err) unknownErrorLog(err, req, res);
					else next();
				});
			}
		});
	}
};

//Function to log unknown errors
function unknownErrorLog(error, req, res){
    req.session.flash = {unknownError: 'An unknown error has occured'};
    sails.log.error(error);
    res.redirect('/');
}