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
#Tercera prueba
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
#Cuarta prueba
David = profesor("David Lobo")
NicoMiguel = profesor("Nicolas Miguel Madrid")
AlbertoSanchez = profesor("Alberto Sanchez Alzola")
AlfonsoJose = profesor("Alfonso Jose Bello")
InmaculadaRamos = profesor("Inmaculada Concepción Ramon")
AguedaVazquez = profesor("Agueda Vazquez Lopez-Escobar")
JoseLuisCardenas = profesor("Jose Luis Cardenas Leal")
MariaIsabelEgea = profesor("Maria Isabel Egea Gonzalez")
VictorPerez = profesor("Victor Perez Fernandez")
IsabelRamirez = profesor("Isabel Ramirez Brenes")
FJavierMoreno = profesor("Francisco Javier Moreno Dorado")
JuanCarlosGarcia = profesor("Juan Carlos García Galindo")
MiriamInmaculada = profesor("Miriam Inmaculada Martinez Gonzalez")
#Quinta prueba
TamaraMaria = profesor("Tamara María Garrido Letrán")
DanielAraujo = profesor("Daniel Araujo Gay")
DanielFernandez = profesor("Daniel Fenández de los Reyes")
MarinaGutierrez = profesor("Marina Gutiérrez Peinado")
Juantonipal = profesor("Juan Antonio Palacios García")
Joseramsaenz = profesor("José Ramón Sáenz Ruiz")
Miguelfosa = profesor("Miguel Ángel Fosas de Pando")
Lauraromero = profesor("Laura Romero Rodriguez")
#Sexta prueba
PedroFdz = profesor("Pedro Fernández Fernández")
PacoPalomo = profesor("Paco Palomo Lozano")
AlfredoSnchz = profesor("Alfredo Sánchez-Roselly Navarro")
AntonioTomeu = profesor("Antonio J Tomeu Hardasmal")
JuanCarlosTorre = profesor("Juan Carlos de la TOrre Macías")
KevinJesus = profesor("Kevin Jesus del Valle")
JuanBoubeta = profesor("Juan Boubeta Puig")
JesusRosa = profesor("Jesus Rosa Bilbao")
JuanFranCabrera = profesor("Juan Francisco Cabrera Sánchez")
PedroDelgado = profesor("Pedro Delgado Pérez")
ElisaGuerrero = profesor("Elisa Guerrero Vázquez")
CarlosRioja = profesor("Carlos Rioja del Rio")
JoseAntonioOrtega = profesor("José Antonio Ortega Pérez")

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
#Cuarta prueba
giaC = carrera("GIA")
gia1 = curso("1º GIA", giaC)
fis1 = asignatura("Fisica 1", "SI", gia1)
cal1gia = asignatura("Calculo", "SI", gia1)
qui = asignatura("Quimica", "SI", gia1)
oge1gia = asignatura("Organización y dirección de empresas", "SI", gia1)
est1gia = asignatura("Estadistica", "SI", gia1)
#Quinta prueba
gia2 = curso("2º GIA",giaC)
amatgia = asignatura("Ampliacion de Matemáticas","SI",gia2)
mategia = asignatura("Ciencia e Ingeniería de materiales","SI",gia2)
elecgia = asignatura("Electricidad","SI",gia2)
flu1gia = asignatura("Mecánica de Fluidos I","NO",gia2)
termogia = asignatura("Termodinámica","NO",gia2)
#sexta prueba
gii3 = curso("3º GII",giiC)
disalg = asignatura("Diseño de Algoritmos","NO",gii3)
ia = asignatura("Inteligencia Artificial","SI",gii3)
pctr = asignatura("Programación Concurrente y de Tiempo Real","NO",gii3)
pinf = asignatura("Proyectos Informático","SI",gii3)
ssi = asignatura("Seguridad en los Sitemas Informáticos","SI",gii3)

