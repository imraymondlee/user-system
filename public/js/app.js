$(document).foundation();


function login(){
	var email = $('#email').val();
	var password = $('#password').val();

	var credential = {
		"email": email,
		"password": password
	};

	console.log(credential);

	$.ajax({
		method: "POST",
		url: "http://localhost:3000/login",
		data: JSON.stringify(credential),
		contentType: 'application/json',
		dataType: "json",
		success: function(data, status, xhr){
	        alert('success');
	        window.location.href = '/dashboard';
		},
		error: function(xhr, status, error){
			alert('error');
			console.log('XHR');	
			console.log(xhr);
			console.log('STATUS');
			console.log(status);
			console.log('ERROR');
			console.log(error);
		}
	});
}


function register(){
	var email = $('#email').val();
	var password = $('#password').val();
	var password2 = $('#password2').val();

	if(password != password2){
		alert('Password does not match.');
		return false;
	}

	var credential = {
		"email": email,
		"password": password
	};

	$.ajax({
		method: "POST",
		url: "http://localhost:3000/register",
		data: JSON.stringify(credential),
		contentType: 'application/json',
		dataType: "json",
		success: function(data, status, xhr){
	        alert('success');
	        window.location.href = '/dashboard';
		},
		error: function(xhr, status, error){
			alert('error');
			console.log('XHR');	
			console.log(xhr);
			console.log('STATUS');
			console.log(status);
			console.log('ERROR');
			console.log(error);
		}
	});
}

function logout(){
	$.ajax({
		method: "DELETE",
		url: "http://localhost:3000/logout",
		success: function(data, status, xhr){
	        alert('You have been logged out.');
	        window.location.href = '/login';
		},
		error: function(xhr, status, error){
			alert('error');
			console.log('XHR');	
			console.log(xhr);
			console.log('STATUS');
			console.log(status);
			console.log('ERROR');
			console.log(error);
		}
	});
}