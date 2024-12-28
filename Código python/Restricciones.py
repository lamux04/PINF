#FUNCIONES PARA COMPROBAR CADA TIPO DE RESTRICCIÓN
from ClasesProyecto import *

debug = False

#Precondición: hi1 <= hf1 y hi2 <= hf2 
#Postcondición: devuelve True si ambas franjas se solapan y False en caso contrario
def coinciden(hi1, hf1, hi2, hf2) -> bool:
    coincide = True

    if (hf1 <= hi2 or hf2 <= hi1):
        coincide = False

    return coincide

#Precondición: horario es el diccionario de horarios DE LA CARRERA que se quiere comprobar y c_actual es el curso
#actual pasado como cadena
#Postcondición: devuelve True si la clase de baja aprobabilidad no coincide en esa franja horaria con 
#otra clase de alta aprobabilidad del curso siguiente y False en caso contrario
def NoAprobableSobreSi(horario, c_actual, h_ini, h_fin, dia) -> bool:
    puede = True
    cursos = list(horario.keys())
    i = 0

    if debug:
        print(f"Entra en la función NoAprobableSobreSi con {h_ini} y {h_fin} en el dia {dia}")

    #while (i < len(cursos) and ((int(cursos[i][0]) - int(c_actual[0])) != 1)): #Buscamos el curso siguiente al que estamos actualmente fijándonos en el
    #    i = i + 1                                                              #primer caracter del nombre del mismo
    
    siguientes = []
    for cur in cursos:
        if (int(cur[0]) - int(c_actual[0]) == 1):
            siguientes.append(cur)

    if i < len(cursos):
        #c_siguiente = cursos[i]
        for c_siguiente in siguientes:

            calendario = horario[c_siguiente][dia]
            if len(calendario) > 0:
                if type(calendario[0]) is list:                                      #Si hay más de un horario por día, hay que comprobar uno a uno
                    i = 0
                    while (i < len(calendario) and puede):
                        j = 0
                        while(j < len(calendario[i]) and puede):
                            ch_ini = calendario[i][j].h_ini
                            ch_fin = calendario[i][j].h_fin
                            aprobable = calendario[i][j].clase.asignatura.aprobable
                            importante = calendario[i][j].clase.importante          #Tenemos en cuenta si la clase es importante o no

                            if importante and aprobable and coinciden(h_ini, h_fin, ch_ini, ch_fin):
                                
                                if debug:
                                    calendario[i][j].clase.mostrar()

                                puede = False

                            j = j + 1

                        i = i + 1

                else:
                    i = 0
                    while(i < len(calendario) and puede):
                        ch_ini = calendario[i].h_ini
                        ch_fin = calendario[i].h_fin
                        aprobable = calendario[i].clase.asignatura.aprobable
                        importante = calendario[i].clase.importante

                        if importante and aprobable and coinciden(h_ini, h_fin, ch_ini, ch_fin):
                            
                            if debug:
                                calendario[i].clase.mostrar()

                            puede = False

                        i = i + 1

    return puede

#Precondición: horario es es el diccionario de horarios DE LA CARRERA que se quiere comprobar y c_actual es el curso
#actual pasado como cadena
#Postcondición: devuelve True si la clase de baja importancia no coincide en esa franja horaria con 
#otra clase de alta importancia del curso anterior y False en caso contrario
def SiAprobableSobreNo(horario, c_actual, h_ini, h_fin, dia) -> bool:
    puede = True
    cursos = list(horario.keys())
    i = 0

    if debug:
        print(f"Entra en la función SiAprobableSobreNo con {h_ini} y {h_fin} en el dia {dia}")

    #while (i < len(cursos) and ((int(cursos[i][0]) - int(c_actual[0])) != -1)): #Buscamos el curso anterior al que estamos actualmente fijándonos en el
    #    i = i + 1                                                               #primer caracter del nombre del mismo
    
    anteriores = []
    for cur in cursos:
        if (int(cur[0]) - int(c_actual[0]) == -1):
            anteriores.append(cur)

    if i < len(cursos):
        #c_anterior = cursos[i]
        for c_anterior in anteriores:

            calendario = horario[c_anterior][dia]
            if len(calendario) > 0:
                if type(calendario[0]) is list:                                         #Si hay más de un horario por día, hay que comprobar uno a uno
                    i = 0
                    while (i < len(calendario) and puede):
                        j = 0
                        while(j < len(calendario[i]) and puede):
                            ch_ini = calendario[i][j].h_ini
                            ch_fin = calendario[i][j].h_fin
                            aprobable = calendario[i][j].clase.asignatura.aprobable
                            importante = calendario[i][j].clase.importante              #Tenemos en cuenta si la clase es importante o no

                            if importante and not aprobable and coinciden(h_ini, h_fin, ch_ini, ch_fin):         #Comprobamos si coinciden
                                
                                if debug:
                                    calendario[i][j].mostrar()
                                
                                puede = False

                            j = j + 1

                        i = i + 1

                else:
                    i = 0
                    while(i < len(calendario) and puede):
                        ch_ini = calendario[i].h_ini
                        ch_fin = calendario[i].h_fin
                        aprobable = calendario[i].clase.asignatura.aprobable
                        importante = calendario[i].clase.importante

                        if importante and not aprobable and coinciden(h_ini, h_fin, ch_ini, ch_fin):

                            if debug:
                                calendario[i].mostrar()

                            puede = False

                        i = i + 1

    return puede

