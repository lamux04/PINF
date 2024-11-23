from Horario import* 
from ClasesProyecto import*

import shutil
import os

#Usamos de momento las clases del primer cuatrimestre de la ESI como sujeto de pruebas
#PRUEBAS
#Primera prueba: solo las clases de 1ºA de GII
#Segunda prueba: añadimos las clases de 1ºB de GII
#Tercera prueba: añadimos las clases de 2º de GII

#CREAMOS TODAS LAS AULAS
mg = "Magna grande"
mp = "Magna pequeña"
sem = "Seminario"
pi = "Practicas Informáticas"
lab = "Laboratorio"                 #DE MOMENTO SOLO CONSIDERAMOS LABORATORIOS EN GENERAL, AUNQUE HABRÍA QUE SEPARARLOS
aulas_tipo = []
Aulas: dict
Aulas= {}

for aul in ["E01", "E02", "D01", "D02"]:
    aulas_tipo.append(aul)
Aulas[mg] = aulas_tipo
aulas_tipo = []

for aul in ["C01", "C02", "B01", "B02", "A01", "A02"]:
    aulas_tipo.append(aul)
Aulas[mp] = aulas_tipo
aulas_tipo = []

for aul in ["E0", "D0", "C0", "B0", "A0"]:
    for s in ["3", "4", "5", "6"]:
        nom = aul + s
        aulas_tipo.append(nom)
Aulas[sem] = aulas_tipo
aulas_tipo = []

for aul in ["E0", "D0", "C0", "B0", "A0"]:
    for s in ["7", "8", "9"]:
        nom = aul + s
        aulas_tipo.append(nom)
Aulas[pi] = aulas_tipo
aulas_tipo = []

for aul in ["E", "D", "C", "B", "A"]:
    for s in ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19"]:
        nom = aul + s
        aulas_tipo.append(nom)
Aulas[lab] = aulas_tipo

#CREAMOS LOS PROFESORES
#Primera prueba
Paco = profesor("Paco")
Belen = profesor("Belen")
Carmina = profesor("Carmina")
Gabriel = profesor("Gabriel")
Eugenio = profesor("Eugenio")
Eloysa = profesor("Eloysa")
Diego = profesor("Diego")
Blanca = profesor("Blanca")
#Segunda prueba
Alicia = profesor("Alicia")
Nuria = profesor("Nuria")
Elena = profesor("Elena")
MariaEugenia = profesor("MariaEugenia")
Miguel = profesor("Miguel")
#Tercero prueba
Alfonso = profesor("Alfonso")
Blas = profesor("Blas")
Mati = profesor("Manuel Matias")
Angel = profesor("Angel")
Luis = profesor("Luis")
FJavier = profesor("Francisco Javier")
AnJesus = profesor("Antonio Jesus")
Mercedes = profesor("Mercedes")
Juanjo = profesor("Prosesos")
Leopoldo = profesor("Leopoldo")
dlh = profesor("De la huerta")
Josefi = profesor("Jose Fidel")
Maite = profesor("Maite")
Jesus_Roman = profesor("Jesus Roman")

#CREAMOS LAS CARRERAS, LOS CURSOS Y LAS ASIGNATURAS
#Primera prueba
giiC = carrera("GII")
gii1a = curso("1ºA GII", giiC)
md = asignatura("Matemática discreta", "SI", gii1a)
cal = asignatura("Cálculo", "NO", gii1a)
ig = asignatura("Informática general", "SI", gii1a)
ip = asignatura("Introducción a la programación", "NO", gii1a)
sdig = asignatura("Sistemas digitales", "SI", gii1a)
#Segunda prueba
gii1b = curso("1ºB GII", giiC)
md2 = asignatura("Matemática discreta", "SI", gii1b)
cal2 = asignatura("Cálculo", "NO", gii1b)
ig2 = asignatura("Informática general", "SI", gii1b)
ip2 = asignatura("Introducción a la programación", "NO", gii1b)
sdig2 = asignatura("Sistemas digitales", "SI", gii1b)
#Tercera prueba
gii2a = curso("2ºA GII", giiC)
ac1 = asignatura("Arquitectura de computadores", "SI", gii2a)
oge1 = asignatura("Organización y dirección de empresas", "SI", gii2a)
rc1 = asignatura("Redes de computadoras", "SI", gii2a)
so1 = asignatura("Sistemas Operativos", "SI", gii2a)
aaed1 = asignatura("AAED", "NO", gii2a)
gii2b = curso("2ºB GII", giiC)
ac2 = asignatura("Arquitectura de computadores", "SI", gii2b)
oge2 = asignatura("Organización y dirección de empresas", "SI", gii2b)
rc2 = asignatura("Redes de computadoras", "SI", gii2b)
so2 = asignatura("Sistemas Operativos", "SI", gii2b)
aaed2 = asignatura("AAED", "NO", gii2b)


