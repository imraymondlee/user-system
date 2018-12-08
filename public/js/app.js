$(document).foundation()


function textFile(){
	$.ajax({
		method: "GET",
		url: "http://localhost:3000/test",
		dataType: "text",
		success: handleData,
		error: function(){
			alert('error');
		}
	})
}


function handleData(data){
	$('#placeholder').html(data);
	localStorage.setItem('test', data);
}

function retrieveLocalStorage(){
	alert(localStorage.getItem('test'));
}