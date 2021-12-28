from flask import Flask, jsonify, request
from connectDB import spcall_display, spcall
from flask_httpauth import HTTPBasicAuth
import flask

app = Flask(__name__)
auth = HTTPBasicAuth()

@auth.get_password
def getpassword(username):
    return spcall("login", (username,))[0][0]
    # curl -u Zaide:Zaide001 -i -H "Content-Type: application/json" -X GET http://192.168.1.3:8000/customer

@app.route('/')
def index(): 
    return "Hello, World!"

@app.route('/customer', methods=["GET"])
@auth.login_required
def getCustomer():
    customer = spcall_display("display_customer", ())[0][0]
    return jsonify(customer)
    #curl -i -H "Content-Type: application/json" -X GET http://192.168.1.3:8000/customer

@app.route('/customer/<int:id>', methods=["GET"]) #<int:id> is the parameter
def getCustomerId(id):
    customer = spcall("search_customer", (id,))[0][0]
    return jsonify(customer)
    #curl -i -H "Content-Type: application/json" -X GET http://192.168.1.3:8000/customer/1

@app.route('/customer', methods=["POST"])
def postCustomer():
    params = request.get_json()
    #id = params["Customer_id"]
    name = params["Customer_name"]
    address = params["Customer_address"]
    contact_number = params["Customer_contact_no"]

    result = spcall("add_customer", (name, address, contact_number), True)[0][0]

    return jsonify(result)
    # curl -i -H "Content-Type: application/json" 
    # -d '{"Customer_name":"Bernardo, Aiko","Customer_address":"Davao City","Customer_contact_no":"09876543715"}' 
    # -X POST http://192.168.1.3:8000/customer

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


# cd "D:\Ryan\College\Third Year\First Semester\CSC181\Project\App\Python" - git bash
# cd D:\Ryan\College\Third Year\First Semester\CSC181\Project\Python - cmd