#CREAMOS LAS CLASES
#Primera Prueba
Clases = []
Clases.append(clase("Matemática Discreta A1 Teoría 1", "Teoría", mg, 90, "SI", md, Paco))
Clases.append(clase("Matemática Discreta A1 Teoría 2", "Teoría", mg, 90, "SI", md, Paco))
Clases.append(clase("Matemática Discreta B1 Problemas", "Problemas", sem, 90, "NO", md, Paco))
Clases.append(clase("Matemática Discreta B3 Problemas", "Problemas", sem, 90, "NO", md, Paco))
Clases.append(clase("Calculo A1 Teoria 1", "Teoria", mg, 90, "SI", cal, Belen))
Clases.append(clase("Calculo A1 Teoria 2", "Teoria", mg, 90, "SI", cal, Belen))
Clases.append(clase("Calculo B1 Problemas", "Problemas", sem, 60, "NO", cal, Belen))
Clases.append(clase("Calculo B3 Problemas", "Problemas", sem, 60, "NO", cal, Belen))
Clases.append(clase("Calculo C1 C5 Prácticas informáticas", "Prácticas", pi, 120, "NO", cal, Belen))
Clases.append(clase("Calculo C3 C7 Prácticas informáticas", "Prácticas", pi, 120, "NO", cal, Belen))
Clases.append(clase("Informática general A1 Teoría", "Teoría", mp, 90, "SI", ig, Carmina))
Clases.append(clase("Informática general A1 Teoría Extra", "Teoría", mp, 90, "SI", ig, Carmina))
Clases.append(clase("Informática general B1 Problemas", "Problemas", sem, 60, "NO", ig, Gabriel))
Clases.append(clase("Informática general B3 Problemas", "Problemas", sem, 60, "NO", ig, Gabriel))
Clases.append(clase("Informática general C1 Prácticas informáticas", "Prácticas", pi, 120, "NO", ig, Carmina))
Clases.append(clase("Informática general C3 Prácticas informáticas", "Prácticas", pi, 120, "NO", ig, Carmina))
Clases.append(clase("Informática general C5 Prácticas informáticas", "Prácticas", pi, 120, "NO", ig, Eugenio))
Clases.append(clase("Informática general C7 Prácticas informáticas", "Prácticas", pi, 120, "NO", ig, Eugenio))
Clases.append(clase("Introducción a la programación A1 Teoría", "Teoría", mp, 90, "SI", ip, Eloysa))
Clases.append(clase("Introducción a la programación A1 Teoría Extra", "Teoría", mp, 90, "SI", ip, Eloysa))
Clases.append(clase("Introducción a la programación B1 Problemas", "Problemas", sem, 60, "NO", ip, Eloysa))
Clases.append(clase("Introducción a la programación B3 Problemas", "Problemas", sem, 60, "NO", ip, Eloysa))
Clases.append(clase("Introducción a la programación C1 Prácticas Informáticas", "Prácticas", pi, 120, "NO", ip, Eloysa))
Clases.append(clase("Introducción a la programación C3 Prácticas Informáticas", "Prácticas", pi, 120, "NO", ip, Eloysa))
Clases.append(clase("Introducción a la programación C5 Prácticas Informáticas", "Prácticas", pi, 120, "NO", ip, Eloysa))
Clases.append(clase("Introducción a la programación C7 Prácticas Informáticas", "Prácticas", pi, 120, "NO", ip, Eloysa))
Clases.append(clase("Sistemas Digitales A1 Teoría", "Teoría", sem, 90, "SI", sdig, Diego))
Clases.append(clase("Sistemas Digitales A1 Teoría Extra", "Teoría", sem, 90, "SI", sdig, Diego))
Clases.append(clase("Sistemas Digitales B1 Problemas", "Problemas", sem, 60, "NO", sdig, Diego))
Clases.append(clase("Sistemas Digitales B3 Problemas", "Problemas", sem, 60, "NO", sdig, Diego))
Clases.append(clase("Sistemas Digitales D1 Laboratorio", "Laboratorio", lab, 120, "NO", sdig, Blanca))
Clases.append(clase("Sistemas Digitales D3 Laboratorio", "Laboratorio", lab, 120, "NO", sdig, Blanca))
Clases.append(clase("Sistemas Digitales D5 Laboratorio", "Laboratorio", lab, 120, "NO", sdig, Blanca))
Clases.append(clase("Sistemas Digitales D7 Laboratorio", "Laboratorio", lab, 120, "NO", sdig, Blanca))
#Segunda Prueba
Clases.append(clase("Matemática Discreta A2 Teoría 1", "Teoría", mg, 90, "SI", md2, MariaEugenia))
Clases.append(clase("Matemática Discreta A2 Teoría 2", "Teoría", mg, 90, "SI", md2, MariaEugenia))
Clases.append(clase("Matemática Discreta B2 Problemas", "Problemas", sem, 90, "NO", md2, MariaEugenia))
Clases.append(clase("Matemática Discreta B4 Problemas", "Problemas", sem, 90, "NO", md2, MariaEugenia))
Clases.append(clase("Calculo A2 Teoria 1", "Teoria", mg, 90, "SI", cal2, Alicia))
Clases.append(clase("Calculo A2 Teoria 2", "Teoria", mg, 90, "SI", cal2, Alicia))
Clases.append(clase("Calculo B2 Problemas", "Problemas", sem, 60, "NO", cal2, Alicia))
Clases.append(clase("Calculo B4 Problemas", "Problemas", sem, 60, "NO", cal2, Alicia))
Clases.append(clase("Calculo C2 Prácticas informáticas", "Prácticas", pi, 120, "NO", cal2, Alicia))
Clases.append(clase("Calculo C4 Prácticas informáticas", "Prácticas", pi, 120, "NO", cal2, Alicia))
Clases.append(clase("Calculo C6 Prácticas informáticas", "Prácticas", pi, 120, "NO", cal2, Belen))
Clases.append(clase("Calculo C8 Prácticas informáticas", "Prácticas", pi, 120, "NO", cal2, Belen))
Clases.append(clase("Informática general A2 Teoría", "Teoría", mp, 90, "SI", ig2, Carmina))
Clases.append(clase("Informática general A2 Teoría Extra", "Teoría", mp, 90, "SI", ig2, Carmina))
Clases.append(clase("Informática general B2 Problemas", "Problemas", sem, 60, "NO", ig2, Gabriel))
Clases.append(clase("Informática general B4 Problemas", "Problemas", sem, 60, "NO", ig2, Gabriel))
Clases.append(clase("Informática general C2 Prácticas informáticas", "Prácticas", pi, 120, "NO", ig2, Carmina))
Clases.append(clase("Informática general C4 Prácticas informáticas", "Prácticas", pi, 120, "NO", ig2, Eugenio))
Clases.append(clase("Informática general C6 Prácticas informáticas", "Prácticas", pi, 120, "NO", ig2, Eugenio))
Clases.append(clase("Introducción a la programación A2 Teoría", "Teoría", mp, 90, "SI", ip2, Nuria))
Clases.append(clase("Introducción a la programación A2 Teoría Extra", "Teoría", mp, 90, "SI", ip2, Nuria))
Clases.append(clase("Introducción a la programación B2 Problemas", "Problemas", sem, 60, "NO", ip2, Nuria))
Clases.append(clase("Introducción a la programación B4 Problemas", "Problemas", sem, 60, "NO", ip2, Elena))
Clases.append(clase("Introducción a la programación C2 Prácticas Informáticas", "Prácticas", pi, 120, "NO", ip2, Nuria))
Clases.append(clase("Introducción a la programación C4 Prácticas Informáticas", "Prácticas", pi, 120, "NO", ip2, Nuria))
Clases.append(clase("Introducción a la programación C6 Prácticas Informáticas", "Prácticas", pi, 120, "NO", ip2, Elena))
Clases.append(clase("Introducción a la programación C8 Prácticas Informáticas", "Prácticas", pi, 120, "NO", ip2, Elena))
Clases.append(clase("Sistemas Digitales A2 Teoría", "Teoría", sem, 90, "SI", sdig2, Diego))
Clases.append(clase("Sistemas Digitales A2 Teoría Extra", "Teoría", sem, 90, "SI", sdig2, Diego))
Clases.append(clase("Sistemas Digitales B2 Problemas", "Problemas", sem, 60, "NO", sdig2, Diego))
Clases.append(clase("Sistemas Digitales B4 Problemas", "Problemas", sem, 60, "NO", sdig2, Diego))
Clases.append(clase("Sistemas Digitales D4 D8 Laboratorio 1", "Laboratorio", lab, 120, "NO", sdig2, Miguel))
Clases.append(clase("Sistemas Digitales D4 D8 Laboratorio 2", "Laboratorio", lab, 120, "NO", sdig2, Miguel))
Clases.append(clase("Sistemas Digitales D6 Laboratorio", "Laboratorio", lab, 120, "NO", sdig2, Miguel))
Clases.append(clase("Sistemas Digitales D2 Laboratorio", "Laboratorio", lab, 120, "NO", sdig2, Miguel))
#Tercera prueba
Clases.append(clase("AAED A1 Teoría", "Teoría", mp, 90, "SI", aaed1, Josefi))
Clases.append(clase("AAED A1 Teoría Extra", "Teoría", mp, 90, "SI", aaed1, Josefi))
Clases.append(clase("AAED B1 Problemas", "Problemas", sem, 60, "NO", aaed1, Maite))
Clases.append(clase("AAED B3 Problemas", "Problemas", sem, 60, "NO", aaed1, Maite))
Clases.append(clase("AAED C1 Prácticas", "Prácticas", pi, 120, "NO", aaed1, Josefi))
Clases.append(clase("AAED C7 Prácticas", "Prácticas", pi, 120, "NO", aaed1, Josefi))
Clases.append(clase("AAED C3 Prácticas", "Prácticas", pi, 120, "NO", aaed1, Jesus_Roman))
Clases.append(clase("AAED C5 Prácticas", "Prácticas", pi, 120, "NO", aaed1, Jesus_Roman))
Clases.append(clase("AC A1 Teoría", "Teoría", mp, 120, "SI", ac1, Blas))
Clases.append(clase("AC A1 Teoría Extra", "Teoría", mp, 120, "SI", ac1, Blas))
Clases.append(clase("AC C1 Problemas", "Problemas", pi, 60, "NO", ac1, Mati))
Clases.append(clase("AC C3 Problemas", "Problemas", pi, 60, "NO", ac1, Mati))
Clases.append(clase("AC C5 Problemas", "Problemas", pi, 60, "NO", ac1, Mati))
Clases.append(clase("AC D1 Laboratorio", "Laboratorio", lab, 90, "NO", ac1, Alfonso))
Clases.append(clase("AC D1 Laboratorio Extra", "Laboratorio", lab, 90, "NO", ac1, Alfonso))
Clases.append(clase("AC D3 Laboratorio", "Laboratorio", lab, 90, "NO", ac1, Alfonso))
Clases.append(clase("AC D3 Laboratorio Extra", "Laboratorio", lab, 90, "NO", ac1, Alfonso))
Clases.append(clase("AC D5 Laboratorio", "Laboratorio", lab, 90, "NO", ac1, Alfonso))
Clases.append(clase("Redes A1 Teoría B1 Problemas", "Teoría", mp, 90, "SI", rc1, Mercedes))
Clases.append(clase("Redes A1 Teoría B3 Problemas", "Teoría", mp, 90, "SI", rc1, Mercedes))
Clases.append(clase("Redes D1 Laboratorio", "Laboratorio", lab, 120, "NO", rc1, AnJesus))
Clases.append(clase("Redes D3 Laboratorio", "Laboratorio", lab, 120, "NO", rc1, AnJesus))
Clases.append(clase("Redes D5 Laboratorio", "Laboratorio", lab, 120, "NO", rc1, AnJesus))
Clases.append(clase("SO A1 Teoría", "Teoría", mp, 90, "SI", so1, Juanjo))
Clases.append(clase("SO A1 Teoría Extra", "Teoría", mp, 90, "SI", so1, Juanjo))
Clases.append(clase("SO B1 Problemas", "Problemas", sem, 90, "NO", so1, Juanjo))
Clases.append(clase("SO B3 Problemas", "Problemas", sem, 90, "NO", so1, Juanjo))
Clases.append(clase("SO C1 Prácticas", "Prácticas", pi, 120, "NO", so1, Juanjo))
Clases.append(clase("SO C3 Prácticas", "Prácticas", pi, 120, "NO", so1, Juanjo))
Clases.append(clase("SO C5 Prácticas", "Prácticas", pi, 120, "NO", so1, Leopoldo))
Clases.append(clase("OGE A1 Teoría 1", "Teoría", mp, 90, "SI", oge1, Angel))
Clases.append(clase("OGE A1 Teoría 2", "Teoría", mp, 90, "SI", oge1, Angel))
Clases.append(clase("OGE B1 Problemas", "Problemas", sem, 90, "NO", oge1, Luis))
Clases.append(clase("OGE B3 Problemas", "Problemas", sem, 90, "NO", oge1, Luis))
Clases.append(clase("AAED A2 Teoría", "Teoría", mp, 90, "SI", aaed2, Josefi))
Clases.append(clase("AAED A2 Teoría Extra", "Teoría", mp, 90, "SI", aaed2, Josefi))
Clases.append(clase("AAED B2 Problemas", "Problemas", sem, 60, "NO", aaed2, Maite))
Clases.append(clase("AAED B4 Problemas", "Problemas", sem, 60, "NO", aaed2, Maite))
Clases.append(clase("AAED C2 Prácticas", "Prácticas", pi, 120, "NO", aaed2, dlh))
Clases.append(clase("AAED C2 Prácticas Extra", "Prácticas", pi, 120, "NO", aaed2, dlh))
Clases.append(clase("AAED C4 Prácticas", "Prácticas", pi, 120, "NO", aaed2, dlh))
Clases.append(clase("AAED C4 Prácticas Extra", "Prácticas", pi, 120, "NO", aaed2, dlh))
Clases.append(clase("AAED C6 Prácticas", "Prácticas", pi, 120, "NO", aaed2, dlh))
Clases.append(clase("AAED C6 Prácticas Extra", "Prácticas", pi, 120, "NO", aaed2, dlh))
Clases.append(clase("AAED C8 Prácticas", "Prácticas", pi, 120, "NO", aaed2, Jesus_Roman))
Clases.append(clase("AC A2 Teoría", "Teoría", mp, 120, "SI", ac2, Blas))
Clases.append(clase("AC A2 Teoría Extra", "Teoría", mp, 120, "SI", ac2, Blas))
Clases.append(clase("AC C2 Problemas", "Problemas", pi, 60, "NO", ac2, Mati))
Clases.append(clase("AC C4 Problemas", "Problemas", pi, 60, "NO", ac2, Mati))
Clases.append(clase("AC D2 Laboratorio", "Laboratorio", lab, 90, "NO", ac2, Alfonso))
Clases.append(clase("AC D2 Laboratorio Extra", "Laboratorio", lab, 90, "NO", ac2, Alfonso))
Clases.append(clase("AC D4 Laboratorio", "Laboratorio", lab, 90, "NO", ac2, Alfonso))
Clases.append(clase("AC D6 Laboratorio", "Laboratorio", lab, 90, "NO", ac2, Alfonso))
Clases.append(clase("Redes A2 Teoría", "Teoría", mp, 90, "SI", rc2, Mercedes))
Clases.append(clase("Redes A2 Teoría B2 Problemas", "Teoría", mp, 90, "SI", rc2, Mercedes))
Clases.append(clase("Redes D2 Laboratorio", "Laboratorio", lab, 120, "NO", rc2, AnJesus))
Clases.append(clase("Redes D4 Laboratorio", "Laboratorio", lab, 120, "NO", rc2, AnJesus))
Clases.append(clase("Redes D6 Laboratorio", "Laboratorio", lab, 120, "NO", rc2, AnJesus))
Clases.append(clase("SO A2 Teoría", "Teoría", mp, 90, "SI", so2, Juanjo))
Clases.append(clase("SO A2 Teoría Extra", "Teoría", mp, 90, "SI", so2, Juanjo))
Clases.append(clase("SO B1 Problemas", "Problemas", sem, 90, "NO", so2, Leopoldo))
Clases.append(clase("SO B3 Problemas", "Problemas", sem, 90, "NO", so2, Leopoldo))
Clases.append(clase("SO C2 Prácticas", "Prácticas", pi, 120, "NO", so2, Leopoldo))
Clases.append(clase("SO C4 Prácticas", "Prácticas", pi, 120, "NO", so2, Juanjo))
Clases.append(clase("OGE A2 Teoría 1", "Teoría", mp, 90, "SI", oge2, Angel))
Clases.append(clase("OGE A2 Teoría 2", "Teoría", mp, 90, "SI", oge2, Angel))
Clases.append(clase("OGE B2 Problemas", "Problemas", sem, 90, "NO", oge2, FJavier))