#CREAMOS LAS CLASES
#Primera Prueba 1ªA GII
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
#Segunda Prueba 1ªB GII
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
#Tercera prueba 2º A y B GII
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
#Cuarta prueba 1º GIA
Clases.append(clase("FIS1 A1 Teoría 1", "Teoría", mp, 90, "SI", fis1, InmaculadaRamos))
Clases.append(clase("FIS1 A1 Teoría 2", "Teoría", mp, 90, "SI", fis1, InmaculadaRamos))
Clases.append(clase("FIS1 B1 Problemas", "Problemas", sem, 60, "NO", fis1, JoseLuisCardenas))
Clases.append(clase("FIS1 B2 Problemas", "Problemas", sem, 60, "NO", fis1, JoseLuisCardenas))
Clases.append(clase("FIS1 D3 D4 Laboratorio", "Laboratorio", lab, 120, "NO", fis1, AguedaVazquez))
Clases.append(clase("FIS1 D1 D2 Laboratorio", "Laboratorio", lab, 120, "NO", fis1, AguedaVazquez))
Clases.append(clase("Calculo A1 Teoría 1", "Teoría", mp, 90, "SI", cal1gia, David))
Clases.append(clase("Calculo A1 Teoría 2", "Teoría", mp, 60, "SI", cal1gia, David))
Clases.append(clase("Calculo A1 Teoría Extra", "Teoría", sem, 60, "SI", cal1gia, David))
Clases.append(clase("Calculo B1 Problemas 1", "Problemas", sem, 60, "NO", cal1gia, David))
Clases.append(clase("Calculo B1 Problemas 2", "Problemas", sem, 60, "NO", cal1gia, David))
Clases.append(clase("Calculo B2 Problemas 1", "Problemas", sem, 60, "NO", cal1gia, NicoMiguel))
Clases.append(clase("Calculo B2 Problemas 2", "Problemas", sem, 60, "NO", cal1gia, NicoMiguel))
Clases.append(clase("Calculo C1 Prácticas Informáticas", "Prácticas", pi, 120, "NO", cal1gia, David))
Clases.append(clase("Calculo C4 Prácticas Informáticas", "Prácticas", pi, 120, "NO", cal1gia, NicoMiguel))
Clases.append(clase("Calculo C2 C3 Prácticas Informáticas", "Prácticas", pi, 120, "NO", cal1gia, David))
Clases.append(clase("Estadistica A1 Teoría 1", "Teoría", sem, 90, "SI", est1gia, AlbertoSanchez))
Clases.append(clase("Estadistica A1 Teoría 2", "Teoría", sem, 90, "SI", est1gia, AlbertoSanchez))
Clases.append(clase("Estadistica B1 Problemas", "Problemas", sem, 60, "NO", est1gia, AlfonsoJose))
Clases.append(clase("Estadistica B2 Problemas", "Problemas", sem, 60, "NO", est1gia, AlfonsoJose))
Clases.append(clase("Estadistica C2 C3 Prácticas", "Prácticas", pi, 60, "NO", est1gia, AlbertoSanchez))
Clases.append(clase("Estadistica C1 C2 C3 Prácticas 1", "Prácticas", pi, 60, "NO", est1gia, AlbertoSanchez))
Clases.append(clase("Estadistica C1 C2 C3 Prácticas 2", "Prácticas", pi, 60, "NO", est1gia, AlbertoSanchez))
Clases.append(clase("OGE A1 Teoría 1", "Teoría", mp, 90, "SI", oge1gia, IsabelRamirez))
Clases.append(clase("OGE A1 Teoría 2", "Teoría", mp, 90, "SI", oge1gia, IsabelRamirez))
Clases.append(clase("OGE B1 Problemas", "Problemas", sem, 90, "NO", oge1gia, VictorPerez))
Clases.append(clase("OGE B2 Problemas", "Problemas", sem, 90, "NO", oge1gia, VictorPerez))
Clases.append(clase("Quimica A1 Teoría 1", "Teoría", mp, 90, "SI", qui, FJavierMoreno))
Clases.append(clase("Quimica A1 Teoría 2", "Teoría", mp, 90, "SI", qui, FJavierMoreno))
Clases.append(clase("Quimica B1 Problemas", "Problemas", sem, 60, "NO", qui, JuanCarlosGarcia))
Clases.append(clase("Quimica B2 Problemas", "Problemas", sem, 60, "NO", qui, JuanCarlosGarcia))
Clases.append(clase("Quimica D1 Laboratorio", "Laboratorio", lab, 60, "NO", qui, JuanCarlosGarcia))
Clases.append(clase("Quimica D3 Laboratorio", "Laboratorio", lab, 60, "NO", qui, JuanCarlosGarcia))
Clases.append(clase("Quimica D2 Laboratorio", "Laboratorio", lab, 60, "NO", qui, MiriamInmaculada))
Clases.append(clase("Quimica D4 Laboratorio", "Laboratorio", lab, 60, "NO", qui, MiriamInmaculada))
#Quinta prueba 2º GIA
Clases.append(clase("Ampl. Mat A1 Teoría 1", "Teoría", mg, 60, "SI", amatgia,TamaraMaria ))
Clases.append(clase("Ampl. Mat A1 Teoria 2", "Teoría",mg, 120,"SI",amatgia,TamaraMaria))
Clases.append(clase("Ampl. Mat B1 Problemas","Problemas",mg,60,"NO",amatgia,TamaraMaria))
Clases.append(clase("Ampl. Mat B2 Problemas","Problemas",sem,60,"NO",amatgia,TamaraMaria))
Clases.append(clase("Ampl. MAt C1 C3 Prácticas Informáticas","Prácticas", pi, 120, "NO",amatgia,TamaraMaria))
Clases.append(clase("Ampl. MAt C2 Prácticas Informáticas","Prácticas", pi, 120, "NO",amatgia,TamaraMaria))
Clases.append(clase("Ampl. MAt C1 Prácticas Informáticas Extra","Prácticas", pi, 120, "NO",amatgia,TamaraMaria))
Clases.append(clase("Termodinámica A1 Teoria 1","Teoría", mg ,90,"SI",termogia,Lauraromero))
Clases.append(clase("Termodinámica A1 Teoria 2","Teoría", mg ,90,"SI",termogia,Lauraromero))
Clases.append(clase("Termodinámica B1 Problemas","Problemas", sem, 60, "NO",termogia,Lauraromero))
Clases.append(clase("Termodinámica B2 Problemas","Problemas", mg, 60, "NO",termogia,Lauraromero))
Clases.append(clase("Termodinámica C1 C3 Prácticas Informáticas","Prácticas", pi, 120,"NO",termogia,Lauraromero))
Clases.append(clase("Termodinámica C2 C6 Prácticas Informáticas","Prácticas", pi, 120,"NO",termogia,Lauraromero))
Clases.append(clase("Termodinámica C4 C5 Prácticas Informáticas","Prácticas", pi, 120,"NO",termogia,Lauraromero))
Clases.append(clase("Termodinámica C7 Prácticas Informáticas","Prácticas", pi, 120,"NO",termogia,Lauraromero))
Clases.append(clase("Mecánica de Fluidos I X1 Teorico-prácticas 1","Teoría", mg, 120,"SI",flu1gia,Miguelfosa))
Clases.append(clase("Mecánica de Fluidos I X1 Teorico-prácticas 2","Teoría", mg, 120,"SI",flu1gia,Miguelfosa))
Clases.append(clase("Mecánica de Fluidos I X1 Teorico-prácticas Extra","Teoría", mg, 120,"SI",flu1gia,Miguelfosa))
Clases.append(clase("Mecánica de Fluidos I X1 Teorico-prácticas Extra 2","Teoría", mg, 60,"SI",flu1gia,Miguelfosa))
Clases.append(clase("Mecánica de Fluidos I D1 D3 Laboratorio","Laboratório", lab, 120,"NO",flu1gia,Miguelfosa))
Clases.append(clase("Mecánica de Fluidos I D2 D$ Laboratorio","Laboratório", lab, 120,"NO",flu1gia,Miguelfosa))
Clases.append(clase("Mecánica de Fluidos I D5 D6 Laboratorio","Laboratório", lab, 120,"NO",flu1gia,Miguelfosa))
Clases.append(clase("Ciencia e Ingeniería de Materiales A1 Teoría 1","Teoría",mg,120,"SI",mategia,DanielAraujo))
Clases.append(clase("Ciencia e Ingeniería de Materiales A1 Teoría 2","Teoría",mg,120,"SI",mategia,DanielAraujo))
Clases.append(clase("Ciencia e Ingeniería de Materiales B1 Problemas","Problemas",mg,60,"NO",mategia,DanielFernandez))
Clases.append(clase("Ciencia e Ingeniería de Materiales B2 Problemas","Problemas",mg,60,"NO",mategia,DanielFernandez))
Clases.append(clase("Ciencia e Ingeniería de Materiales D1 D3 Laboratorio","Laboratorio",lab,120,"NO",mategia,MarinaGutierrez))
Clases.append(clase("Ciencia e Ingeniería de Materiales D2 D4 Laboratorio","Laboratorio",lab,120,"NO",mategia,MarinaGutierrez))
Clases.append(clase("Electricidad A1 Teoría 1","Teoría",sem,60,"SI",elecgia,Juantonipal))
Clases.append(clase("Electricidad A1 Teoría 2","Teoría", mg, 120, "SI",elecgia,Juantonipal))
Clases.append(clase("ELectricidad B1 Problemas","Problemas", sem, 60,"NO",elecgia,Joseramsaenz))
Clases.append(clase("ELectricidad B2 Problemas","Problemas", sem, 60,"NO",elecgia,Joseramsaenz))
Clases.append(clase("Electricidad D1 Laboratorio","Laboratorio",lab,120,"NO", elecgia,Juantonipal))
Clases.append(clase("Electricidad D2 Laboratorio","Laboratorio",lab,120,"NO", elecgia, Joseramsaenz))
Clases.append(clase("Electricidad D3 Laboratorio","Laboratorio",lab,120,"NO", elecgia, Juantonipal))
Clases.append(clase("Electricidad D4 Laboratorio","Laboratorio",lab,120,"NO", elecgia, Joseramsaenz))
#Sexta Prueba
Clases.append(clase("Diseño de Algoritmos A1 Teoría","Teoría",sem,90,"SI",disalg,PacoPalomo))
Clases.append(clase("Diseño de Algoritmos A2 Teoría","Teoría",sem,90,"SI",disalg,PacoPalomo))
Clases.append(clase("Diseño de Algoritmos B1 Problemas","Problemas",sem,60,"NO",disalg,PedroFdz))
Clases.append(clase("Diseño de Algoritmos B2 Problemas","Problemas",sem,60,"NO",disalg,PedroFdz))
Clases.append(clase("Diseño de Algoritmos B3 Problemas","Problemas",sem,60,"NO",disalg,PacoPalomo))
Clases.append(clase("Diseño de Algoritmos B4 Problemas","Problemas",sem,60,"NO",disalg,PacoPalomo))
Clases.append(clase("Diseño de Algoritmos C1 Prácticas","Prácticas",pi,150,"NO",disalg,AlfredoSnchz))
Clases.append(clase("Diseño de Algoritmos C2 Prácticas","Prácticas",pi,150,"NO",disalg,AlfredoSnchz))
Clases.append(clase("Diseño de Algoritmos C3 Prácticas","Prácticas",pi,150,"NO",disalg,AlbertoSanchez))
Clases.append(clase("Diseño de Algoritmos C4 Prácticas","Prácticas",pi,150,"NO",disalg,AlfredoSnchz))
Clases.append(clase("Diseño de Algoritmos C5 Prácticas","Prácticas",pi,150,"NO",disalg,PedroFdz))
Clases.append(clase("Diseño de Algoritmos C6 Prácticas","Prácticas",pi,150,"NO",disalg,PedroFdz))
Clases.append(clase("Diseño de Algoritmos C7 Prácticas","Prácticas",pi,150,"NO",disalg,PedroFdz))
Clases.append(clase("Programación Concurrente y de Tiempo Real A1 Teoria","Teoría",mp,90,"SI",pctr,KevinJesus))
Clases.append(clase("Programación Concurrente y de Tiempo Real A1 Teoria Extra","Teoría",mp,90,"SI",pctr,KevinJesus))
Clases.append(clase("Programación Concurrente y de Tiempo Real A2 Teoria","Teoría",mp,90,"SI",pctr,KevinJesus))
Clases.append(clase("Programación Concurrente y de Tiempo Real A2 Teoria Extra","Teoría",mp,90,"SI",pctr,KevinJesus))
Clases.append(clase("Programación Concurrente y de Tiempo Real B1 Problemas","Problemas",sem,60,"NO",pctr,JuanCarlosTorre))
Clases.append(clase("Programación Concurrente y de Tiempo Real B2 Problemas","Problemas",sem,60,"NO",pctr,JuanCarlosGarcia))
Clases.append(clase("Programación Concurrente y de Tiempo Real B3 Problemas","Problemas",sem,60,"NO",pctr,JuanCarlosGarcia))
Clases.append(clase("Programación Concurrente y de Tiempo Real B4 Problemas","Problemas",sem,60,"NO",pctr,JuanCarlosGarcia))
Clases.append(clase("Programación Concurrente y de Tiempo Real C1 Prácticas","Prácticas",pi,120,"N0",pctr,AntonioTomeu))
Clases.append(clase("Programación Concurrente y de Tiempo Real C2 Prácticas","Prácticas",pi,120,"N0",pctr,AntonioTomeu))
Clases.append(clase("Programación Concurrente y de Tiempo Real C3 Prácticas","Prácticas",pi,120,"N0",pctr,AntonioTomeu))
Clases.append(clase("Programación Concurrente y de Tiempo Real C4 Prácticas","Prácticas",pi,120,"N0",pctr,AntonioTomeu))
Clases.append(clase("Programación Concurrente y de Tiempo Real C5 Prácticas","Prácticas",pi,120,"N0",pctr,AntonioTomeu))
Clases.append(clase("Programación Concurrente y de Tiempo Real C6 Prácticas","Prácticas",pi,120,"N0",pctr,AntonioTomeu))
Clases.append(clase("Seguridad en los Sistemas Infomáticos A1 Teoría","Teoría", mg, 120,"SI",ssi,JuanBoubeta))
Clases.append(clase("Seguridad en los Sistemas Infomáticos A1 Teoría extra","Teoría", mg, 120,"SI",ssi,JuanBoubeta))
Clases.append(clase("Seguridad en los Sistemas Informáticos C1 Prácticas","Prácticas",pi,150,"NO",ssi,JuanBoubeta))
Clases.append(clase("Seguridad en los Sistemas Informáticos C2 Prácticas","Prácticas",pi,150,"NO",ssi,JuanBoubeta))
Clases.append(clase("Seguridad en los Sistemas Informáticos C3 Prácticas","Prácticas",pi,150,"NO",ssi,JesusRosa))
Clases.append(clase("Seguridad en los Sistemas Informáticos C4 Prácticas","Prácticas",pi,150,"NO",ssi,JesusRosa))
Clases.append(clase("Inteligencia Artificial A1 Teoría","Teoría",mp,90,"SI",ia,ElisaGuerrero))
Clases.append(clase("Inteligencia Artificial A1 Teoría Extra","Teoría",mp,90,"SI",ia,ElisaGuerrero))
Clases.append(clase("Inteligencia Artificial B1 Problemas","Problemas", sem, 60,"NO", ia,JuanFranCabrera))
Clases.append(clase("Inteligencia Artificial B2 Problemas","Problemas", sem, 60,"NO", ia,JuanFranCabrera))
Clases.append(clase("Inteligencia Artificial C1 Prácticas","Prácticas",sem,120,"NO",ia,PedroDelgado))
Clases.append(clase("Inteligencia Artificial C2 Prácticas","Prácticas",sem,120,"NO",ia,PedroDelgado))
Clases.append(clase("Inteligencia Artificial C3 Prácticas","Prácticas",sem,120,"NO",ia,PedroDelgado))
Clases.append(clase("Inteligencia Artificial C4 Prácticas","Prácticas",sem,120,"NO",ia,PedroDelgado))
Clases.append(clase("Proyectos Informáticos X1 Teorico-Prácticas","Teoría",mp,120,"SI",pinf,CarlosRioja))
Clases.append(clase("Proyectos Informáticos X1 Teorico-Prácticas Extra","Teoría",mp,120,"SI",pinf,CarlosRioja))
Clases.append(clase("Proyectos Informáticos C1 Prácticas","Prácticas",sem,150,"NO",pinf,JoseAntonioOrtega))
Clases.append(clase("Proyectos Informáticos C2 Prácticas","Prácticas",sem,150,"NO",pinf,JoseAntonioOrtega))
Clases.append(clase("Proyectos Informáticos C3 Prácticas","Prácticas",sem,150,"NO",pinf,JoseAntonioOrtega))

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
#Cuarta prueba
gia: dict
gia = {}
gia[gia1.nombre] = [[],[],[],[],[]]
#Quinta prueba
gia[gia2.nombre] = [[],[],[],[],[]]
#Sexta prueba
gii[gii3.nombre] = [[],[],[],[],[]]

Horarios[giiC.nombre] = gii
Horarios[giaC.nombre] = gia



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


