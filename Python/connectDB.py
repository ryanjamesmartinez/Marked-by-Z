import sys,os
import psycopg2
from sqlalchemy import create_engine

class DBconn:
    
    def __init__(self):
        engine = create_engine('postgresql://postgres:ryanjames@localhost:5432/ReservationSystemDB', echo=False)
        self.conn = engine.connect()
        self.trans = self.conn.begin()
    
    def getcursor(self):
        cursor = self.conn.connection.cursor()
        return cursor
    
    def dbcommit(self):
        self.trans.commit()

def spcall_display(qry, commit=False):
    try:
        dbo = DBconn()
        cursor = dbo.getcursor()
        cursor.callproc(qry)#qry = function 
        res = cursor.fetchall()
        if commit:
            dbo.dbcommit()
    except:
        res = [("Error: " + str(sys.exc_info()[0]) + " " + str(sys.exc_info()[1]),)]
    return res

def spcall(qry, param, commit=False):
    try:
        dbo = DBconn()
        cursor = dbo.getcursor()
        cursor.callproc(qry, param)#qry = function 
        res = cursor.fetchall()
        if commit:
            dbo.dbcommit()
    except:
        res = [("Error: " + str(sys.exc_info()[0]) + " " + str(sys.exc_info()[1]),)]
    return res

#print(spcall("login",("Zaide001",))[0][0])
#print(spcall_display("display_customer"))
#print(spcall("delete_customer",("2022-0010",))[0][0])