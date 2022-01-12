var login = document.getElementById("login");

login.addEventListener('click', function(){
	var password = document.getElementById("password").value;
    
    if (password == ''){
        alert("Password is required")
    }else{
        signin(password);
    }
})

function signin(Password) {
    $.ajax({
        url: 'http://localhost:8000/login',
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
			password: Password
		}),
        success: function(resp) {
            if(resp.password != Password) {
                alert("Incorrect password");
            } else {
                alert(resp.Message);
                location.replace("dashboard.html")
                //go to dashboard
            }
        },
        error: function (e) {
            alert("danger");
           },
           beforeSend: function (xhrObj){
             xhrObj.setRequestHeader("Authorization",
                   "Basic " + btoa("Zaide:Zaide001"));
          }
    }); 
}
/*
login.addEventListener('click', function(){
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
    
    if (username == ''){
        alert("Username is required")
    } else if(password == ''){
        alert("Password is required")
    } else{
        signin(username, password);
    }
})

function signin(Username, Password) {
    $.ajax({
        url: 'http://localhost:8000/login',
        type:"POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
			username: Username,
			password: Password
		}),
        success: function(resp) {
            if (resp.username != Username) {
                alert("Incorrect username");
            } else if(resp.password != Password) {
                alert("Incorrect password");
            } else {
                alert(resp.Message);
                location.replace("dashboard.html")
                //go to dashboard
            }
        },
        error: function (e) {
            alert("danger");
           },
           beforeSend: function (xhrObj){
             xhrObj.setRequestHeader("Authorization",
                   "Basic " + btoa("Zaide:Zaide001"));
          }
    }); 
}
*/