$(document).foundation();


function retrieveLocalStorage(){
	alert(localStorage.getItem('test'));
}

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
	        var token = xhr.getResponseHeader('x-auth');
	        xhr.setRequestHeader('x-auth', token);
	        storeToken(token);
	        alert('success');
		},
		error: function(){
			alert('error');
		}
	});
}

function storeToken(token){
	console.log(token);
	localStorage.setItem('token', token);	
}