#Precondiciones: horario debe ser el horario completo de todas las carreras y profesor ha de ser el nombre del
#profesor como cadena
#Postcondiciones: devuelve True si el profesor está ocupado en dicha franja horaria o False en caso contrario.
def ProfesorOcupado(horario, profesor, h_ini, h_fin, dia) -> bool:
    ocupado = False

    if debug:
        print(f"Entra en la funcion ProfesorOcupado con {h_ini} y {h_fin}")

    carreras = list(horario.keys())
    i = 0
    while(i < len(carreras) and not ocupado):                                                           #Recorremos carrera a carrera
        cursos = list(horario[carreras[i]].keys())
        j = 0
        while(j < len(cursos) and not ocupado):                                                         #Recorremos curso a curso
            calendario = horario[carreras[i]][cursos[j]][dia]
            if len(calendario) > 0:
                if type(calendario[0]) is list:                                                             #Si hay más de un horario comprobamos uno a uno
                    k = 0
                    while(k < len(calendario) and not ocupado):
                        q = 0
                        while(q < len(calendario[k]) and not ocupado):
                            ch_ini = calendario[k][q].h_ini
                            ch_fin = calendario[k][q].h_fin
                            p_profesor = calendario[k][q].clase.profesor.nombre
                            if (p_profesor == profesor) and coinciden(h_ini, h_fin, ch_ini, ch_fin):        #Comprobamos si coinciden
                                
                                if debug:
                                    calendario[k][q].mostrar()
                                
                                ocupado = True
                            q = q + 1

                        k = k + 1
                else:
                    k = 0
                    while(k < len(calendario) and not ocupado):
                        ch_ini = calendario[k].h_ini
                        ch_fin = calendario[k].h_fin
                        p_profesor = calendario[k].clase.profesor.nombre
                        if (p_profesor == profesor) and coinciden(h_ini, h_fin, ch_ini, ch_fin):

                            if debug:
                                calendario[k].mostrar()

                            ocupado = True
                        k = k + 1

            j = j + 1

        i = i + 1

    return ocupado

#Precondiciones: horario debe ser el horario completo de todas las carreras y aula ha de ser el nombre del
#aula como cadena
#Postcondiciones: devuelve True si el aula está ocupada en dicha franja horaria o False en caso contrario.
def AulaOcupada(horario, aula, h_ini, h_fin, dia) -> bool:
    ocupada = False

    if debug:
        print(f"Entra en la funcion AulaOcupada con {h_ini} y {h_fin} , el día {dia} y el aula {aula}")

    carreras = list(horario.keys())
    i = 0
    while(i < len(carreras) and not ocupada):                                                           #Recorremos carrera a carrera
        cursos = list(horario[carreras[i]].keys())
        j = 0
        while(j < len(cursos) and not ocupada):                                                         #Recorremos curso a curso
            calendario = horario[carreras[i]][cursos[j]][dia]
            if len(calendario) > 0:
                if type(calendario[0]) is list:                                                             #Si hay más de un horario comprobamos uno a uno
                    k = 0
                    while(k < len(calendario) and not ocupada):
                        q = 0
                        while(q < len(calendario[k]) and not ocupada):

                            if debug:
                                print(len(calendario[k]))
                                print(calendario[k][q])


                            ch_ini = (calendario[k][q]).h_ini
                            ch_fin = (calendario[k][q]).h_fin
                            p_aula = calendario[k][q].aula
                            if (p_aula == aula) and coinciden(h_ini, h_fin, ch_ini, ch_fin):                #Comprobamos si coinciden
                                
                                if debug:
                                    calendario[k][q].mostrar()
                                
                                ocupada = True
                            q = q + 1

                        k = k + 1
                else:
                    k = 0
                    while(k < len(calendario) and not ocupada):
                        ch_ini = calendario[k].h_ini
                        ch_fin = calendario[k].h_fin
                        p_aula = calendario[k].aula
                        if (p_aula == aula) and coinciden(h_ini, h_fin, ch_ini, ch_fin):
                            
                            if debug:
                                calendario[k].mostrar()
                            
                            ocupada = True
                        k = k + 1

            j = j + 1

        i = i + 1

    return ocupada

