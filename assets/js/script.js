div = $("[id$=sandcastle]"); //jquery wildcard for id's ending in sandcastle

var edit = function() {
	div.trumbowyg({

	});
	var saveButton= $('<button id="save" onclick="save()" class="button-primary">Save</button>');
	var cancelButton= $('<button id="cancel" onclick="cancel()" class="button-primary">Cancel</button>');
    $("#edit-bar").prepend(saveButton);  //adds the save and cancel buttons
    $("#edit-bar").prepend(cancelButton);
    $("#edit").remove();  //removes unnecessary edit button
};

var save = function() {
	$.each(div, function(i){
		key = $(div[i]); //assigns each div to the variable key
		$.ajax({
			type: "PUT",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			url: '/save',
			data: {page: window.location.pathname, name: key.attr('id'),content: key.trumbowyg('html').trim()},
		}).done(
			setTimeout(function(){
				location.reload()}, 1000));
	});
	// location.reload();
};

var cancel = function() {
	location.reload();
};

var deleteDiv = function(id){
	swal({  title: "Are you sure?",
			text: "You will not be able to undo this action!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "No, cancel!",
			closeOnConfirm: false,
			closeOnCancel: false,
			showLoaderOnConfirm: true
		},
		function(isConfirm){
			if (isConfirm) {
				$.ajax({
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					url: '/sandcastle/div/delete/' + id
				});
				setTimeout(function(){
					swal("Deleted!",
					 "The Div has been deleted. " ,
					 "success");
					location.reload();
				}, 2000); // Set a 2 second timer for the deletion
			} else {
				swal("Cancelled", "The div has not been deleted", "error");
			}
		}
	);
};
var deleteUser = function(id){
	swal({  title: "Are you sure?",
			text: "You will not be able to undo this action!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete!",
			cancelButtonText: "No, cancel!",
			closeOnConfirm: false,
			closeOnCancel: false,
			showLoaderOnConfirm: true
		},
		function(isConfirm){
			if (isConfirm) {
				$.ajax({
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					url: '/sandcastle/user/delete/' + id
				});
				setTimeout(function(){
					swal("Deleted!",
					 "The user has been deleted. " ,
					 "success");
					location.reload();
				}, 2000); // Set a 2 second timer for the deletion
			} else {
				swal("Cancelled", "The user has not been deleted", "error");
			}
		}
	);
};


// Process section
var plan = $(".plan");
var build = $(".build");
var analyze = $(".analyze");

var planContent =
"<div class=\"plan-content\"> \
  <h4>Conversationally Driven Development</h4> \
  <p>Through conversations with you, we gather information to build a custom website designed for your unique customers.</p> \
  <p>These conversations establish common goals and foundation for the project</p> \
  <p>Examples: \
    <p>How does your typical customer interact with the website?</p> \
    <p>What makes your product better than those of competitors?</p> \
    <p>What makes you passionate about what you do?</p> \
  </p> \
</div>";

var buildContent =
"<div class=\"build-content\"> \
  <h4 class='build-header'>The right tools for the right jobs</h4> \
    <!-- I would like to have the images for each and its name above it--> \
  <div class=\"tool-list\"> \
    <div>\
      <h4>Trello</h4>\
      <a href='https://trello.com/'><img src='/images/trello-mark-blue.png' alt='https://trello.com/'></a>\
    </div> \
    <div>\
      <h4>Sass</h4>\
      <a href='http://sass-lang.com/'><img src='/images/sass.png' alt='http://sass-lang.com/'></a>\
    </div> \
    <div>\
      <h4>Handlebars</h4>\
      <a href='http://handlebarsjs.com/'><img src='http://handlebarsjs.com/images/handlebars_logo.png' alt='http://handlebarsjs.com/'></a>\
    </div> \
    <div>\
      <h4>SailsJs</h4>\
      <a href='http://sailsjs.org/'><img src='http://sailsjs.org/images/logos/sails-logo_ltBg_ltBlue.png' alt='http://sailsjs.org/'></a>\
    </div> \
    <div>\
      <h4>Sandcastle</h4>\
      <a href=''><img src='/images/sandcastle.jpg' alt='Sandcastle JS'></a>\
    </div> \
  </div> \
</div>";

var analyzeContent =
"<div class=\"analyze-content\"> \
  <h4>Insight into actions</h4> \
  <p>Where are your visitors coming from, and where are they going?</p> \
    <p>Analytics can provide answers to questions like: \
    <p>How are people using my website?</p>\
    <p>How did they get to my website?</p>\
    <p>How long as they spending on my website?</p>\
  </p> \
  <!--Maybe a screenshot of analytics but blurred a bit so you cant see whose site it is--> \
  <img src=\"holder.js/600x400\" alt=\"\"> \
</div>";

$( document ).ready(function(){
  $(".column-2").html(planContent);
    plan.addClass("active");


  var wordList = ["mobile friendly", "fast", "search engine friendly", "accessible for all users",
                  "easy to use", "lightweight", "laid out correctly", "cross browser/platform", "elegant",
                  "stable", "built for your customers", "providing analytics"];
  setInterval(function() {
    var randomIndex = Math.floor(Math.random() * (wordList.length - 1));
    $("#word").html(wordList[randomIndex] + "?");
  }, 3500);
});

plan.click(function(){
 $(".column-2").html(planContent);
  if (build.hasClass("active")) {
    build.removeClass("active");
  } else {
    analyze.removeClass("active");
  }
  plan.addClass("active");
});

build.click(function(){
  $(".column-2").html(buildContent);

  if (plan.hasClass("active")) {
    plan.removeClass("active");
  } else {
    analyze.removeClass("active");
  }
  build.addClass("active");
});

//on click .analyze, hide whatever, show .analyze-content
analyze.click(function(){
  $(".column-2").html(analyzeContent);
  if (plan.hasClass("active")) {
    plan.removeClass("active");
  } else {
    build.removeClass("active");
  }

  analyze.addClass("active");
});

input = $("[id$=question]");

var submitFeedback = function() {
	$.each(input, function(i){
		key = $(input[i]); //assigns each div to the variable key
        var isNumeric = key.hasClass('numeric') ? true : false;
		$.ajax({
			type: "PUT",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			url: '/feedback',
			data: {question:key.attr('name'), answer: key.val(), isNumeric:isNumeric},
		}).done(
			setTimeout(function(){
				location.replace('/')}, 100));
	});
	// location.reload();
};
