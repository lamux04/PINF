#AQUÍ SE ENCUENTRA LAS FUNCIÓN QUE SE ENCARGA DE COLOCAR LAS CLASES

from Restricciones import *
import ClasesProyecto as CP
import random


#Precondición: la estructura de Horarios debe ser un diccionario de la forma que se indica en los requisitos. Aulas ha de ser un diccionario donde la clase
#sea el tipo del aula y el valor sea la lista de nombres de aulas de dicho tipo. Se debe pasar la hora de inicio, hora de fin, el inicio del descanso y el
#final del descanso. Los valores por defecto de estos 4 últimos son: las 0:00, las 24:00, las 24:00 y las 24:00 (es decir, no hay descanso)
def colocarClases(Clases, Aulas, Horarios, H_inicio = 0, H_final = 1440, Inicio_desc = 1440, Fin_desc = 1440):
    denegadas = []
    porcolocar = []
    n_import = 0
                                            #La hora la representamos en minutos
    inicio = H_inicio                            
    fin = H_final                             
    inicio_comer = Inicio_desc                      
    fin_comer = Fin_desc                         

    for clase in Clases:                    #Colocamos las clases 
        if clase.importante:
            porcolocar.insert(0, clase)
            n_import += 1
        else:
            porcolocar.append(clase)

    colocado = False                        #Variable para indicar si una clase ha sido colocada
    tarde = []                              #Cola donde iremos colocando las clases que no se han podido colocar por la mañana.

    #Primer bucle para intentar colocar las clases por la mañana
    print("toca mañana")
    while(len(porcolocar) != 0):
        colocado = False
        if(n_import > 0):
            indice = random.randint(0, n_import - 1)
            n_import -= 1
        else:
            indice = random.randint(0, len(porcolocar) - 1)
        clase: CP.clase
        clase = porcolocar[indice]
        del porcolocar[indice]

        curso = clase.asignatura.curso.nombre
        carrera = clase.asignatura.curso.carrera.nombre

        dia = 0

        while (dia < 5) and not colocado:
            h_ini = inicio
            h_fin = inicio + clase.duracion

            while h_fin <= inicio_comer and h_fin <= fin and not colocado:
                if HayYaClase(Horarios[carrera][curso][dia], h_ini, h_fin):                         #Se comprueba que no haya clase ya en esa franja
                    if not ProfesorOcupado(Horarios, clase.profesor.nombre, h_ini, h_fin, dia):         #Se comprueba que el profesor no esté ya ocupado en dicha franja
                        if not clase.asignatura.aprobable:
                            if not clase.importante or NoAprobableSobreSi(Horarios[carrera], curso, h_ini, h_fin, dia):         #Si la asignatura es de baja aprobabilidad que no coincida
                                aulas = Aulas[clase.tipo_aula]                                                                  #con una del curso siguiente con alta aprobabilidad
                                random.shuffle(aulas)
                                indice_aula = 0                                                             #Pillamos un aula y vemos si la podemos utilizar, si no,
                                while (indice_aula < len(aulas)) and not colocado:                          #pillamos otra hasta que no haya aulas
                                    if not AulaOcupada(Horarios, aulas[indice_aula], h_ini, h_fin, dia):
                                        Horarios[carrera][curso][dia].append(c_horario(clase, h_ini, h_fin, aulas[indice_aula]))
                                        colocado = True
                                    indice_aula += 1
                        else:
                            if not clase.importante or SiAprobableSobreNo(Horarios[carrera], curso, h_ini, h_fin, dia):         #Si la asignatura es de alta aprobabilidad que no coincida
                                aulas = Aulas[clase.tipo_aula]                                                                  #con una del curso anterior con baja aprobabilidad
                                random.shuffle(aulas)
                                indice_aula = 0
                                while (indice_aula < len(aulas)) and not colocado:
                                    if not AulaOcupada(Horarios, aulas[indice_aula], h_ini, h_fin, dia):
                                        Horarios[carrera][curso][dia].append(c_horario(clase, h_ini, h_fin, aulas[indice_aula]))
                                        colocado = True
                                    indice_aula += 1
                
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
    print("toca tarde")

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

            while h_fin <= fin and not colocado:
                if HayYaClase(Horarios[carrera][curso][dia], h_ini, h_fin):                         #Se comprueba que no haya clase ya en esa franja
                    if not ProfesorOcupado(Horarios, clase.profesor.nombre, h_ini, h_fin, dia):         #Se comprueba que el profesor no esté ya ocupado en dicha franja
                        if not clase.asignatura.aprobable:
                            if not clase.importante or NoAprobableSobreSi(Horarios[carrera], curso, h_ini, h_fin, dia):         #Si la asignatura es de baja aprobabilidad que no coincida
                                aulas = Aulas[clase.tipo_aula]                                          #con una del curso siguiente con alta aprobabilidad
                                random.shuffle(aulas)
                                indice_aula = 0                                                             #Pillamos un aula y vemos si la podemos utilizar, si no,
                                while (indice_aula < len(aulas)) and not colocado:                          #pillamos otra hasta que no haya aulas
                                    if not AulaOcupada(Horarios, aulas[indice_aula], h_ini, h_fin, dia):
                                        Horarios[carrera][curso][dia].append(c_horario(clase, h_ini, h_fin, aulas[indice_aula]))
                                        colocado = True
                                    indice_aula += 1
                        else:
                            if not clase.importante or SiAprobableSobreNo(Horarios[carrera], curso, h_ini, h_fin, dia):         #Si la asignatura es de alta aprobabilidad que no coincida
                                aulas = Aulas[clase.tipo_aula]                                          #con una del curso anterior con baja aprobabilidad
                                random.shuffle(aulas)
                                indice_aula = 0
                                while (indice_aula < len(aulas)) and not colocado:
                                    if not AulaOcupada(Horarios, aulas[indice_aula], h_ini, h_fin, dia):
                                        Horarios[carrera][curso][dia].append(c_horario(clase, h_ini, h_fin, aulas[indice_aula]))
                                        colocado = True
                                    indice_aula += 1
                
                #Miramos en la siguiente franja horaria
                if(h_ini >= fin_comer) or (h_fin + 15 <= inicio_comer):
                    h_ini += 15
                    h_fin += 15
                else:
                    h_ini = fin_comer
                    h_fin = fin_comer + clase.duracion
            
            dia += 1
        
        #Si no se ha podido colocar se va a la cola de clase denegadas
        if not colocado:
            denegadas.append(clase)
    #Tercer bucle para colocar las clases de la cola de denegadas
    print("toca denegadas")

    Errores = []
    #print("Entra al bucle de colas de colas denegadas")
    while (len(denegadas) != 0):
        print(f"Clases denegadas por colocar: {len(denegadas)}")
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
                            if not clase.importante or NoAprobableSobreSi(Horarios[carrera], curso, h_ini, h_fin, dia):         #Si la asignatura es de baja aprobabilidad que no coincida
                                if not HayYaClaseAsignatura(Horarios[carrera][curso][dia], clase, h_ini, h_fin):    
                                    aulas = Aulas[clase.tipo_aula]                                          #con una del curso siguiente con alta aprobabilidad
                                    random.shuffle(aulas)
                                    indice_aula = 0                                                             #Pillamos un aula y vemos si la podemos utilizar, si no,
                                    while (indice_aula < len(aulas)) and not colocado:                          #pillamos otra hasta que no haya aulas
                                        if not AulaOcupada(Horarios, aulas[indice_aula], h_ini, h_fin, dia):
                                            if type(Horarios[carrera][curso][dia][0]) is list:
                                                j = 0
                                                while (j < len(Horarios[carrera][curso][dia])) and not colocado:

                                                    #print(f"lista: {j}")

                                                    if not HayYaClaseLista(Horarios[carrera][curso][dia][j], h_ini, h_fin):
                                                        Horarios[carrera][curso][dia][j].append(c_horario(clase, h_ini, h_fin, aulas[indice_aula]))
                                                        colocado = True
                                                    j = j + 1
                                                if not colocado and j < 3:
                                                    Horarios[carrera][curso][dia].append([c_horario(clase, h_ini, h_fin, aulas[indice_aula])])
                                                    colocado = True
                                            else:
                                                Horarios[carrera][curso][dia] = [Horarios[carrera][curso][dia], [c_horario(clase, h_ini, h_fin, aulas[indice_aula])]]
                                                colocado = True
                                        indice_aula += 1
                        else:
                            if not clase.importante or SiAprobableSobreNo(Horarios[carrera], curso, h_ini, h_fin, dia):         #Si la asignatura es de alta aprobabilidad que no coincida
                                if not HayYaClaseAsignatura(Horarios[carrera][curso][dia], clase, h_ini, h_fin):
                                    aulas = Aulas[clase.tipo_aula]                                          #con una del curso anterior con baja aprobabilidad
                                    random.shuffle(aulas)
                                    indice_aula = 0
                                    while (indice_aula < len(aulas)) and not colocado:
                                        if not AulaOcupada(Horarios, aulas[indice_aula], h_ini, h_fin, dia):
                                            if type(Horarios[carrera][curso][dia][0]) is list:
                                                j = 0
                                                while (j < len(Horarios[carrera][curso][dia])) and not colocado:
                                                    if not HayYaClaseLista(Horarios[carrera][curso][dia][j], h_ini, h_fin):
                                                        Horarios[carrera][curso][dia][j].append(c_horario(clase, h_ini, h_fin, aulas[indice_aula]))
                                                        colocado = True
                                                    j = j + 1
                                                if not colocado and j < 3:
                                                    Horarios[carrera][curso][dia].append([c_horario(clase, h_ini, h_fin, aulas[indice_aula])])
                                                    colocado = True
                                            else:
                                                Horarios[carrera][curso][dia] = [Horarios[carrera][curso][dia], [c_horario(clase, h_ini, h_fin, aulas[indice_aula])]]
                                                colocado = True
                                        indice_aula += 1
                
                #Miramos en la siguiente franja horaria
                if(h_ini >= fin_comer) or (h_fin + 15 <= inicio_comer):
                    h_ini += 15
                    h_fin += 15
                else:
                    h_ini = fin_comer
                    h_fin = fin_comer + clase.duracion
            
            dia += 1
        
        if not colocado:
            clase.mostrar()
            Errores.append(clase)
            raise ValueError("Esta clase no se ha introducido")
    
    if len(Errores) != 0:
        for error in Errores:
            error.mostrar()
        raise ValueError("Ha habido un error. Han habido clases que no se han podido colocar por alguna razón")