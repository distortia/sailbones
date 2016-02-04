/**
 * QuestionController
 *
 * @description :: Server-side logic for managing Questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
    //This saves one question, the submitFeedback function iterates through each input
    //of the feedback form to avoid race conditions when saving
    submitFeedback: function(req, res, next){
        Question.findOne({question: req.body.question}).exec(function findOneCB(err, found){
            if(err) console.log(err);
            if(found){
                found.answer.push(req.body.answer);
                found.save(function(error){
                    if(error) unknownErrorLog(error, req, res);
                    next();
                })
            }
            else{
                Question.create({question: req.body.question, answer: req.body.answer}).exec(function createdCB(err, newQuestion){
                    if(err) unknownErrorLog(err, req, res);
                    next();
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