#COMIENZAN LAS PRUEBAS
#Primera prueba
Horarios: dict
Horarios={}
gii: dict
gii={}
gii[gii1a.nombre] = [[],[],[],[],[]]
#Segunda prueba
gii[gii1b.nombre] = [[],[],[],[],[]]
#Tercera prueba
gii[gii2a.nombre] = [[],[],[],[],[]]
gii[gii2b.nombre] = [[],[],[],[],[]]

Horarios[giiC.nombre] = gii

colocarClases(Clases, Aulas, Horarios)

print("Horario terminado", end="\n\n")

print("Introduzca un 1 si quiere comprobar todos los horarios de la escuela o un 2 si quiere comprobar uno en concreto: ", end="")
OpcionEscogida = int(input())
while(OpcionEscogida != 1 and OpcionEscogida != 2):
    OpcionEscogida = int(input("Introduzca simplemente 1 o 2: "))

if OpcionEscogida == 1:
    for Carrera in Horarios.keys():
        print(f"Horarios de la carrera{Carrera}", end="\n")
        for Curso in Horarios[Carrera].keys():
            print(f"Horarios del {Curso} de {Carrera}")
            for Dia in range(0,5):
                print(f"Horarios del {Dia} de {Curso} de {Carrera}")
                if type(Horarios[Carrera][Curso][Dia][0]) is list:
                    i = 0
                    while i < len(Horarios[Carrera][Curso][Dia]):
                        print(f"Lista {i}")
                        for Clase in Horarios[Carrera][Curso][Dia][i]:
                            Clase.mostrar()
                        i += 1
                else:
                    for Clase in Horarios[Carrera][Curso][Dia]:
                            Clase.mostrar()

