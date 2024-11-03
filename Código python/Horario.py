#AQUÍ SE ENCUENTRAN LAS DIFERENTES FUNCIONES QUE SE ENCARGAN DE COLOCAR LAS CLASES

from Restricciones import *
import random


#Precondición: la estructura de Horarios debe ser un diccionario de la forma que se indica en los requisitos. Aulas ha de ser un diccionario donde la clase
#sea el tipo del aula y el valor sea la lista de nombres de aulas de dicho tipo
def colocarClases(Clases, Aulas, Horarios):
    denegadas = []
    porcolocar = []
    n_import = 0
                                            #La hora la representamos en minutos
    inicio = 510                            #Las clases empiezan a las 8:30
    fin = 1260                              #Las clases terminan a las 21:00
    inicio_comer = 840                      #La hora de comer es a las 14:00
    fin_comer = 900                         #La hora de comer termina a las 15:00

    for clase in Clases:                    #Colocamos las clases 
        if clase.importante:
            porcolocar.insert(0, clase)
            n_import += 1
        else:
            porcolocar.append(clase)

    colocado = False                        #Variable para indicar si una clase ha sido colocada
    tarde = []                              #Cola donde iremos colocando las clases que no se han podido colocar por la mañana.

    #Primer bucle para intentar colocar las clases por la mañana
    while(len(porcolocar) != 0):
        colocado = False
        if(n_import > 0):
            indice = random.randint(0, n_import - 1)
            n_import -= 1
        else:
            indice = random.randint(0, len(porcolocar) - 1)
        clase = porcolocar[indice]
        del porcolocar[indice]

        curso = clase.asignatura.curso.nombre
        carrera = clase.asignatura.curso.carrera.nombre

        dia = 0

        while (dia < 5) and not colocado:
            h_ini = inicio
            h_fin = inicio + clase.duracion

            while (h_fin <= inicio_comer) and not colocado:
                if not HayYaClase(Horarios[carrera][curso][dia], h_ini, h_fin):                         #Se comprueba que no haya clase ya en esa franja
                    if not ProfesorOcupado(Horarios, clase.profesor.nombre, h_ini, h_fin, dia):         #Se comprueba que el profesor no esté ya ocupado en dicha franja
                        if not clase.asignatura.aprobable:
                            if NoAprobableSobreSi(Horarios[carrera], curso, h_ini, h_fin, dia):         #Si la asignatura es de baja aprobabilidad que no coincida
                                aulas = Aulas[clase.tipo_aula]                                          #con una del curso siguiente con alta aprobabilidad
                                random.shuffle(aulas)
                                indice_aula = 0                                                             #Pillamos un aula y vemos si la podemos utilizar, si no,
                                while (indice_aula < len(aulas)) and not colocado:                          #pillamos otra hasta que no haya aulas
                                    if not AulaOcupada(Horarios, aulas[indice_aula], h_ini, h_fin, dia):
                                        Horarios[carrera][curso][dia].append(c_horario(clase, h_ini, h_fin, aulas[indice_aula]))
                                        colocado = True
                        else:
                            if SiAprobableSobreNo(Horarios[carrera], curso, h_ini, h_fin, dia):         #Si la asignatura es de alta aprobabilidad que no coincida
                                aulas = Aulas[clase.tipo_aula]                                          #con una del curso anterior con baja aprobabilidad
                                random.shuffle(aulas)
                                indice_aula = 0
                                while (indice_aula < len(aulas)) and not colocado:
                                    if not AulaOcupada(Horarios, aulas[indice_aula], h_ini, h_fin, dia):
                                        Horarios[carrera][curso][dia].append(c_horario(clase, h_ini, h_fin, aulas[indice_aula]))
                                        colocado = True
                
                h_ini += 15     #Miramos en la siguiente franja horaria
                h_fin += 15
            
            dia += 1
        
        #Si no se ha podido colocar se va a la cola de tarde
        if not colocado:
            if clase.importante:
                tarde.insert(0, clase)
            else:
                tarde.append(clase)

    #Segundo bucle para colocar las que no han podido colocarse por la mañana
    while(len(tarde) != 0):
        colocado = False
        clase = tarde[0]
        del tarde[0]

        curso = clase.asignatura.curso.nombre
        carrera = clase.asignatura.curso.carrera.nombre

        dia = 0

        while (dia < 5) and not colocado:
            h_ini = inicio
            h_fin = inicio + clase.duracion

            while (h_fin <= fin) and not colocado:
                if not HayYaClase(Horarios[carrera][curso][dia], h_ini, h_fin):                         #Se comprueba que no haya clase ya en esa franja
                    if not ProfesorOcupado(Horarios, clase.profesor.nombre, h_ini, h_fin, dia):         #Se comprueba que el profesor no esté ya ocupado en dicha franja
                        if not clase.asignatura.aprobable:
                            if NoAprobableSobreSi(Horarios[carrera], curso, h_ini, h_fin, dia):         #Si la asignatura es de baja aprobabilidad que no coincida
                                aulas = Aulas[clase.tipo_aula]                                          #con una del curso siguiente con alta aprobabilidad
                                random.shuffle(aulas)
                                indice_aula = 0                                                             #Pillamos un aula y vemos si la podemos utilizar, si no,
                                while (indice_aula < len(aulas)) and not colocado:                          #pillamos otra hasta que no haya aulas
                                    if not AulaOcupada(Horarios, aulas[indice_aula], h_ini, h_fin, dia):
                                        Horarios[carrera][curso][dia].append(c_horario(clase, h_ini, h_fin, aulas[indice_aula]))
                                        colocado = True
                        else:
                            if SiAprobableSobreNo(Horarios[carrera], curso, h_ini, h_fin, dia):         #Si la asignatura es de alta aprobabilidad que no coincida
                                aulas = Aulas[clase.tipo_aula]                                          #con una del curso anterior con baja aprobabilidad
                                random.shuffle(aulas)
                                indice_aula = 0
                                while (indice_aula < len(aulas)) and not colocado:
                                    if not AulaOcupada(Horarios, aulas[indice_aula], h_ini, h_fin, dia):
                                        Horarios[carrera][curso][dia].append(c_horario(clase, h_ini, h_fin, aulas[indice_aula]))
                                        colocado = True
                
                #Miramos en la siguiente franja horaria
                if (h_fin + 15 > inicio_comer):
                    h_ini = fin_comer
                    h_fin = fin_comer + clase.duracion
                else:
                    h_ini += 15
                    h_fin += 15
            
            dia += 1
        
        #Si no se ha podido colocar se va a la cola de clase denegadas
        if not colocado:
            denegadas.append(clase)

    #Tercer bucle para colocar las clases de la cola de denegadas
    while (len(denegadas) != 0):
        colocado = False
        clase = denegadas[0]
        del denegadas[0]

        curso = clase.asignatura.curso.nombre
        carrera = clase.asignatura.curso.carrera.nombre

        dia = 0

        while (dia < 5) and not colocado:
            h_ini = inicio
            h_fin = inicio + clase.duracion

            while (h_fin <= fin) and not colocado:
                if not HayClaseImportante(Horarios[carrera][curso][dia], h_ini, h_fin):                 #Se comprueba que no haya clase importante en esa franja
                    if not ProfesorOcupado(Horarios, clase.profesor.nombre, h_ini, h_fin, dia):         #Se comprueba que el profesor no esté ya ocupado en dicha franja
                        if not clase.asignatura.aprobable:
                            if NoAprobableSobreSi(Horarios[carrera], curso, h_ini, h_fin, dia):         #Si la asignatura es de baja aprobabilidad que no coincida
                                aulas = Aulas[clase.tipo_aula]                                          #con una del curso siguiente con alta aprobabilidad
                                random.shuffle(aulas)
                                indice_aula = 0                                                             #Pillamos un aula y vemos si la podemos utilizar, si no,
                                while (indice_aula < len(aulas)) and not colocado:                          #pillamos otra hasta que no haya aulas
                                    if not AulaOcupada(Horarios, aulas[indice_aula], h_ini, h_fin, dia):
                                        if type(Horarios[carrera][curso][dia][0]) is list:
                                            j = 1
                                            while (j < len(Horarios[carrera][curso][dia])) and not colocado:    
                                                if not HayClaseImportante(Horarios[carrera][curso][dia][j], h_ini, h_fin):
                                                    Horarios[carrera][curso][dia][j].append(c_horario(clase, h_ini, h_fin, aulas[indice_aula]))
                                                    colocado = True
                                                j = j + 1
                                            if not colocado:
                                                Horarios[carrera][curso][dia].append([c_horario(clase, h_ini, h_fin, aulas[indice_aula])])
                                                colocado = True
                                        else:
                                            Horarios[carrera][curso][dia] = [[Horarios[carrera][dia]], [c_horario(clase, h_ini, h_fin, aulas[indice_aula])]]
                        else:
                            if SiAprobableSobreNo(Horarios[carrera], curso, h_ini, h_fin, dia):         #Si la asignatura es de alta aprobabilidad que no coincida
                                aulas = Aulas[clase.tipo_aula]                                          #con una del curso anterior con baja aprobabilidad
                                random.shuffle(aulas)
                                indice_aula = 0
                                while (indice_aula < len(aulas)) and not colocado:
                                    if not AulaOcupada(Horarios, aulas[indice_aula], h_ini, h_fin, dia):
                                        if type(Horarios[carrera][curso][dia][0]) is list:
                                            j = 1
                                            while (j < len(Horarios[carrera][curso][dia])) and not colocado:    
                                                if not HayClaseImportante(Horarios[carrera][curso][dia][j], h_ini, h_fin):
                                                    Horarios[carrera][curso][dia][j].append(c_horario(clase, h_ini, h_fin, aulas[indice_aula]))
                                                    colocado = True
                                                j = j + 1
                                            if not colocado:
                                                Horarios[carrera][curso][dia].append([c_horario(clase, h_ini, h_fin, aulas[indice_aula])])
                                                colocado = True
                                        else:
                                            Horarios[carrera][curso][dia] = [[Horarios[carrera][dia]], [c_horario(clase, h_ini, h_fin, aulas[indice_aula])]]
                
                #Miramos en la siguiente franja horaria
                if (h_fin + 15 > inicio_comer):
                    h_ini = fin_comer
                    h_fin = fin_comer + clase.duracion
                else:
                    h_ini += 15
                    h_fin += 15
            
            dia += 1







    

