//Add new user

$(document).on("tap", "#add-user-button", function(event) {
	event.preventDefault();

	$(".signup-photo-cover").fadeIn();

	$.ajax({
		url: endpointBase,
		type: "POST",
		data: {
			first_name: $("#new-firstname").val(),
			last_name: $("#new-lastname").val(),
			email: $("#new-email").val(),

		},
		success: function(user) {
			var userId = user.id;
			$.mobile.changePage("#user-list");

			var ft = new FileTransfer();
			var options = {
				fileKey: "file",
				mimeType: "image/jpeg"
			};
			ft.upload(userImage, "http://daretodiscover.herokuapp.com/members/"+ userId+ "/photo", ftSuccess, ftError, options);


			function ftSuccess(){
				$(".signup-photo-cover").fadeOut(function() {
					var firstName = $("#new-firstname").val();
					var lastName = $("#new-lastname").val();
					var email = $("#new-email").val();

					var contact = navigator.contacts.create();

					contact.name = {
						givenName: firstName,
						familyName: lastName
					}

					contact.save();

					$.mobile.changePage('#user-list');
				});
				
			}

			function ftError() {
				alert("Something went wrong...")
			}




		}
	});
});

//Go to signup page

$(document).on("tap", "#login-signup-button", function() {
	$.mobile.changePage("#signup1", {
		transition: "slideup"
	});
});

//Signup with Facebook

$(document).on("tap", ".signup-facebook-option", function(event) {
	event.preventDefault();

	var authId = genRandToken();

	var facebookStart = window.open("http://daretodiscover.herokuapp.com/start_auth?provider=facebook&token=" + authId, "_blank", "location=yes");

	facebookStart.addEventListener("loadstop", function(event) {
		var myUrl = event.url.split("?")[0];
		if (myUrl === "http://daretodiscover.herokuapp.com/auth/facebook/callback") {
			$.ajax({
				type: "POST",
				url: "http://daretodiscover.herokuapp.com/get_auth",
				data: {
					authId: authId
				},

				// data here is the data facebook sends back
				success: function(data) {
					facebookStart.close();
					
					alert("successful authentication")
				},
				error: function() {
					facebookStart.close();
				}
			});
		} else if (myUrl === endpointBase + "auth/failure") {
			facebookStart.close();
		}
	});
});