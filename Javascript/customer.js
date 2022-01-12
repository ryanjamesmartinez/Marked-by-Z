function show() {
	document.getElementById('sidebar').classList.toggle('active');
  }

function rowtask(customer_id, customer_name, customer_address, customer_contact_number)
{
   return '<tr>'+'<td>' + customer_id + '<td>' +
   '<td>' + customer_name + '<td>' +customer_address +
   '<td>' + customer_contact_number + '<td>'+'<tr>'; 
   /*'<div class="card">' +
   		  '<table id="customers">' +
   		  '<tr>' +
          '<td>' + customer_id + '<td>' +
		  '<td>' + customer_name + '<td>' +
		  '<td>' + customer_address + '<td>' +
		  '<td>' + customer_contact_number + '<td> <tr> </div>'; 
	*/
}

function displayCustomer()
{

$.ajax({
    		url: 'http://localhost:8000/customer',
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
									   /*
                                       $("#display").append(rowtask(customer_id, customer_name, customer_address, customer_contact_number));
                                       */
							$("#display").append("<tr>"+
							"<td width='150px'>"+customer_id+"</td>"+
							"<td width='330px'>"+customer_name+"</td>"+
							"<td width='330px'>"+customer_address+"</td>"+
							"<td width='200px'>"+customer_contact_number+"</td>"+"</tr>");
										
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

function newCustomer(id, name, address, contact_number) {
	$.ajax({
		url: 'http://localhost:8000/customer',
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			Customer_id: id,
			Customer_name: name,
			Customer_address: address,
			Customer_contact_number: contact_number
		}),
		success: function (data) {
			alert(data.status);
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

function editCustomer(id, name, address, contact_number) {
	console.log("hello,", name);
	$.ajax({
		url: 'http://localhost:8000/customer',
		type: "PUT",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			Customer_id: id,
			Customer_name: name,
			Customer_address: address,
			Customer_contact_number: contact_number
		}),
		success: function (data) {
			alert(data.status);
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

function delCustomer(id) {
	$.ajax({
		url: 'http://localhost:8000/customer/' + id,
		type: "DELETE",
		dataType: "json",
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

function searchCustomer(id) {
$.ajax({
    		url: 'http://localhost:8000/customer/'+ id,
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("#display").remove();
				$("#display-search").append("<tr>"+
				"<td width='150px'>"+resp.Customer_id+"</td>"+
				"<td width='330px'>"+resp.Customer_name+"</td>"+
				"<td width='330px'>"+resp.Customer_address+"</td>"+
				"<td width='180px'>"+resp.Customer_contact_number+"</td>"+
				"</tr>");
    		},
    		error: function (e) {
        		alert("Please fill in the search box.");
   			},
			   beforeSend: function (xhrObj){
				 xhrObj.setRequestHeader("Authorization",
					   "Basic " + btoa("Zaide:Zaide001"));
			  }
		}); 
}

var Add = document.getElementById("Add");
var Clear = document.getElementById("Clear");
var Edit = document.getElementById("Edit");
var Delete = document.getElementById("Delete");
var Search = document.getElementById("Search");

Add.addEventListener('click', function(){
	var id = document.getElementById("c_CID").value;
	var name = document.getElementById("c_name").value;
	var address = document.getElementById("c_add").value;
	var contact_number = document.getElementById("c_cn").value;
	if (id == '' || name == '' || address == '' || contact_number ==''){
		alert("Please fill in the blank");
	} else {
		newCustomer(id, name, address, contact_number);
	}
})

Clear.addEventListener('click', function(){
	document.getElementById("c_CID").value = '';
	document.getElementById("c_name").value = '';
	document.getElementById("c_add").value = '';
	document.getElementById("c_cn").value = '';
})

Edit.addEventListener('click', function(){
	var id = document.getElementById("c_CID").value;
	var name = document.getElementById("c_name").value;
	var address = document.getElementById("c_add").value;
	var contact_number = document.getElementById("c_cn").value;
	if (id == '' || name == '' || address == '' || contact_number ==''){
		alert("Please fill in the blank");
	} else {
		editCustomer(id, name, address, contact_number);
	}
})

Delete.addEventListener('click', function(){
	var id = document.getElementById("c_CID").value;
	if (id == ''){
		alert("Please select Customer ID to be deleted");
	} else {
		delCustomer(id);
	}
})

Search.addEventListener('click', function(){
	var id = document.getElementById("id").value;
	searchCustomer(id);
})