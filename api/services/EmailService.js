var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
	service: 'MailGun',
	auth: {
		user: 'postmaster@mg.couchsurfers.io',
		pass: 'eb4f0af14ca4444056344cd7035ded6d'
	}
});

module.exports = {

    sendMail: function(options) {
		var mailOptions = {
			from: options.email,
			to: 'Alphaity <alphaity@alphaity.io>',
			subject: 'Alphaity : Drop Us A Line from ' + options.email,
			text: options.message,
			html: options.message
		};
		
		sendEmailMessage(mailOptions);
    },
	
	//This links to the production server, if you are debugging on localhost, go to localhost/sandcastle/user/resetPassword/:email
	resetPassword: function(options){
		var mailOptions = {
			from: 'Alphaity <alphaity@alphaity.io>',
			to: options.email,
			subject: 'Alphaity Password Reset',
			text: 'You have a requested to change your password. Your temporary unique Id is - ' + options.uniqueId + '. To reset your password please click the following link: http://www.alphaity.io/sandcastle/user/resetPassword/' + options.email,
			html: '<p>You have a requested to change your password.</p><p>Your temporary unique Id is <strong>' + options.uniqueId + '</strong></p><p>To reset your password please click the following link: http://www.alphaity.io/sandcastle/user/resetPassword/' + options.email
		};
		
		sendEmailMessage(mailOptions);
	}
};

function sendEmailMessage(mailOptions){
	transporter.sendMail(mailOptions, function(error, info){
		if(error) console.log("Error: " + error);
		else console.log('Message Sent: ' + info.response);
	});
}