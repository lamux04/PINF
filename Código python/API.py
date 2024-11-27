from Horario import *
from ClasesProyecto import *
from bottle import *
import json


@get("/sched4allAPI")
def insertar():
    try:
        datos = json.load((request.body))
        print(datos)
    except:
        raise ValueError
    
    aulas_horario = {}

    

    


run(host = "localhost", port = 8084)