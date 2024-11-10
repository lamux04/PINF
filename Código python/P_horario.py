from Horario import* 
from ClasesProyecto import*

import shutil
import os

#Usamos de momento a la ESI como sujeto de pruebas
#Creamos todas las aulas
mg = "Magna grande"
mp = "Magna pequeña"
sem = "Seminario"
pi = "Practicas Informáticas"
lab = "Laboratorio"                 #DE MOMENTO SOLO CONSIDERAMOS LABORATORIOS EN GENERAL, AUNQUE HABRÍA QUE SEPARARLOS
aulas_tipo = []
Aulas= {}
Aulas: dict

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

#Creamos los profesores
#De momento solo tenemos en cuenta algunos profesores que dan clase en 1ºA GII
Paco = profesor("Paco")
Belen = profesor("Belen")
Carmina = profesor("Carmina")
Gabriel = profesor("Gabriel")
Eugenio = profesor("Eugenio")
Eloysa = profesor("Eloysa")
Diego = profesor("Diego")
Blanca = profesor("Blanca")

#Creamos las carreras, los cursos y las asignaturas
giiC = carrera("GII")
gii1a = curso("1ºA GII", giiC)
md = asignatura("Matemática discreta", "SI", gii1a)
cal = asignatura("Cálculo", "NO", gii1a)
ig = asignatura("Informática general", "SI", gii1a)
ip = asignatura("Introducción a la programación", "NO", gii1a)
sdig = asignatura("Sistemas digitales", "SI", gii1a)

#Creamos las clases
Clases = []
Clases.append(clase("Matemática Discreta A1 Teoría 1", "Teoría", mg, 90, "SI", md, Paco))
Clases.append(clase("Matemática Discreta A2 Teoría 2", "Teoría", mg, 90, "SI", md, Paco))
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

#Primera prueba con solo un curso de una carrera
Horarios={}
Horarios: dict
gii={}
gii: dict
gii[gii1a.nombre] = [[],[],[],[],[]]
Horarios[giiC.nombre] = gii

colocarClases(Clases, Aulas, Horarios)