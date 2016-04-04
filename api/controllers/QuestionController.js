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
        if(req.body['g-recaptcha-response']){
            ReCaptcha.checkReCaptcha(req.body['g-recaptcha-response'], function(error, sucess){
                if(error){
                    res.redirect('/?error=' + error);
                }
                if(sucess){
                    delete req.body['g-recaptcha-response'];
                    for(var item in req.body){
                        (function(question){
                            var questionSplit = question.split("~~~");
                            var questionObject = {question: questionSplit[0], answer: req.body[question]};
                            for(var i = 1; i<questionSplit.length; i++){
                                questionObject[questionSplit[i]] = true;
                            }
                            Question.findOne({question: questionObject.question}).exec(function findOneCB(err, found){
                                if(err) unknownErrorLog(err, req, res);
                                if(found){
                                    found.answer.push(questionObject.answer);
                                    found.save(function(error){
                                        if(error) unknownErrorLog(error, req, res);
                                    })
                                }
                                else{
                                    Question.create(questionObject).exec(function createdCB(err, newQuestion){
                                        if(err) unknownErrorLog(err, req, res);
                                    });
                                }
                            });
                        })(item);
                    }
                }
                res.redirect('/?thankyou=thanks');
            })
        }
        else{
            res.redirect('/feedback?error=Please Enter ReCaptcha');
        }
    },
    
    //Goes to the feedback data page and sends the feedback data to the view
    feedbackData: function(req, res){
        Question.find().exec(function(error, questions){
            if(error) unknownErrorLog(error, req, res);
            if(!questions || !questions.length){
                req.session.flash = {questionError: 'No Feedback has been submitted'};
            }
            res.view('feedback/viewfeedback', {questions: questions});
        })
    }
    
    
};

//Function to log unknown errors
function unknownErrorLog(error, req, res){
    req.session.flash = {unknownError: 'An unknown error has occured'};
    sails.log.error(error);
    res.redirect('/');
}