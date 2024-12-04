import HorarioV2 as v2
from ClasesProyecto import *
from bottle import *
import json


@get("/sched4allAPI")
def insertar():
    try:
        datos = json.load((request.body))
        print(datos)                        #DEBUG
    except:
        response.headers["Content-Type"] = "application/json"
        response.status = 404

        print("Error con el JSON")

        return json.dumps({"Error": "Ha habido una excepción"})
    
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

    v2.colocarClases(clases, aulas_horario, Horarios)

    

    Respuesta = {}
    #n_carreras = 0
    carreras = list(Horarios.keys())
    Respuesta["carrera"] = []
    for i in range(len(carreras)):          #Carrera por carrera
        carre = {
            "nombre": carreras[i]
            }
        Respuesta["carrera"].append(carre)
        cursos = list(Horarios[carreras[i]].keys())
        for j in range(len(cursos)):        #Curso por curso
            cur = {
                "nombre": cursos[j]
                }
            Respuesta["carrera"][i]["cursos"].append(cur)
            Respuesta["carrera"][i]["cursos"][j]["clases"] = [[],[],[],[],[]]       #Campo del JSON inicialmente vacío
            for k in range(5):                                                      #Día por día
                if type(Horarios[carreras[i]][cursos[j]][k][0]) is list:
                    for l1 in range(len(Horarios[carreras[i]][cursos[j]][k])):      #l1 va desde 0 hasta número_de_listas_del_dia - 1
                        Respuesta["carrera"][i]["cursos"][j]["clases"][k][l1] = []
                        for l2 in Horarios[carreras[i]][cursos[j]][k][l1]:
                            classe = {
                                "nombre": l2.clase.nombre,
                                "h_ini": l2.h_ini,
                                "h_fin": l2.h_fin,
                                "aula": l2.aula,
                                "tipo": l2.clase.tipo,
                                "duracion": l2.clase.duracion
                            }
                            Respuesta["carrera"][i]["cursos"][j]["clases"][k][l1].append(classe)


                else:
                    for l2 in Horarios[carreras[i]][cursos[j]][k]:
                        classe = {
                                "nombre": l2.clase.nombre,
                                "h_ini": l2.h_ini,
                                "h_fin": l2.h_fin,
                                "aula": l2.aula,
                                "tipo": l2.clase.tipo,
                                "duracion": l2.clase.duracion
                            }
                        Respuesta["carrera"][i]["cursos"][j]["clases"][k][l1].append(classe)
    
    response.status = 400
    response.headers["Content-Type"] = "application/json"
    return json.dumps(Respuesta)

    


run(host = "localhost", port = 8084)