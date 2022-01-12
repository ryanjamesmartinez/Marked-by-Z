from flask import Flask, jsonify, request
from connectDB import spcall_display, spcall
from flask_httpauth import HTTPBasicAuth
import flask

app = Flask(__name__)
auth = HTTPBasicAuth()

@app.route('/login', methods=["POST"])
@auth.login_required
def signin():
    params = request.get_json()
    password = params["password"]
    login = spcall("signiin", (password,))[0][0]
    return jsonify(login)
    # curl -u Zaide:Zaide001 -i -H "Content-Type: application/json" -d '{"password":"Zaide001"}' -X POST http://localhost:8000/login 

@app.route('/login', methods=["PUT"])
@auth.login_required
def changepassword():
    params = request.get_json()
    password = params["password"]
    changepass = spcall("changepass", (password,), True)[0][0]
    return jsonify(changepass)
    # curl -u Zaide:Zaide001 -i -H "Content-Type: application/json" -d '{"password":"Zaide002"}' -X PUT http://localhost:8000/login

####### CUSTOMER ##############

@auth.get_password
def getpassword(username):
    return spcall("login", (username,))[0][0]
    # curl -u Zaide:Zaide001 -i -H "Content-Type: application/json" -X GET http://localhost:8000/customer

@app.route('/customer', methods=["GET"])
@auth.login_required
def getCustomer():
    customer = spcall_display("display_customer", ())[0][0]
    return jsonify(customer)

@app.route('/customer/<string:id>', methods=["GET"])
@auth.login_required
def searchCustomer(id):
    customer = spcall("search_customer", (id,))[0][0]
    return jsonify(customer)
    #curl -u Zaide:Zaide001 -H "Content-Type: application/json" -X GET http://localhost:8000/customer/2022-0004

@app.route('/customer', methods=["POST"])
@auth.login_required
def postCustomer():
    params = request.get_json()
    id = params["Customer_id"]
    name = params["Customer_name"]
    address = params["Customer_address"]
    contact_number = params["Customer_contact_number"]
    result = spcall("add_customer", (id, name, address, contact_number), True)[0][0]

    return jsonify(result)
    # curl -u Zaide:Zaide001 -i -H "Content-Type: application/json" -d '{"Customer_id":"2022-0001","Customer_name":"Bernardo, Aiko","Customer_address":"Davao City","Customer_contact_number":"09876543715"}' -X POST http://localhost:8000/customer

@app.route('/customer', methods=["PUT"])
@auth.login_required
def editCustomer():
    params = request.get_json()
    id = params["Customer_id"]
    name = params["Customer_name"]
    address = params["Customer_address"]
    contact_number = params["Customer_contact_number"]
    result = spcall("edit_customer", (id, name, address, contact_number), True)[0][0]

    return jsonify(result)
    #curl -u Zaide:Zaide001 -i -H "Content-Type: application/json" -d '{"Customer_id":"2022-0035","Customer_name":"Dela Cruz, Juan","Customer_address":"Davao City","Customer_contact_number":"09876543715"}' -X PUT http://localhost:8000/customer

@app.route('/customer/<string:id>', methods=["DELETE"])
@auth.login_required
def deleteCustomer(id):
    result = spcall("delete_customer", (id,), True)[0][0]
    return jsonify(result)
    #curl -u Zaide:Zaide001 -i -H "Content-Type: application/json" -X DELETE http://localhost:8000/customer/2022-0009

####### RESERVATION ##############
 
@app.route('/reservation', methods=["GET"])
@auth.login_required
def getReservation():
    reservation = spcall_display("display_reservation", ())[0][0]
    return jsonify(reservation)
    #curl -u Zaide:Zaide001 -i -H "Content-Type: application/json" -X GET http://localhost:8000/reservation

@app.route('/reservation/<string:id>', methods=["GET"]) #<int:id> is the parameter
@auth.login_required
def searchReservation(id):
    reservation = spcall("search_reservation", (id,))[0][0]
    return jsonify(reservation)

@app.route('/reservation/date/<string:id>', methods=["GET"])
@auth.login_required
def searchDate(id):
    date = spcall("search_date", (id,))[0][0]
    return jsonify(date)
    #curl -u Zaide:Zaide001 -H "Content-Type: application/json" -X GET http://localhost:8000/reservation/date/2022-01-16

@app.route('/reservation', methods=["POST"])
@auth.login_required
def postReservation():
    params = request.get_json()
    r_id = params["Reservation_id"]
    c_id = params["Customer_id"]
    date = params["dates"]
    r_status = params["Reservation_status"]
    p_status = params["Payment_status"]
    customer_reservation_time = params["Customer_reservation_time"]
    result = spcall("add_reservation", (r_id, c_id, date, r_status, p_status, customer_reservation_time), True)[0][0]

    return jsonify(result)

@app.route('/reservation', methods=["PUT"])
@auth.login_required
def editReservation():
    params = request.get_json()
    r_id = params["Reservation_id"]
    c_id = params["Customer_id"]
    date = params["dates"]
    r_status = params["Reservation_status"]
    p_status = params["Payment_status"]
    customer_reservation_time = params["Customer_reservation_time"]
    result = spcall("edit_reservation", (r_id, c_id, date, r_status, p_status, customer_reservation_time), True)[0][0]

    return jsonify(result)

@app.route('/reservation/<string:id>', methods=["DELETE"])
@auth.login_required
def deleteReservation(id):
    result = spcall("delete_reservation", (id,), True)[0][0]
    return jsonify(result)

@app.after_request
def add_cors(resp):
    resp.headers['Access-Control-Allow-Origin'] = flask.request.headers.get('Origin', '*')
    resp.headers['Access-Control-Allow-Credentials'] = True
    resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS, GET, PUT, DELETE'
    resp.headers['Access-Control-Allow-Headers'] = flask.request.headers.get('Access-Control-Request-Headers', 'Authorization')
    # set low for debugging

    if app.debug:
        resp.headers["Access-Control-Max-Age"] = '1'
    return resp

if __name__ == '__main__':
    app.debug = True
    port = 8000
    app.run(host='0.0.0.0', port = port)


# cd "D:\Ryan\College\Third Year\First Semester\CSC181\Project\App" - git bash
# cd D:\Ryan\College\Third Year\First Semester\CSC181\Project\Python - cmd

