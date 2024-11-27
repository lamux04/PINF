from Horario import *
from bottle import *
import json


@post("/inserta")
def insertar():
    try:
        data = json.load((request.body))
        print(data)
    except:
        raise ValueError
    
    

    


run(host = "localhost", port = 8084)