window.onload = function () {

    $("#registerForm #username").keyup(function () {

	var username = $("#registerForm #username").val();

	if (username != "") {
	    var url = "api/isAvailable/" + username;
	    $.getJSON(url, {}, function (result) {

		if (result) {
		    $("#registerForm .btn").prop('disabled', false);
		    $("#registerFail").text("");
		} else {
		    $("#registerForm .btn").prop('disabled', true);

		    $("#registerFail").text("The user name is already used");
		    $("#loginFail").text("");
		    $("#registerSuccess").text("");
		}
	    });
	}

    });

    $("#loginBtn").click(function (event) {
	var username = $("#loginForm #username").val();
	var password = $("#loginForm #password").val();
	var url = "api/login";

	$.post(url, {username: username, password: password}, function (result) {
	    if (result) {
		$("#loginForm").submit();
	    } else {
		$("#loginFail").text("Username or password is incorrect");
		$("#registerSuccess").text("");
		$("#registerFail").text("");
	    }
	});
    });

    $("#registerBtn").click(function () {

	var username = $("#registerForm #username").val();
	var password1 = $("#registerForm #password1").val();
	var password2 = $("#registerForm #password2").val();

	if (password1 != "" && password2 != "" && password1 == password2) {
	    var url = "api/register";
	    $.post(url, {username: username, password: password1}, function (result) {
		if (result) {
		    $("#registerSuccess").text("You have registered successfully! Now please log in");
		    $("#loginFail").text("");

		    $("#registerForm #username").val("");
		    $("#registerForm #password1").val("");
		    $("#registerForm #password2").val("");

		    $("#loginForm").delay(100).fadeIn(100);
		    $("#registerForm").fadeOut(100);
		    $('#register-form-link').removeClass('active');
		    $(this).addClass('active');
		}
	    });
	} else {
	    $("#loginFail").text("");
	    $("#registerSuccess").text("");
	    $("#registerFail").text("Passwords are not valid");
	}
    });

    $('#login-form-link').click(function (e) {
	$("#loginForm").delay(100).fadeIn(100);
	$("#registerForm").fadeOut(100);
	$('#register-form-link').removeClass('active');
	$(this).addClass('active');
	e.preventDefault();
    });

    $('#register-form-link').click(function (e) {
	$("#registerForm").delay(100).fadeIn(100);
	$("#loginForm").fadeOut(100);
	$('#login-form-link').removeClass('active');
	$(this).addClass('active');
	e.preventDefault();
    });
};