#Esta función solo tendrá uso cuando haya mas de un calendario por día
#Precondición: horario es el calendario del dia para en el dia concreto para el curso de la carrera que deseamos comprobar
#Postcondición: devuelve True si la clase coincide en esa franja horaria con otra clase de 
#alta importancia del curso siguiente y False en caso contrario.
def HayClaseImportante(horario, h_ini, h_fin) -> bool:
    no_puede = False

    if debug:
        print(f"Entra en la funcion HayClaseImportante con {h_ini} y {h_fin}")

    i = 0
    if type(horario[0]) is list:
        while (i < len(horario) and not no_puede):
            j = 0
            while(j < len(horario[i]) and not no_puede):
                ch_ini = horario[i][j].h_ini
                ch_fin = horario[i][j].h_fin
                importante = horario[i][j].clase.importante

                if importante and coinciden(h_ini, h_fin, ch_ini, ch_fin):

                    if debug:
                        horario[i][j].mostrar()

                    no_puede = True

                j = j + 1

            i = i + 1
    else:
        while(i < len(horario) and not no_puede):
            ch_ini = horario[i].h_ini
            ch_fin = horario[i].h_fin
            importante = horario[i].clase.importante

            if importante and coinciden(h_ini, h_fin, ch_ini, ch_fin):
                
                if debug:
                    horario[i].mostrar()

                no_puede = True
            i = i + 1

    return no_puede


#Precondición: horario es el calendario del dia para en el dia concreto para el curso de la carrera que deseamos comprobar
#Postcondición: devuelve True si la clase no coincide en esa franja horaria con otra clase y False en caso contrario.
def HayYaClase(horario, h_ini, h_fin) -> bool:
    puede = True
    i = 0

    if debug:
        print(f"Entra en la funcion HayYaClase con {h_ini} y con {h_fin}")

    if len(horario) > 0:
        if type(horario[0]) is list:                                  #Si hay más de un horario por día, hay que comprobar uno a uno
            i = 0
            while (i < len(horario) and puede):
                j = 0
                while(j < len(horario[i]) and puede):
                    ch_ini = horario[i][j].h_ini
                    ch_fin = horario[i][j].h_fin

                    if coinciden(h_ini, h_fin, ch_ini, ch_fin):

                        if debug:
                            horario[i][j].mostrar()

                        puede = False

                    j = j + 1

                i = i + 1

        else:
            i = 0

            if debug:
                print("Entra en el bucle")

            while(i < len(horario) and puede):
                ch_ini = horario[i].h_ini
                ch_fin = horario[i].h_fin

                if coinciden(h_ini, h_fin, ch_ini, ch_fin):

                    if debug:
                        horario[i].mostrar()

                    puede = False

                i = i + 1
                
                if debug:
                    print(i)
            if debug:
                print("Sale del bucle")

    return puede


#Precondiciones: horario debe ser la lista de horarios concreta donde se quiere insertar la clase del curso de la carrera en concreto
#Postcondición: devuelve True si en la lista correspondiente al curso no hay clase que coincida (esta función solo se utilizará cuando haya más de una lista por día)
def HayYaClaseLista(horario, h_ini, h_fin) -> bool:
    
    if debug:
        print(f"Entra en la funcion HayYaClaseLista con {h_ini} y {h_fin}")

    i = 0
    no_puede = False
    while (i < len(horario)) and not no_puede:
        ch_ini = horario[i].h_ini
        ch_fin = horario[i].h_fin

        if coinciden(h_ini, h_fin, ch_ini, ch_fin):

            if debug:
                horario[i].mostrar()

            no_puede = True
        
        i = i + 1
    
    return no_puede

#Precondiciones: horario debe ser las listas de horarios del dia del curso de la carrera de la clase
#Postcondición: devuelve True si ya hay clase de dicha asignatura en esa franja horaria y False en caso contrario
def HayYaClaseAsignatura(horario, clase, h_ini, h_fin) -> bool:
    clase_actual: c_horario

    if debug:
        print(f"Entra en la funcion HayYaClaseAsignatura con {h_ini} y {h_fin}, y con la asignatura {clase.asignatura.nombre}")

    no_puede = False
    if type(horario[0]) is list:
        i = 0
        while i < len(horario) and not no_puede:
            j = 0
            while j < len(horario[i]) and not no_puede:
                clase_actual = horario[i][j]

                if (clase_actual.clase.asignatura == clase.asignatura) and coinciden(h_ini, h_fin, clase_actual.h_ini, clase_actual.h_fin):
                    
                    if debug:
                        clase_actual.mostrar()
                    
                    no_puede = True
                j = j + 1

            i = i + 1
    else:
        i = 0
        while i < len(horario) and not no_puede:
            clase_actual = horario[i]

            if (clase_actual.clase.asignatura == clase.asignatura) and coinciden(h_ini, h_fin, clase_actual.h_ini, clase_actual.h_fin):
                
                if debug:
                    clase_actual.mostrar()

                no_puede = True
            i = i + 1
    
    return no_puede
