var changepass = document.getElementById("change-password");

changepass.addEventListener('click', function(){
	var newpassword = document.getElementById("new-password").value;
    var confirmnewpassword = document.getElementById("confirm-new-password").value;
    
    if (newpassword != confirmnewpassword){
        alert("New password does not match")
    } else if(newpassword == ''){
        alert("Password is required")
    } else{
        changepassword(newpassword);
    }
})

function changepassword(newpassword) {
    $.ajax({
		url: 'http://localhost:8000/login',
		type: "PUT",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			password: newpassword
		}),
		success: function (resp) {
			alert(resp.Message);
		},
		error: function (e) {
			alert("Error Occured.");
		},
		beforeSend: function (xhrObj){
		  xhrObj.setRequestHeader("Authorization",
				"Basic " + btoa("Zaide:Zaide001"));
	   }
	});
}
/*
changepass.addEventListener('click', function(){
	var username = document.getElementById("username").value;
	var newpassword = document.getElementById("new-password").value;
    var confirmnewpassword = document.getElementById("confirm-new-password").value;
    
    if (newpassword != confirmnewpassword){
        alert("New password does not match")
    } else if(newpassword == ''){
        alert("Password is required")
    } else{
        changepassword(username, newpassword);
    }
})

function changepassword(username, newpassword) {
    $.ajax({
		url: 'http://localhost:8000/login',
		type: "PUT",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			username: username,
			password: newpassword
		}),
		success: function (resp) {
			alert(resp.status);
		},
		error: function (e) {
			alert("Error Occured.");
		},
		beforeSend: function (xhrObj){
		  xhrObj.setRequestHeader("Authorization",
				"Basic " + btoa("Zaide:Zaide001"));
	   }
	});
}
*/