import HorarioV2 as v2
import HorarioV3 as v3
from ClasesProyecto import *
from bottle import *
import json

app = Bottle()

@app.post("/sched4allAPI/")
def insertar():
    try:
        cuerpo = request.body.read()
        if not cuerpo:
            response.status = 400
            return json.dumps({"Error": "Json vacio"})

        datos = json.loads(cuerpo)
        # print(datos)                        #DEBUG
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

        #print("---------------------- DICCIONARIO AULAS ------------------------")
        
        for a in datos["aulas"][tipo]:
            aulas_horario[tipo].append(a)

    #Creamos los profesores
    profesores = {}                                 #Diccionario donde la clave es el nombre del profesor
    for profe in datos["profesores"]:               #y el valor es el objeto

        #print("---------------------- DICCIONARIO PROFESORES ------------------------")

        profesores[profe] = profesor(profe)

    Horarios = {}
    clases = []

    #Pillamos las franjas
    H_inicio = int(datos["h_ini"])
    H_final = int(datos["h_fin"])
    Inicio_desc = int(datos["inicio_desc"])
    Fin_desc = int(datos["fin_desc"])

    #print("---------------------- DICCIONARIO CARRERA ------------------------")

    for Carre in datos["carrera"]:                  #Carrera por carrera

        carrera_actual = carrera(Carre["nombre"])

        #print("---------------------- DICCIONARIO CURSOS ------------------------")

        dict_curso = {}

        for Cur in Carre["cursos"]:                     #Curso por curso

            #print("---------------------- CONSTRUYE HORARIO CARRERA ------------------------")

            #print("---------------------- CONSTRUYE HORARIO CARRERA 1 ------------------------")

            curso_actual = curso(Cur["nombre"], carrera_actual)
            curso_actual.mostrar()

            #print("---------------------- CONSTRUYE HORARIO CARRERA 2 ------------------------")

            
            dict_curso[curso_actual.nombre] = [[],[],[],[],[]]

            #dict_carrera[carrera_actual.nombre] = dict_curso    #Horario vacío para el curso
            #Horarios[carrera_actual.nombre] = dict_curso    #Horario vacío para el curso

            #print("---------------------- CONSTRUYE HORARIO CARRERA 3 ------------------------")

            asignaturas =  Cur["asignaturas"]    #Asignaturas del curso
            for asig in asignaturas:
                asignatura_actual = asignatura(asig["nombre"], asig["aprobable"], curso_actual)     #Creamos asignatura
                clases_asignatura = asig["clases"]

                #print("---------------------- CONSTRUYE CLASES ASIGNATURA ------------------------")

                for clas in clases_asignatura:
                    clase_actual = clase(clas["nombre"], clas["tipo"], clas["tipo_aula"], int(clas["duracion"]), clas["importante"], asignatura_actual, profesores[clas["profesor"]])   #Creamos clase
                    clases.append(clase_actual)
        
        Horarios[carrera_actual.nombre] = dict_curso

    #print(Horarios)


    # v2.colocarClases(clases, aulas_horario, Horarios)

    v3.colocarClases(clases, aulas_horario, Horarios, H_inicio, H_final, Inicio_desc, Fin_desc)

    
    l2: c_horario

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
        Respuesta["carrera"][i]["cursos"] = []
        for j in range(len(cursos)):        #Curso por curso
            cur = {
                "nombre": cursos[j]
                }
            Respuesta["carrera"][i]["cursos"].append(cur)
            Respuesta["carrera"][i]["cursos"][j]["clases"] = [[],[],[],[],[]]       #Campo del JSON inicialmente vacío
            for k in range(5):                                                      #Día por día
                if len(Horarios[carreras[i]][cursos[j]][k]) != 0:
                    if type(Horarios[carreras[i]][cursos[j]][k][0]) is list:
                        Respuesta["carrera"][i]["cursos"][j]["clases"][k] = [[]]
                        for l1 in range(len(Horarios[carreras[i]][cursos[j]][k])):      #l1 va desde 0 hasta número_de_listas_del_dia - 1
                            #Respuesta["carrera"][i]["cursos"][j]["clases"][k][l1] = []
                            if l1 > 0:
                                Respuesta["carrera"][i]["cursos"][j]["clases"][k].append([])
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
                            Respuesta["carrera"][i]["cursos"][j]["clases"][k].append(classe)
    
    response.status = 200
    response.headers["Content-Type"] = "application/json"
    return json.dumps(Respuesta)

if __name__ == "__main__":
    run(app, host='localhost', port=8084)