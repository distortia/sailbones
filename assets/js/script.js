div = $("[id$=sandcastle]"); //jquery wildcard for id's ending in sandcastle

var edit = function() {
	div.trumbowyg({

	});
	var saveButton= $('<li> <a id="save" onclick="save()" type="button" class="btn btn-default">Save</a> </li>');
	var cancelButton= $('<li> <a id="cancel" onclick="cancel()" type="button" class="btn btn-default">Cancel</a> </li>');
    $(".navbar-right").prepend(saveButton);  //adds the save and cancel buttons
    $(".navbar-right").prepend(cancelButton);
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
		});
	});
	location.reload();
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