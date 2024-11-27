from Horario import *
from ClasesProyecto import *
from bottle import *
import json


@get("/sched4allAPI")
def insertar():
    try:
        datos = json.load((request.body))
        print(datos)                        #DEBUG
    except:
        raise ValueError
    
    #Creamos las aulas
    aulas_horario = {}
    tipos_aulas = list(datos["aulas"].keys())       #Obtenemos los tipos de aulas
    for tipo in tipos_aulas:
        aulas_horario[tipo] = []                    #Inicializamos a lista vacía
        for a in datos["aulas"][tipo]:
            aulas_horario[tipo].append(aula(a, tipo))

    #Creamos los profesores
    profesores = {}                                 #Diccionario donde la clave es el nombre del profesor
    for profe in datos["profesores"]:               #y el valor es el objeto
        profesores[profe] = profesor(profe)

    Horarios = {}
    clases = []

    for Carre in datos["carrera"]:                  #Carrera por carrera
        for Cur in Carre["cursos"]:                     #Curso por curso
            carrera_actual = carrera(Carre["nombre"])
            curso_actual = curso(Cur["nombre"], carrera_actual)
            Horarios[Carre["nombre"]][Cur["nombre"]] = [[],[],[],[],[]]     #Horario vacío para el curso
            asignaturas =  Horarios[Carre["nombre"]][Cur["asignaturas"]]    #Asignaturas del curso
            for asig in asignaturas:
                asignatura_actual = asignatura(asig["nombre"], asig["aprobable"], curso_actual)     #Creamos asignatura
                clases_asignatura = asig["clases"]
                for clas in clases_asignatura:
                    clase_actual = clase(clas["nombre"], clas["tipo"], clas["tipo_aula"], int(clas["duracion"]), clas["importante"], asignatura_actual, profesores[clas["profesor"]])   #Creamos clase
                    clases.append(clase_actual)

    colocarClases(clases, aulas_horario, Horarios)

    Respuesta = {}
    n_carreras = 0
    carreras = list(Horarios.keys())
    Respuesta["carrera"] = []
    for i in range(len(carreras)):          #Carrera por carrera
        carre = {
            "nombre": carreras[i]
            }
        Respuesta["carrera"].append(carre)
        cursos = list(Horarios[carreras].keys())
        for j in len(cursos):
            cur = {
                "nombre": cursos[j]
                }
            Respuesta["carrera"][i]["cursos"].append(cur)
            Respuesta["carrera"][i]["cursos"][j]["clases"] = [[],[],[],[],[]]






    

    


run(host = "localhost", port = 8084)