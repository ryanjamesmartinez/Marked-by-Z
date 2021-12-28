function rowtask(customer_id, customer_name, customer_address, customer_contact_number)
{
   return '<table id="customers">' +
   '<tr><th>' + customer_id + '<th>' +
   '<th>' + customer_name + '<th>' +customer_address +
   '<th>' + customer_contact_number + '<th><tr></table>'; 
   /*'<div class="card">' +
   		  '<table id="customers">' +
   		  '<tr>' +
          '<td>' + customer_id + '<td>' +
		  '<td>' + customer_name + '<td>' +
		  '<td>' + customer_address + '<td>' +
		  '<td>' + customer_contact_number + '<td> <tr> </div>'; 
	*/
}

function loadtasks()
{

$.ajax({
    		url: 'http://192.168.1.3:8000/customer',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("#display").html("");
				if (resp.status  == 'OK') {
				   for (i = 0; i < resp.size; i++)
                                  {
                                       customer_address = resp.tasks[i].Customer_address;
                                       customer_contact_number = resp.tasks[i].Customer_contact_number;
                                       customer_id = resp.tasks[i].Customer_id;
                                       customer_name = resp.tasks[i].Customer_name;
                                       $("#display").append(rowtask(customer_id, customer_name, customer_address, customer_contact_number));
                                       
	                          }
				} else
				{
					$("#display").html("");
					alert(resp.status);
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

function newTask(id, title, description, done) {
	$.ajax({
		url: 'http://192.168.1.3:8000/customer',
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			id: id,
			title: title,
			description: description,
			done: done
		}),
		dataType: "json",
		success: function (resp) {
			alert(resp.status);
		},
		error: function (e) {
			alert("Error Occured.");
		},
		beforeSend: function (xhrObj) {
			xhrObj.setRequestHeader("Authorization",
				"Basic " + btoa("ako:akolagini"));
		}
	});
}