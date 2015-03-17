var userImage;

function cameraSuccess(imageUri) {
		// $('#signup-profile-picture').css("background", "url(" + imageUri +") no-repeat;")
		$('#signup-profile-picture').attr("style", "background: url(" + imageUri +") no-repeat;")
		userImage = imageUri
}


function cameraFail() {
		alert("Something went wrong...");
}

//Signup user photo

$(document).on("tap", "#signup-take-photo", function() {

});

$(document).on("tap", "#signup-use-library", function() {
	navigator.camera.getPicture(cameraSuccess, cameraFail, {
		quality: 75,
		destinationType: Camera.DestinationType.File_URI,
		sourceType: Camera.PictureSourceType.PHOTOLIBRARY
	});

	

});

//Edit user photo

$(document).on("tap", "#edit-take-photo", function() {

});

$(document).on("tap", "#edit-use-library", function() {
	
});