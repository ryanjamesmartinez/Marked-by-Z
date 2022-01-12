----------TABLES----------------------------------------------------------------------------------------------------------------------
create table if not exists tbllogin (
	password text primary key
);
--update tbllogin set password = 'Zaide002';
--insert into tbllogin values ('Zaide001');
create table if not exists tblcustomerinformation (
	Customer_id text primary key,
	Customer_name varchar(50),
	Customer_address text,
	Customer_contact_number varchar(11)
);

create table if not exists tblreservation (
	Reservation_id text primary key,
	Customer_id text,
	dates date,
	Reservation_status varchar(15),
	Payment_status varchar(15),
	Customer_reservation_time text,
	foreign key(Customer_id) references tblcustomerinformation(Customer_id) on update cascade
);

create table if not exists userpass (
	username text primary key,
	password text
);
----------FUNCTIONS-------------------------------------------------------------------------------------------------------------------
create or replace function login(par_username text) RETURNS text
    LANGUAGE plpgsql
    AS $$
declare
  loc_password text;
begin 
   select into loc_password password from userpass where username = par_username;
     if loc_password isnull then
       loc_password = 'null';
     end if;
     return loc_password;
	
end;
$$;
------------------------------------------------------------------------------------------------------------------------------------
create or replace function signiin(par_password text) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tablerow record;
begin 
   select into loc_tablerow * from tbllogin;
   
   if loc_tablerow.password != par_password then
	  return json_build_object(
		'Message', 'Incorrect password'
		);
   else
   	  return json_build_object(
		'Message', 'Welcome',
		'status', 'OK',
		'password', loc_tablerow.password
		);
   end if;
end;
$$;
--select signin('Zaide001');
-------------------------------------------------------------------------------------------------------------------------------------
create or replace function changepass(par_new_password text) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tablerow record;
begin 
    select into loc_tablerow * from tbllogin;
	
	if par_new_password = loc_tablerow.password then
		return json_build_object(
			'Message', 'New password cannot be the same as old password'
		);
	else 
		update tbllogin set password = par_new_password;
		return json_build_object(
			'Message', 'Password successfuly changed.'
		);
	end if;
end;
$$;
--select changepass('Zaide001');
-------------------------------------------------------------------------------------------------------------------------------------
create or replace function add_customer(par_Customer_id text,
										par_Customer_name varchar(50),
										par_Customer_address text,
										par_Customer_contact_number varchar(11)) 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_id text;
  loc_res text;
begin 
   select into loc_id Customer_id from tblcustomerinformation where Customer_id = par_Customer_id;
   
   if loc_id isnull then
   		insert into tblcustomerinformation(Customer_id, Customer_name, Customer_address, Customer_contact_number)
		values (par_Customer_id, par_Customer_name, par_Customer_address, par_Customer_contact_number);
		loc_res = 'Customer information added successfully.';
	else
		loc_res = 'ID EXISTED';
	end if;
    return json_build_object(
	      'status', loc_res
	 );
end;
$$;
-------------------------------------------------------------------------------------------------------------------------------------
create or replace function delete_customer(par_Customer_id text) 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_id text;
  loc_res text;
begin 
   select into loc_id Customer_id from tblcustomerinformation where Customer_id = par_Customer_id;
   
   if loc_id isnull then
   		loc_res = 'ID DOES NOT EXISTS';
	else
		delete from tblcustomerinformation
		where Customer_id = par_Customer_id;  
		loc_res = 'Customer information deleted';
	end if;
    return json_build_object(
	      'status', loc_res
	 );
end;
$$;
--select delete_customer('2022-0020');
-------------------------------------------------------------------------------------------------------------------------------------
create or replace function edit_customer(par_Customer_id text,
										 par_Customer_name varchar(50),
										 par_Customer_address text,
										 par_Customer_contact_number varchar(11)) 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tablerow record;
begin 
   
   if par_Customer_id isnull or
   	  par_Customer_name isnull or
   	  par_Customer_address isnull or
	  par_Customer_contact_number isnull then
		return json_build_object(
			'Message', 'Null'
		);
	else
		update tblcustomerinformation set Customer_name = par_Customer_name,
										  Customer_address = par_Customer_address, 
										  Customer_contact_number = par_Customer_contact_number
		where Customer_id = par_Customer_id;
		return json_build_object(
			'status', 'Customer Information updated successfully.'
		);
	end if;
    
end;
$$;
--select edit_customer(1,	'Macalisang, Nifty Vaniah', 'Oroquieta', '09123456781');
-------------------------------------------------------------------------------------------------------------------------------------
create or replace function add_reservation(par_Reservation_id text,
										   par_Customer_id text,
										   par_dates date,
										   par_Reservation_status varchar(10),
										   par_Payment_status varchar(10),
										   par_Customer_reservation_time text) 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_id text;
  loc_res text;
begin 
   select into loc_id Reservation_id from tblreservation where Reservation_id = par_Reservation_id;
 
   if loc_id isnull then
		insert into tblreservation(Reservation_id, Customer_id, dates, Reservation_status, Payment_status, Customer_reservation_time)
		values (par_Reservation_id, par_Customer_id, par_dates, par_Reservation_status, par_Payment_status, par_Customer_reservation_time);
		loc_res = 'Reservation added successfully';
	else
		loc_res = 'ID EXISTED';
	end if;
    return json_build_object(
	      'status', loc_res
	 );
      