else:
    while(True):
        print("Escoja una de las siguientes carreras:")
        i = 1
        Carrera = list(Horarios.keys())
        for c in Carrera:
            print(f"{i}: {c}")
            i = i + 1
        CarreraEscogida = int(input("Escriba el número de la carrera: "))
        while(CarreraEscogida > len(Horarios.keys()) or CarreraEscogida <= 0):
            CarreraEscogida = int(input("Por favor, introduzca uno de los valores que han aparecido antes: "))
        print("Escoja uno de los cursos de la carrera:")
        i = 1
        Curso = list(Horarios[Carrera[CarreraEscogida - 1]].keys())
        for c in Curso:
            print(f"{i}: {c}")
            i = i + 1
        CursoEscogido = int(input("Escriba el número del curso: "))
        while(CursoEscogido > len(Horarios[Carrera[CarreraEscogida - 1]].keys()) or CursoEscogido <= 0):
            CursoEscogido = int(input("Por favor, introduzca uno de los valores que han aparecido antes: "))
        print("Escoja uno de los días de la semana:")
        print("1: Lunes")
        print("2: Martes")
        print("3: Miercoles")
        print("4: Jueves")
        print("5: Viernes")
        DiaEscogido = int(input("Escriba el número del día: "))
        while(DiaEscogido < 1 or DiaEscogido > 5):
            DiaEscogido = int(input("Por favor, introduzca uno de los valores que han aparecido antes: "))
        if type(Horarios[Carrera[CarreraEscogida - 1]][Curso[CursoEscogido - 1]][DiaEscogido - 1][0]) is list:
            i = 0
            while i < len(Horarios[Carrera[CarreraEscogida - 1]][Curso[CursoEscogido - 1]][DiaEscogido - 1]):
                print(f"Lista {i}")
                for Clase in Horarios[Carrera[CarreraEscogida - 1]][Curso[CursoEscogido - 1]][DiaEscogido - 1][i]:
                    Clase.mostrar()
                i = i + 1
        else:
            for Clase in Horarios[Carrera[CarreraEscogida - 1]][Curso[CursoEscogido - 1]][DiaEscogido - 1]:
                Clase.mostrar()


