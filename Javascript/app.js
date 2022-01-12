function show() {
	document.getElementById('sidebar').classList.toggle('active');
}


function displaytotalCustomer()
{
$.ajax({
    		url: 'http://localhost:8000/customer',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("#customer").append("<p style='margin: 0.4em; padding-left: 1.5em; font-size: 4em; font-family: Impact;'>"+resp.size+"</p>");
    		},
    		error: function (e) {
        		alert("danger");
   			},
			   beforeSend: function (xhrObj){
				 xhrObj.setRequestHeader("Authorization",
					   "Basic " + btoa("Zaide:Zaide001"));
			  }
		}); 
$.ajax({
    		url: 'http://localhost:8000/reservation',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				const dates_array = [];
				const rstatus_array = [];
				const rstatus_completed = [];
				for (i = 0; i < resp.size; i++)
					{
						dates = resp.tasks[i].dates;
						rstatus = resp.tasks[i].Reservation_status;
						if (rstatus == 'Completed'){
							rstatus_completed.push(rstatus);
						}
						dates_array.push(dates);
						rstatus_array.push(rstatus);
					}
				$("#reservation").append("<p style='margin: 0.4em; padding-left: 1.7em; font-size: 4em; font-family: Impact;'>"+resp.size+"</p>");
				
				$("#completed-reservation").append("<p style='margin: 0.4em; padding-left: 1.7em; font-size: 4em; font-family: Impact;'>"+rstatus_completed.length+"</p>");
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