end;
$$;
-------------------------------------------------------------------------------------------------------------------------------------
create or replace function delete_reservation(par_Reservation_id text) 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_id text;
  loc_res text;
begin 
   select into loc_id Reservation_id from tblreservation where Reservation_id = par_Reservation_id;
   
   if loc_id isnull then
   		loc_res = 'ID DOES NOT EXISTS';
	else
		delete from tblcustomerinformation where Reservation_id = par_Reservation_id;
		loc_res = 'Reservation deleted';
	end if;
    return json_build_object(
	      'status', loc_res
	 );
end;
$$;
-------------------------------------------------------------------------------------------------------------------------------------
create or replace function edit_reservation(par_Reservation_id text,
											par_Customer_id text,
										 	par_dates date,
										 	par_Reservation_status varchar(10),
										 	par_Payment_status varchar(10),
										 	par_Customer_reservation_time text) 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tablerow record;
begin 
   
   if par_Reservation_id isnull or
   	  par_Customer_id isnull or
   	  par_dates isnull or
   	  par_Reservation_status isnull or
	  par_Payment_status isnull or 
	  par_Customer_reservation_time isnull then
		return json_build_object(
			'Message', 'Null'
		);
	else
		update tblreservation set dates = par_dates,
								  Reservation_status = par_Reservation_status, 
								  Payment_status = par_Payment_status,
								  Customer_reservation_time = par_Customer_reservation_time
		where Reservation_id = par_Reservation_id;
		return json_build_object(
			'status', 'Reservation updated successfully'
		);
	end if;
    
end;
$$;
-------------------------------------------------------------------------------------------------------------------------------------
create or replace function search_date(par_date date) 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tablerow record;
begin 
   select into loc_tablerow * from tblreservation where dates = par_date;

   return json_build_object(
	    'Reservation_id', loc_tablerow.Reservation_id,
		'Customer_id', loc_tablerow.Customer_id,
	    'Dates', loc_tablerow.dates,
	    'Reservation_status', loc_tablerow.Reservation_status,
	    'Payment_status', loc_tablerow.Payment_status,
	    'Customer_reservation_time', loc_tablerow.Customer_reservation_time
	);
end; 
$$;
--select search_date('2022-01-16');
-------------------------------------------------------------------------------------------------------------------------------------
create or replace function search_customer(par_Customer_id text) 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tablerow record;
begin 
   select into loc_tablerow * from tblcustomerinformation where Customer_id = par_Customer_id;

   return json_build_object(
		'Customer_id', loc_tablerow.Customer_id,
	    'Customer_name', loc_tablerow.Customer_name,
	    'Customer_address', loc_tablerow.Customer_address,
	    'Customer_contact_number', loc_tablerow.Customer_contact_number
	);
end; 
$$;
--select search_customer(1);
-------------------------------------------------------------------------------------------------------------------------------------
create or replace function search_reservation(par_Reservation_id text) 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tablerow record;
begin 
   select into loc_tablerow * from tblreservation where Reservation_id = par_Reservation_id;

   return json_build_object(
	    'Reservation_id', loc_tablerow.Reservation_id,
		'Customer_id', loc_tablerow.Customer_id,
	    'Dates', loc_tablerow.dates,
	    'Reservation_status', loc_tablerow.Reservation_status,
	    'Payment_status', loc_tablerow.Payment_status,
	    'Customer_reservation_time', loc_tablerow.Customer_reservation_time
	);
end; 
$$;
-------------------------------------------------------------------------------------------------------------------------------------
create or replace function display_customer() 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tasks_record record;
  loc_tasks_json json[];
  loc_size int default 0;
begin 
	for loc_tasks_record in select Customer_id, Customer_name, Customer_address, Customer_contact_number from tblcustomerinformation loop
		loc_tasks_json = loc_tasks_json || 
						 json_build_object(
							'Customer_id', loc_tasks_record.Customer_id,
							'Customer_name', loc_tasks_record.Customer_name,
							'Customer_address', loc_tasks_record.Customer_address,
							'Customer_contact_number', loc_tasks_record.Customer_contact_number
						 );
		loc_size = loc_size + 1;
	end loop; 
	
	return json_build_object(
		'status', 'OK',
		'size', loc_size,
		'tasks', loc_tasks_json
	);
end; 
$$;
select display_customer();
-------------------------------------------------------------------------------------------------------------------------------------
create or replace function display_reservation() 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tasks_record record;
  loc_tasks_json json[];
  loc_size int default 0;
begin 
	for loc_tasks_record in select Reservation_id, 
								   Customer_id, 
								   dates,
								   Reservation_status,
								   Payment_status,
								   Customer_reservation_time from tblreservation loop
		loc_tasks_json = loc_tasks_json || 
						 json_build_object(
							'Reservation_id', loc_tasks_record.Reservation_id,
							'Customer_id', loc_tasks_record.Customer_id,
							'dates', loc_tasks_record.dates,
							'Reservation_status', loc_tasks_record.Reservation_status,
							'Payment_status', loc_tasks_record.Payment_status,
							'Customer_reservation_time', loc_tasks_record.Customer_reservation_time
						 );
		loc_size = loc_size + 1;
		
	end loop; 
	
	return json_build_object(
		'status', 'OK',
		'size', loc_size,
		'tasks', loc_tasks_json
	);
end; 
$$;
--select display_reservation();