var Recaptcha = require('recaptcha-verify');
var recaptcha = new Recaptcha({
    secret: '6LeoexgTAAAAAHQG_yL0uo5LSgeBXedr_w-QJudS',
    verbose: false
});

module.exports = { 
    //Used to checkReCaptchas captcha codes.  Send in the recaptcha code itself in the Service call
    checkReCaptcha: function(response, callback){
        var errorToSend = null;
        var success = null;
        recaptcha.checkResponse(response, function(error, response){
            if(error){
                sails.log.error(error);  
                errorToSend = "Unknown Error Has Occured";
            }
            if(response.success){
                success = true;
            }
            else{
                errorToSend = "Invalid ReCaptcha";
            }
            callback(errorToSend, success);
        });       
    }
};
