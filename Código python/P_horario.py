import Horario as v1
import HorarioV2 as v2
import HorarioV3 as v3
from ClasesProyecto import*

import shutil
import os

#Usamos de momento las clases del primer cuatrimestre de la ESI como sujeto de pruebas
#PRUEBAS
#Primera prueba: solo las clases de 1ºA de GII
#Segunda prueba: añadimos las clases de 1ºB de GII
#Tercera prueba: añadimos las clases de 2º de GII
#Cuarta prueba: añadimos las clases de 1º de GIA
#Quinta prueba: añadimos las clases de 2º de GIA
#Sexta prueba: añadimos las clases de 3º de GII
#Séptima prueba: añadimos las clases de todas las ramas de 4º de GII
#Octava prueba: añadimos las clases de 3º de GIA
#Novena prueba: añadimos las clases de 1º de GIM

#CREAMOS TODAS LAS AULAS
mg = "Magna grande"
mp = "Magna pequeña"
sem = "Problemas"
pi = "Practicas Informáticas"
#lab = "Laboratorio"
fs = "Seminario pasillo F"
aulas_tipo = []
Aulas: dict
Aulas= {}

for aul in ["E01", "E02", "D01", "D02"]:
    aulas_tipo.append(aul)
Aulas[mg] = aulas_tipo
aulas_tipo = []

for aul in ["C01", "C02", "B01", "B02"]:
    aulas_tipo.append(aul)
Aulas[mp] = aulas_tipo
aulas_tipo = []

for aul in ["E0", "D0", "C0", "B0"]:
    for s in ["3", "4", "5", "6"]:
        nom = aul + s
        aulas_tipo.append(nom)
Aulas[sem] = aulas_tipo
aulas_tipo = []

for aul in ["E0", "D0", "C0", "B0"]:
    for s in ["7", "8", "9"]:
        nom = aul + s
        aulas_tipo.append(nom)
Aulas[pi] = aulas_tipo
aulas_tipo = []

#for aul in ["E", "D", "C", "B"]:
#    for s in ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19"]:
#        nom = aul + s
#        aulas_tipo.append(nom)
#Aulas[lab] = aulas_tipo
#aulas_tipo = []
Master = "Aulas Teoría Máster y 4to"
Aulas[Master] = ["C16","C17","C18","C19"]
Camara_climatica = "Camara_climatica"
Aulas[Camara_climatica] = ["AS07"]
Renovables = "Energias renovables"
Aulas[Renovables] = ["AS08"]
F_aditiva = "Fabricación aditiva"
Aulas[F_aditiva] = ["AS09"]
Leem = "Aeroestructuras y LEEM"
Aulas[Leem] = ["AS10"]
M_electricas = "Máquinas electricas"
Aulas[M_electricas] = ["A12"]
Metrologia = "Laboratorio de Metrologia"
Aulas[Metrologia] = ["A14", "AS01"]
Metro_electrica = "Metrologia electrica y calibracion"
Aulas[Metro_electrica] = ["A16"]
Fisica_lab = "Laboratorio de fisica"
Aulas[Fisica_lab] = ["B11", "B12"]
Quimica_lab = "Laboratorio de Quimica"
Aulas[Quimica_lab] = ["B13"]
Termica_lab = "Lab de Ingenieria Termina"
Aulas[Termica_lab] = ["B14"]
Corrosion_lab = "Laboratorio de corrosion"
Aulas[Corrosion_lab] = ["B15"]
Materiales_lab = "Laboratorio de materiales"
Aulas[Materiales_lab] = ["B16", "B19", "C13", "A04"]
Diseno_lab = "Taller de diseño"
Aulas[Diseno_lab] = ["B17"]
Exp_artistica = "Expresion artistica"
Aulas[Exp_artistica] = ["B18"]
Microelectronico = "lab de diseno microelectronico"
Aulas[Microelectronico] = ["C11"]
Mecanica_lab = "Laboratorio de Mecánica"
Aulas[Mecanica_lab] = ["C12", "A03"]
Gapsis = "Laboratorio GAPSIS"
Aulas[Gapsis] = ["C14"]
Electricidad_lab = "Laboratorio de electricidad"
Aulas[Electricidad_lab] = ["C15", "A02"]
Robotica_lab = "Laboratorio de robotica"
Aulas[Robotica_lab] = ["D12", "D13"]
ParalelDistrib = "Laboratorio de Paralelas y distribuida"
Aulas[ParalelDistrib] = ["D14", "D15"]
DisenoAsistido = "Laboratorio de diseño asistido"
Aulas[DisenoAsistido] = ["D16", "D17"]
Simulacion_lab = "Laboratorio de simulacion"
Aulas[Simulacion_lab] = ["D18", "D19"]
Electronica_lab = "Laboratorio de electronica"
Aulas[Electricidad_lab] = ["E11", "E12"]
Nav_aerea = "Navegacion aerea, avionica y telecomunicaciones"
Aulas[Nav_aerea] = ["E13"]
Computadores_lab = "Laboratorio de computadores"
Aulas[Computadores_lab] = ["E15", "E16"]
Redes_lab = "Laboratorio de redes"
Aulas[Redes_lab] = ["E14"]
Regulacion_lab = "Laboratorio de regulacion"
Aulas[Regulacion_lab] = ["E17"]
Automatizacion_lab = "Laboratorio de automatizacion y domotica"
Aulas[Automatizacion_lab] = ["E18"]
Biomedicina_lab = "Laboratorio de biomedicina"
Aulas[Biomedicina_lab] = ["E19"]
Maquinas_cnc = "Laboratorio de maquinas CNC"
Aulas[Maquinas_cnc] = ["A05"]
Soldadura = "Taller de soldadura"
Aulas[Soldadura] = ["A06"]
Fluidos_lab = "Laboratorio de fluidos"
Aulas[Fluidos_lab] = ["A01"]
SicFm = "Laboratorio de SIC y FM"
Aulas[SicFm] = ["A15", "A17"]
Campo = "Salida de Campo"
Aulas[Campo]=["Campo1"]

 
aulas_tipo = []
for num in range(18):
    if num < 9:
        nom = "F0" + str(num + 1)
    else:
        nom = "F" + str(num + 1)
    aulas_tipo.append(nom)
Aulas[fs] = aulas_tipo

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
MariaEugenia = profesor("Maria Eugenia Cornejo Piñero")
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
InmaculadaRamos = profesor("Inmaculada Concepción Ramon Lerate")
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
AntonioTomeu = profesor("Antonio Jorge Tomeu Hardasmal")
JuanCarlosTorre = profesor("Juan Carlos de la TOrre Macías")
KevinJesus = profesor("Kevin Jesus del Valle")
JuanBoubeta = profesor("Juan Boubeta Puig")
JesusRosa = profesor("Jesus Rosa Bilbao")
JuanFranCabrera = profesor("Juan Francisco Cabrera Sánchez")
PedroDelgado = profesor("Pedro Delgado Pérez")
ElisaGuerrero = profesor("Elisa Guerrero Vázquez")
CarlosRioja = profesor("Carlos Rioja del Rio")
JoseAntonioOrtega = profesor("José Antonio Ortega Pérez")
#Séptima prueba
MariPaz = profesor("María de la Paz Guerrero Lebrero")
GuillermoBar = profesor("Guillermo Bárcena González")
AndresYa = profesor("Andrés Escolano")
Joaquinpiz = profesor("Joaquín Pizarro")
AlejandroCal = profesor("Alejandro Calderón Sanchez")
Nestormora = profesor("Néstor Mora")
BernabeDorronsoro = profesor("Bernabé Dorronsoro")
MiguelBol = profesor("Miguel Ángel Bolivar")
Ivanruiz = profesor("Iván Ruiz")
Andresmunoz = profesor("Andrés Muñoz Ortega")
GuadalupeOrt = profesor("Guadalupe Ortiz Bellot")
ManoloPal = profesor("Manuel Palono")
Juantonicab = profesor("Juan Antonio Caballero")
Juanmadodero = profesor("Juan Manuel Dodero")
JosemariRdrigz = profesor("José María Rodríguez")
PabloTorre = profesor("Pablo de la Torre")
#Octava Prueba
LuisRubio = profesor("Luis Ruibio García")
AlbertoSolis = profesor("Alberto Solis")
FranciscosFndz = profesor("Francisco Fernández")
AntonioLuis = profesor("Antonio Luis Delgado")
PabloMoreno = profesor("Pablo Moreno")
CristobalRuiz= profesor("Cristobal Ruiz")
Alvaroruiz = profesor("Álvaro Ruiz")
#Novena Prueba
SalvadorChulian = profesor("Salvador Chulian Garcia")
AlbertoFndz = profesor("Alberto Fernandez Ros")
SolSaez = profesor("Sol Saez Martinez")
DanielMarin = profesor("Daniel Marin Aragon")
ElenaCabrera = profesor("Elena Cabrera Revuelta")
JDiosLopez = profesor("Juan de Dios Lopez Castro")
JMariaRdgz = profesor("Jose Maria Rodriguez Corral")


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
#Séptima prueba
gii4computacion = curso("4º GII itinerario Computación",giiC)
apc = asignatura("Aprendizaje computacional","SI",gii4computacion)
cc = asignatura("Complejidad Computacional","SI",gii4computacion)
percep = asignatura("Percepción","SI",gii4computacion)
pdellenguaje = asignatura("Procesadores de Lenguaje","SI",gii4computacion)

gii4hardware = curso("4º GII itinerario de Ingeniería de  Computadores",giiC)
adminredes = asignatura("Administración y Seguridad de Computadores","SI",gii4hardware)
acpd = asignatura("Arquitectura de Computadores Paralelos y Distribuidos","SI",gii4hardware)
daac = asignatura("Diseño Avanzado de Arquitectura de Computadores","SI",gii4hardware)
ppd = asignatura("Programación Paralela y Distribuida","SI",gii4hardware)

gii4software = curso("4º GII itinerario Ingeniería del Software",giiC)
calsoft = asignatura("Calidad del Software","SI", gii4software)
dgps = asignatura("Dirección y Gestión de Proyeyctos Software","SI",gii4software)
evosoft = asignatura("Evolución del Software","SI",gii4software)
mps = asignatura("Metodología y Procesos Software","SI",gii4software)

gii4sisinfo = curso("4º GII itinerario de Sistemas de Información",giiC)
adminbd = asignatura("Administración de Bases de Datos","SI",gii4sisinfo)
isi = asignatura("Ingeniería de Sistemas de Información","SI",gii4sisinfo)
recinfo = asignatura("Recuperación de la Información","SI",gii4sisinfo)
tin = asignatura("Tecnologías de Inteligencia de Negocio","SI",gii4sisinfo)

gii4tecinfo = curso("4º  GII itinerario de Tecnologías de la Información",giiC)
calsi = asignatura("Calidad de los Sistemas Informáticos","SI",gii4tecinfo)
iweb = asignatura("Ingenieía Web","SI ",gii4tecinfo)
inet = asignatura("Internet y Negocio Electrónico","SI",gii4tecinfo)
virtsis = asignatura("Virtualización de Sistemas","SI",gii4tecinfo)
#Octava prueba
gia3 = curso("3º GIA",giaC)
aero1 = asignatura("Aoerdinámica I","SI",gia3)
estructaero = asignatura("Estructuras Aeronáuticas","SI",gia3)
prop = asignatura("Fundamentos de Propulsión","SI",gia3)
vibra = asignatura("Mecánica y Vibraciones","NO",gia3)
navaerea = asignatura("Navegación Aérea","SI",gia3)
mataero = asignatura("Materiales Aeroespaciales","SI",gia3)
elemestructaero = asignatura("Elementos Estructurales Aeronáuticos","NO",gia3)
#Novena prueba
gimC = carrera("GIM")
gim1 = curso("1º GIM", gimC)
algYgeoGIM = asignatura("Álgebra y Geometría GIM", "SI", gim1)
calGIM = asignatura("Cálculo GIM", "SI", gim1)
dibujoDigitalGIM = asignatura("Expresión gráfica y Diseño asistido GIM", "SI", gim1)
fis1GIM = asignatura("Física I GIM", "SI", gim1)
informaticaGIM = asignatura("Fundamentos de informática GIM", "SI", gim1)

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
Clases.append(clase("Sistemas Digitales D1 Laboratorio", "Laboratorio", Computadores_lab, 120, "NO", sdig, Blanca))
Clases.append(clase("Sistemas Digitales D3 Laboratorio", "Laboratorio", Computadores_lab, 120, "NO", sdig, Blanca))
Clases.append(clase("Sistemas Digitales D5 Laboratorio", "Laboratorio", Computadores_lab, 120, "NO", sdig, Blanca))
Clases.append(clase("Sistemas Digitales D7 Laboratorio", "Laboratorio", Computadores_lab, 120, "NO", sdig, Blanca))
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
Clases.append(clase("Sistemas Digitales D4 D8 Laboratorio 1", "Laboratorio", Computadores_lab, 120, "NO", sdig2, Miguel))
Clases.append(clase("Sistemas Digitales D4 D8 Laboratorio 2", "Laboratorio", Computadores_lab, 120, "NO", sdig2, Miguel))
Clases.append(clase("Sistemas Digitales D6 Laboratorio", "Laboratorio", Computadores_lab, 120, "NO", sdig2, Miguel))
Clases.append(clase("Sistemas Digitales D2 Laboratorio", "Laboratorio", Computadores_lab, 120, "NO", sdig2, Miguel))
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
Clases.append(clase("AC D1 Laboratorio", "Laboratorio", Computadores_lab, 90, "NO", ac1, Alfonso))
Clases.append(clase("AC D1 Laboratorio Extra", "Laboratorio", Computadores_lab, 90, "NO", ac1, Alfonso))
Clases.append(clase("AC D3 Laboratorio", "Laboratorio", Computadores_lab, 90, "NO", ac1, Alfonso))
Clases.append(clase("AC D3 Laboratorio Extra", "Laboratorio", Computadores_lab, 90, "NO", ac1, Alfonso))
Clases.append(clase("AC D5 Laboratorio", "Laboratorio", Computadores_lab, 90, "NO", ac1, Alfonso))
Clases.append(clase("Redes A1 Teoría B1 Problemas", "Teoría", mp, 90, "SI", rc1, Mercedes))
Clases.append(clase("Redes A1 Teoría B3 Problemas", "Teoría", mp, 90, "SI", rc1, Mercedes))
Clases.append(clase("Redes D1 Laboratorio", "Laboratorio", Redes_lab, 120, "NO", rc1, AnJesus))
Clases.append(clase("Redes D3 Laboratorio", "Laboratorio", Redes_lab, 120, "NO", rc1, AnJesus))
Clases.append(clase("Redes D5 Laboratorio", "Laboratorio", Redes_lab, 120, "NO", rc1, AnJesus))
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
Clases.append(clase("AC D2 Laboratorio", "Laboratorio", Computadores_lab, 90, "NO", ac2, Alfonso))
Clases.append(clase("AC D2 Laboratorio Extra", "Laboratorio", Computadores_lab, 90, "NO", ac2, Alfonso))
Clases.append(clase("AC D4 Laboratorio", "Laboratorio", Computadores_lab, 90, "NO", ac2, Alfonso))
Clases.append(clase("AC D6 Laboratorio", "Laboratorio", Computadores_lab, 90, "NO", ac2, Alfonso))
Clases.append(clase("Redes A2 Teoría", "Teoría", mp, 90, "SI", rc2, Mercedes))
Clases.append(clase("Redes A2 Teoría B2 Problemas", "Teoría", mp, 90, "SI", rc2, Mercedes))
Clases.append(clase("Redes D2 Laboratorio", "Laboratorio", Redes_lab, 120, "NO", rc2, AnJesus))
Clases.append(clase("Redes D4 Laboratorio", "Laboratorio", Redes_lab, 120, "NO", rc2, AnJesus))
Clases.append(clase("Redes D6 Laboratorio", "Laboratorio", Redes_lab, 120, "NO", rc2, AnJesus))
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
Clases.append(clase("FIS1 D3 D4 Laboratorio", "Laboratorio", Fisica_lab, 120, "NO", fis1, AguedaVazquez))
Clases.append(clase("FIS1 D1 D2 Laboratorio", "Laboratorio", Fisica_lab, 120, "NO", fis1, AguedaVazquez))
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
Clases.append(clase("Quimica D1 Laboratorio", "Laboratorio", Quimica_lab, 60, "NO", qui, JuanCarlosGarcia))
Clases.append(clase("Quimica D3 Laboratorio", "Laboratorio", Quimica_lab, 60, "NO", qui, JuanCarlosGarcia))
Clases.append(clase("Quimica D2 Laboratorio", "Laboratorio", Quimica_lab, 60, "NO", qui, MiriamInmaculada))
Clases.append(clase("Quimica D4 Laboratorio", "Laboratorio", Quimica_lab, 60, "NO", qui, MiriamInmaculada))
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
Clases.append(clase("Mecánica de Fluidos I D1 D3 Laboratorio","Laboratório", Fluidos_lab, 120,"NO",flu1gia,Miguelfosa))
Clases.append(clase("Mecánica de Fluidos I D2 D$ Laboratorio","Laboratório", Fluidos_lab, 120,"NO",flu1gia,Miguelfosa))
Clases.append(clase("Mecánica de Fluidos I D5 D6 Laboratorio","Laboratório", Fluidos_lab, 120,"NO",flu1gia,Miguelfosa))
Clases.append(clase("Ciencia e Ingeniería de Materiales A1 Teoría 1","Teoría",mg,120,"SI",mategia,DanielAraujo))
Clases.append(clase("Ciencia e Ingeniería de Materiales A1 Teoría 2","Teoría",mg,120,"SI",mategia,DanielAraujo))
Clases.append(clase("Ciencia e Ingeniería de Materiales B1 Problemas","Problemas",mg,60,"NO",mategia,DanielFernandez))
Clases.append(clase("Ciencia e Ingeniería de Materiales B2 Problemas","Problemas",mg,60,"NO",mategia,DanielFernandez))
Clases.append(clase("Ciencia e Ingeniería de Materiales D1 D3 Laboratorio","Laboratorio",Materiales_lab,120,"NO",mategia,MarinaGutierrez))
Clases.append(clase("Ciencia e Ingeniería de Materiales D2 D4 Laboratorio","Laboratorio",Materiales_lab,120,"NO",mategia,MarinaGutierrez))
Clases.append(clase("Electricidad A1 Teoría 1","Teoría",sem,60,"SI",elecgia,Juantonipal))
Clases.append(clase("Electricidad A1 Teoría 2","Teoría", mg, 120, "SI",elecgia,Juantonipal))
Clases.append(clase("ELectricidad B1 Problemas","Problemas", sem, 60,"NO",elecgia,Joseramsaenz))
Clases.append(clase("ELectricidad B2 Problemas","Problemas", sem, 60,"NO",elecgia,Joseramsaenz))
Clases.append(clase("Electricidad D1 Laboratorio","Laboratorio",Electricidad_lab,120,"NO", elecgia,Juantonipal))
Clases.append(clase("Electricidad D2 Laboratorio","Laboratorio",Electricidad_lab,120,"NO", elecgia, Joseramsaenz))
Clases.append(clase("Electricidad D3 Laboratorio","Laboratorio",Electricidad_lab,120,"NO", elecgia, Juantonipal))
Clases.append(clase("Electricidad D4 Laboratorio","Laboratorio",Electricidad_lab,120,"NO", elecgia, Joseramsaenz))
#Sexta Prueba 3º GII
Clases.append(clase("Diseño de Algoritmos A1 Teoría","Teoría",sem,90,"SI",disalg,AlfredoSnchz))
Clases.append(clase("Diseño de Algoritmos A2 Teoría","Teoría",sem,90,"SI",disalg,Leopoldo))
Clases.append(clase("Diseño de Algoritmos B1 Problemas","Problemas",sem,60,"NO",disalg,AlfredoSnchz))
Clases.append(clase("Diseño de Algoritmos B2 Problemas","Problemas",sem,60,"NO",disalg,AlfredoSnchz))
Clases.append(clase("Diseño de Algoritmos B3 Problemas","Problemas",sem,60,"NO",disalg,Leopoldo))
Clases.append(clase("Diseño de Algoritmos B4 Problemas","Problemas",sem,60,"NO",disalg,Leopoldo))
Clases.append(clase("Diseño de Algoritmos C1 Prácticas","Prácticas",pi,150,"NO",disalg,AlfredoSnchz))
Clases.append(clase("Diseño de Algoritmos C2 Prácticas","Prácticas",pi,150,"NO",disalg,PacoPalomo))
Clases.append(clase("Diseño de Algoritmos C3 Prácticas","Prácticas",pi,150,"NO",disalg,Leopoldo))
Clases.append(clase("Diseño de Algoritmos C4 Prácticas","Prácticas",pi,150,"NO",disalg,AlfredoSnchz))
Clases.append(clase("Diseño de Algoritmos C5 Prácticas","Prácticas",pi,150,"NO",disalg,PedroFdz))
Clases.append(clase("Diseño de Algoritmos C6 Prácticas","Prácticas",pi,150,"NO",disalg,PedroFdz))
Clases.append(clase("Diseño de Algoritmos C7 Prácticas","Prácticas",pi,150,"NO",disalg,PacoPalomo))
Clases.append(clase("Programación Concurrente y de Tiempo Real A1 Teoria","Teoría",mp,90,"SI",pctr,KevinJesus))
Clases.append(clase("Programación Concurrente y de Tiempo Real A1 Teoria Extra","Teoría",mp,90,"SI",pctr,KevinJesus))
Clases.append(clase("Programación Concurrente y de Tiempo Real A2 Teoria","Teoría",mp,90,"SI",pctr,KevinJesus))
Clases.append(clase("Programación Concurrente y de Tiempo Real A2 Teoria Extra","Teoría",mp,90,"SI",pctr,KevinJesus))
Clases.append(clase("Programación Concurrente y de Tiempo Real B1 Problemas","Problemas",sem,60,"NO",pctr,JuanCarlosTorre))
Clases.append(clase("Programación Concurrente y de Tiempo Real B2 Problemas","Problemas",sem,60,"NO",pctr,JuanCarlosGarcia))
Clases.append(clase("Programación Concurrente y de Tiempo Real B3 Problemas","Problemas",sem,60,"NO",pctr,JuanCarlosGarcia))
Clases.append(clase("Programación Concurrente y de Tiempo Real B4 Problemas","Problemas",sem,60,"NO",pctr,JuanCarlosGarcia))
Clases.append(clase("Programación Concurrente y de Tiempo Real C1 Prácticas","Prácticas",ParalelDistrib,120,"N0",pctr,AntonioTomeu))
Clases.append(clase("Programación Concurrente y de Tiempo Real C2 Prácticas","Prácticas",ParalelDistrib,120,"N0",pctr,AntonioTomeu))
Clases.append(clase("Programación Concurrente y de Tiempo Real C3 Prácticas","Prácticas",ParalelDistrib,120,"N0",pctr,AntonioTomeu))
Clases.append(clase("Programación Concurrente y de Tiempo Real C4 Prácticas","Prácticas",ParalelDistrib,120,"N0",pctr,AntonioTomeu))
Clases.append(clase("Programación Concurrente y de Tiempo Real C5 Prácticas","Prácticas",ParalelDistrib,120,"N0",pctr,AntonioTomeu))
Clases.append(clase("Programación Concurrente y de Tiempo Real C6 Prácticas","Prácticas",ParalelDistrib,120,"N0",pctr,AntonioTomeu))
Clases.append(clase("Seguridad en los Sistemas Infomáticos A1 Teoría","Teoría", mg, 120,"SI",ssi,JuanBoubeta))
Clases.append(clase("Seguridad en los Sistemas Infomáticos A1 Teoría extra","Teoría", mg, 120,"SI",ssi,JuanBoubeta))
Clases.append(clase("Seguridad en los Sistemas Informáticos C1 Prácticas","Prácticas",ParalelDistrib,150,"NO",ssi,JuanBoubeta))
Clases.append(clase("Seguridad en los Sistemas Informáticos C2 Prácticas","Prácticas",ParalelDistrib,150,"NO",ssi,JuanBoubeta))
Clases.append(clase("Seguridad en los Sistemas Informáticos C3 Prácticas","Prácticas",ParalelDistrib,150,"NO",ssi,JesusRosa))
Clases.append(clase("Seguridad en los Sistemas Informáticos C4 Prácticas","Prácticas",ParalelDistrib,150,"NO",ssi,JesusRosa))
Clases.append(clase("Inteligencia Artificial A1 Teoría","Teoría",mp,90,"SI",ia,ElisaGuerrero))
Clases.append(clase("Inteligencia Artificial A1 Teoría Extra","Teoría",mp,90,"SI",ia,ElisaGuerrero))
Clases.append(clase("Inteligencia Artificial B1 Problemas","Problemas", sem, 60,"NO", ia,JuanFranCabrera))
Clases.append(clase("Inteligencia Artificial B2 Problemas","Problemas", sem, 60,"NO", ia,JuanFranCabrera))
Clases.append(clase("Inteligencia Artificial C1 Prácticas","Prácticas",pi,120,"NO",ia,PedroDelgado))
Clases.append(clase("Inteligencia Artificial C2 Prácticas","Prácticas",pi,120,"NO",ia,PedroDelgado))
Clases.append(clase("Inteligencia Artificial C3 Prácticas","Prácticas",pi,120,"NO",ia,PedroDelgado))
Clases.append(clase("Inteligencia Artificial C4 Prácticas","Prácticas",pi,120,"NO",ia,PedroDelgado))
Clases.append(clase("Proyectos Informáticos X1 Teorico-Prácticas","Teoría",mp,120,"SI",pinf,CarlosRioja))
Clases.append(clase("Proyectos Informáticos X1 Teorico-Prácticas Extra","Teoría",mp,120,"SI",pinf,CarlosRioja))
Clases.append(clase("Proyectos Informáticos C1 Prácticas","Prácticas",sem,150,"NO",pinf,JoseAntonioOrtega))
Clases.append(clase("Proyectos Informáticos C2 Prácticas","Prácticas",sem,150,"NO",pinf,JoseAntonioOrtega))
Clases.append(clase("Proyectos Informáticos C3 Prácticas","Prácticas",sem,150,"NO",pinf,JoseAntonioOrtega))
#Séptima Prueba 4º GII(TODOS LOS ITINERARIOS)
Clases.append(clase("Complejidad Computacional A1 Teoría","Teoría",Master,90,"SI",cc,Gabriel))
Clases.append(clase("Complejidad Computacional B1 Problemas","Problemas",Master,60,"NO",cc,PacoPalomo))
Clases.append(clase("Complejidad Computacional B1 Problemas Extra 1","Problemas",Master,150,"NO",cc,PacoPalomo))
Clases.append(clase("Complejidad Computacional A1 Problemas Extra 2","Problemas",Master,120,"NO",cc,PacoPalomo))
Clases.append(clase("Complejidad Computacional C1 Prácticas","Prácticas",Master,120,"NO",cc,Gabriel))
Clases.append(clase("Procesadores del Lenguaje A1/B1 Teoria/Problemas","Teoría",Master,120,"SI",pdellenguaje,MariPaz))
Clases.append(clase("Procesadores del Lenguaje A1 Teoria Extra 1","Teoría",Master,120,"SI",pdellenguaje,MariPaz))
Clases.append(clase("Procesadores del Lenguaje A1 Teoria Extra 2","Teoría",Master,120,"SI",pdellenguaje,MariPaz))
Clases.append(clase("Procesadores del Lenguaje C1 Prácticas","Prácticas",pi,150,"NO",pdellenguaje,MariPaz))
Clases.append(clase("Aprendizaje Computacional A1 Teoría","Teoría",Master,120,"SI",apc,Joaquinpiz))
Clases.append(clase("Aprendizaje Computacional C1 Prácticas","Prácticas",Master,180,"NO",apc,Joaquinpiz))
Clases.append(clase("Aprendizaje Computacional C1 Prácticas Extra","Prácticas",Master,180,"NO",apc,Joaquinpiz))
Clases.append(clase("Percepción A1 Teoría","Teoría",pi,120,"SI",percep,AndresYa))
Clases.append(clase("Percepción C1 Prácticas","Prácticas",pi,180,"NO",percep,GuillermoBar))

Clases.append(clase("Arquitectura de Computadores Paralelos y Distribuidos A1 Teoría","Teoría",Computadores_lab,90,"SI",acpd,Alfonso))
Clases.append(clase("Arquitectura de Computadores Paralelos y Distribuidos A1/B1 Teoría/Problemas","Teoría",Computadores_lab,90,"SI",acpd,Alfonso))
Clases.append(clase("Arquitectura de Computadores Paralelos y Distribuidos D1 Prácticas de laboratoio","Prácticas",Redes_lab,90,"NO",acpd,Alfonso))
Clases.append(clase("Administración y Seguridad de Redes de Computadores A1 Teoría","Teoría",Master,120,"SI",adminredes,JoseAntonioOrtega))
Clases.append(clase("Administración y Seguridad de Redes de Computadores B1 Problemas","Problemas",Master,150,"NO",adminredes,CarlosRioja))
Clases.append(clase("Administración y Seguridad de Redes de Computadores C1 Prácticas","Prácticas",ParalelDistrib,150,"NO",adminredes,CarlosRioja))
Clases.append(clase("Diseño Avanzado de Arquitectura de Computadores A1 Teoría","Teoría",Master,120,"SI",daac,Nestormora))
Clases.append(clase("Diseño Avanzado de Arquitectura de Computadores A1/B1 Teoría/Problemas","Teoría",Master,120,"SI",daac,Nestormora))
Clases.append(clase("Diseño Avanzado de Arquitectura de Computadores B1 Problemas","Problemas",Master,150,"NO",daac,Nestormora))
Clases.append(clase("Diseño Avanzado de Arquitectura de Computadores D1 Prácticas","Prácticas",Electricidad_lab,120,"NO",daac,Nestormora))
Clases.append(clase("Diseño Avanzado de Arquitectura de Computadores D1 Prácticas Extra","Prácticas",Electricidad_lab,150,"NO",daac,Nestormora))
Clases.append(clase("Programación Paralela y Distribuida A1/C1 Teoría/Prácticas","Teoría",ParalelDistrib,270,"SI",ppd,BernabeDorronsoro))
Clases.append(clase("Programación Paralela y Distribuida C1 Prácticas Extra","Prácticas",ParalelDistrib,180,"NO",ppd,JuanCarlosTorre))

Clases.append(clase("Calidad del Software A1 Teoría","Teoría",Master,120,"SI",calsoft,Mercedes))
Clases.append(clase("Calidad del Software B1 Problemas","Problemas",Master,150,"NO",calsoft,AlejandroCal))
Clases.append(clase("Calidad del Software C1 Prácticas","Prácticas",Master,150,"NO",calsoft,AlejandroCal))
Clases.append(clase("Evolución del Software A1/B1 Teoría/Problemas","Teoría",Master,120,"SI",evosoft,AlejandroCal))
Clases.append(clase("Evolución del Software A1/B1 Teoría/Problemas Extra","Teoría",Master,180,"SI",evosoft,AlejandroCal))
Clases.append(clase("Evolución del Software C1 Prácticas","Prácticas",Master,180,"NO",evosoft,Nuria))
Clases.append(clase("Metodologías y Procesos Software A1/B1 Teoría/Problemas","Teoría",Master,120,"SI",mps,AlejandroCal))
Clases.append(clase("Metodologías y Procesos Software A1 Teoría Extra","Teoría",Master,120,"SI",mps,AlejandroCal))
Clases.append(clase("Metodologías y Procesos Software C1 Prácticas informáticas","Prácticas",Master,120,"NO",mps,Elena))
Clases.append(clase("Dirección y Gestión de Proyectos Software A1 Teoría","Teoría",Master,120,"SI",dgps,Mercedes))
Clases.append(clase("Dirección y Gestión de Proyectos Software B1 Problemas","Problemas",Master,120,"NO",dgps,Mercedes))
Clases.append(clase("Dirección y Gestión de Proyectos Software C1 Prácticas","Prácticas",Master,180,"NO",dgps,Mercedes))

Clases.append(clase("Recuperación de la Información A1 Teoría","Teoría",sem,120,"SI",recinfo,Andresmunoz))
Clases.append(clase("Recuperación de la Información A1 Teoría Extra","Teoría",Master,120,"SI",recinfo,Andresmunoz))
Clases.append(clase("Recuperación de la Información C1 Prácticas Informáticas","Prácticas",pi,120,"NO",recinfo,JesusRosa))
Clases.append(clase("Tecnologías de Inteligencia de Negocio A1/B1 Teoría/Problemas","Teoría",Master,120,"SI",tin,Ivanruiz))
Clases.append(clase("Tecnologías de Inteligencia de Negocio A1 Teoría Extra","Teoría",Master,180,"SI",tin,Ivanruiz))
Clases.append(clase("Tecnologías de Inteligencia de Negocio  C1 Prácticas informáticas","Prácticas",Master,150,"NO",tin,MiguelBol))  
Clases.append(clase("Ingeniería de Sistemas de Información A1/C1 Teoría/Prácticas","Teoría",Master,270,"SI",isi,GuadalupeOrt))
Clases.append(clase("Administración de Bases de Datos A1 Teoría","Teoría",pi,150,"SI",adminbd,ManoloPal))
Clases.append(clase("Administración de Bases de Datos A1 Teoría Extra","Teoría",pi,150,"SI",adminbd,ManoloPal))
Clases.append(clase("Administración de Bases de Datos C1 Prácticas","Prácticas",pi,150,"NO",adminbd,Andresmunoz))
Clases.append(clase("Administración de Bases de Datos C1 Prácticas Extra","Prácticas",Master,150,"NO",adminbd,Andresmunoz))

Clases.append(clase("Virtualización de Sistemas A1 Teoría","Teoría",Master,120,"SI",virtsis,Juantonicab))
Clases.append(clase("Virtualización de Sistemas A1 Teoría Extra","Teoría",mp,120,"SI",virtsis,Juantonicab))
Clases.append(clase("Virtualización de Sistemas D1 Prácticas de Laboratorio","Prácticas",sem,150,"NO",virtsis,Juanmadodero))
Clases.append(clase("Virtualización de Sistemas D2 Prácticas de Laboratorio","Prácticas",sem,150,"NO",virtsis,Juanmadodero))
Clases.append(clase("Internet y Negocio Electrónico A1 Teoría","Teoría",sem,120,"SI",inet,PabloTorre))
Clases.append(clase("Internet y Negocio Electrónico A1 Teoría Extra","Teoría",sem,120,"SI",inet,PabloTorre))
Clases.append(clase("Internet y Negocio Electrónico C1 Prácticas Infórmáticas","Prácticas",sem,150,"NO",inet,JosemariRdrigz))
Clases.append(clase("Internet y Negocio Electrónico C2 Prácticas Infórmáticas","Prácticas",sem,150,"NO",inet,JosemariRdrigz))
Clases.append(clase("Ingeniería Web A1 Teoría","Teoría",sem,120,"SI",iweb,Ivanruiz))
Clases.append(clase("Ingeniería Web A1 Teoría Extra","Teoría",sem,120,"SI",iweb,Ivanruiz))
Clases.append(clase("Ingeniería Web C1 Prácticas Informáticas","Prácticas",pi,150,"NO",iweb,Ivanruiz))
Clases.append(clase("Ingeniería Web C2 Prácticas Informáticas","Prácticas",pi,150,"NO",iweb,Ivanruiz))
Clases.append(clase("Calidad de los Sistemas Informáticos A1 Teoría","Teoría",sem,120,"SI",calsi,AndresYa))
Clases.append(clase("Calidad de los Sistemas Informáticos A1 Teoría Extra","Teoría",sem,120,"SI",calsi,AndresYa))
Clases.append(clase("Calidad de los Sistemas Informáticos C1 Prácticas","Prácticas",sem,150,"NO",calsi,PabloTorre))
Clases.append(clase("Calidad de los Sistemas Informáticos C2 Prácticas","Prácticas",sem,150,"NO",calsi,PabloTorre))
#Octava Prueba
Clases.append(clase("Navegación Aérea X1 Teórico/Práctica 1","Teoría",sem,120,"SI",navaerea,AntonioLuis))
Clases.append(clase("Navegación Aérea X1 Teórico/Práctica 2","Teoría",sem,60,"SI",navaerea,AntonioLuis))
Clases.append(clase("Navegación Aérea X1 Teórico/Práctica Extra","Teoría",sem,150,"SI",navaerea,AntonioLuis))
Clases.append(clase("Navegación Aérea D1/D3","Prácticas",Nav_aerea,150,"NO",navaerea,PabloMoreno))
Clases.append(clase("Navegación Aérea D2/D4","Prácticas",Nav_aerea,150,"NO",navaerea,PabloMoreno))
Clases.append(clase("Navegación Aérea D5/D6","Prácticas",Nav_aerea,150,"NO",navaerea,PabloMoreno))
Clases.append(clase("Navegación Aérea D7","Prácticas",Nav_aerea,150,"NO",navaerea,PabloMoreno))
Clases.append(clase("Aerodinámica X1 Teórico/Práctica 1","Teoría",mp,120,"SI",aero1,Miguelfosa))
Clases.append(clase("Aerodinámica X1 Teórico/Práctica 2","Teoría",mp,120,"SI",aero1,Miguelfosa))
Clases.append(clase("Aerodinámica I D1/D3 Prácticas Laboratorio","Prácticas",Fluidos_lab,120,"NO",aero1,Miguelfosa))
Clases.append(clase("Aerodinámica I D2/D4 Prácticas Laboratorio","Prácticas",Fluidos_lab,120,"NO",aero1,Miguelfosa))
Clases.append(clase("Aerodinámica I D1/D3 Prácticas Laboratorio","Prácticas",Simulacion_lab,120,"NO",aero1,Miguelfosa))
Clases.append(clase("Aerodinámica I D2/D4 Prácticas Laboratorio","Prácticas",Simulacion_lab,120,"NO",aero1,Miguelfosa))
Clases.append(clase("Estructuras Aeronáuticas A1 Teoría 1","Teoría",sem,90,"SI",estructaero,AlbertoSolis))
Clases.append(clase("Estructuras Aeronáuticas A1 Teoría 2","Teoría",sem,90,"SI",estructaero,AlbertoSolis))
Clases.append(clase("Estructuras Aeronáuticas B1  Problemas","Problemas",sem,120,"NO",estructaero,AlbertoSolis))
Clases.append(clase("Estructuras Aeronáuticas C1  Prácticas Informáticas","Prácticas",Simulacion_lab,120,"NO",estructaero,AlbertoSolis))
Clases.append(clase("Estructuras Aeronáuticas C2  Prácticas Informáticas","Problemas",Simulacion_lab,120,"NO",estructaero,AlbertoSolis))
Clases.append(clase("Fundamentos de Propulsión A1 Teoría","Teoría",sem,90,"SI",prop,Alvaroruiz))
Clases.append(clase("Fundamentos de Propulsión B1 Problemas","Problemas",sem,60,"NO",prop,Alvaroruiz))
Clases.append(clase("Fundamentos de Propulsión B2 Problemas","Problemas",sem,60,"NO",prop,Alvaroruiz))
Clases.append(clase("Fundamentos de Propulsión C1 Prácticas Informáticas","Prácticas",pi,120,"NO",prop,Alvaroruiz))
Clases.append(clase("Fundamentos de Propulsión C2 Prácticas Informáticas","Prácticas",pi,120,"NO",prop,Alvaroruiz))
Clases.append(clase("Fundamentos de Propulsión C3 Prácticas Informáticas","Prácticas",pi,120,"NO",prop,Alvaroruiz))
Clases.append(clase("Mecánica y Vibraciones A1 Teoría 1","Teoría",sem,90,"SI",vibra,FranciscosFndz))
Clases.append(clase("Mecánica y Vibraciones A1 Teoría 2","Teoría",sem,90,"SI",vibra,FranciscosFndz))
Clases.append(clase("Mecánica y Vibraciones B1 Problemas","Problemas",sem,90,"SI",vibra,FranciscosFndz))
Clases.append(clase("Mecánica y Vibraciones B2 Problemas","Problemas",sem,90,"SI",vibra,FranciscosFndz))
Clases.append(clase("Mecánica y Vibraciones C1/C3 Prácticas Informáticas","Prácticas",pi,120,"SI",vibra,FranciscosFndz))
Clases.append(clase("Mecánica y Vibraciones C2 Prácticas Informáticas","Prácticas",pi,120,"NO",vibra,FranciscosFndz))
Clases.append(clase("Mecánica y Vibraciones C1/C3 Prácticas Informáticas","Prácticas",sem,120,"NO",vibra,FranciscosFndz))
Clases.append(clase("Mecánica y Vibraciones D1 Prácticas Laboratorio","Prácticas",Mecanica_lab,120,"NO",vibra,FranciscosFndz))
Clases.append(clase("Mecánica y Vibraciones D2 Prácticas Laboratorio","Prácticas",Mecanica_lab,120,"NO",vibra,FranciscosFndz))
Clases.append(clase("Mecánica y Vibraciones D3 Prácticas Laboratorio","Prácticas",Mecanica_lab,120,"NO",vibra,FranciscosFndz))
Clases.append(clase("Mecánica y Vibraciones D4 Prácticas Laboratorio","Prácticas",Mecanica_lab,120,"NO",vibra,FranciscosFndz))
Clases.append(clase("Elementos Estructurales Aeronáuticos A1/B1 Teoría/Problemas","Teoría",sem,120,"SI",elemestructaero,AlbertoSolis))
Clases.append(clase("Elementos Estructurales Aeronáuticos A1 Teoría","Teoría",sem,90,"SI",elemestructaero,AlbertoSolis))
Clases.append(clase("Elementos Estructurales Aeronáuticos C1 Prácticas Informáticas","Prácticas",Simulacion_lab,120,"NO",elemestructaero,AlbertoSolis))
Clases.append(clase("Materiales Aerospaciales A1 Teoría 1","Teoría",sem,120,"SI",mataero,DanielAraujo))
Clases.append(clase("Materiales Aerospaciales A1 Teoría 2","Teoría",sem,120,"SI",mataero,DanielAraujo))
Clases.append(clase("Materiales Aerospaciales B1 Problemas","Problemas",mp,120,"SI",mataero,LuisRubio))
Clases.append(clase("Materiales Aerospaciales E1 Salidas de campo","Salida de Campo",Campo,240,"NO",mataero,LuisRubio))
#Novena Prueba
Clases.append(clase("AlG A1 Teoría 1", "Teoría", mg, 90, "SI", algYgeoGIM, TamaraMaria))
Clases.append(clase("AlG A1 Teoría 2", "Teoría", mg, 90, "SI", algYgeoGIM, TamaraMaria))
Clases.append(clase("AlG B1 Problemas", "Problemas", sem, 60, "NO", algYgeoGIM, AlbertoFndz))
Clases.append(clase("AlG B2 Problemas", "Problemas", sem, 60, "NO", algYgeoGIM, AlbertoFndz))
Clases.append(clase("AlG C1 Practicas Informaticas", "Prácticas", pi, 120, "NO", algYgeoGIM, SalvadorChulian))
Clases.append(clase("AlG C2 Practicas Informaticas", "Prácticas", pi, 120, "NO", algYgeoGIM, SolSaez))
Clases.append(clase("AlG C3 Practicas Informaticas", "Prácticas", pi, 120, "NO", algYgeoGIM, SolSaez))
Clases.append(clase("CAL A1 Teoría 1", "Teoría", mg, 90, "SI", calGIM, MariaEugenia))
Clases.append(clase("CAL A1 Teoría 2", "Teoría", mg, 90, "SI", calGIM, MariaEugenia))
Clases.append(clase("CAL B1 Problemas", "Problemas", sem, 60, "NO", calGIM, DanielMarin))
Clases.append(clase("CAL B2 Problemas", "Problemas", sem, 60, "NO", calGIM, DanielMarin))
Clases.append(clase("CAL C1 Prácticas informáticas", "Prácticas", pi, 120, "NO", calGIM, MariaEugenia))
Clases.append(clase("CAL C2 Prácticas informáticas", "Prácticas", pi, 120, "NO", calGIM, DanielMarin))
Clases.append(clase("CAL C3 Prácticas informáticas", "Prácticas", pi, 120, "NO", calGIM, DanielMarin))
Clases.append(clase("EG A1 Teoría 1", "Teoría", mg, 90, "SI", dibujoDigitalGIM, ElenaCabrera))
Clases.append(clase("EG A1 Teoría 2", "Teoría", mg, 90, "SI", dibujoDigitalGIM, ElenaCabrera))
Clases.append(clase("EG B1 Problemas", "Problemas", sem, 120, "NO", dibujoDigitalGIM, JDiosLopez))
Clases.append(clase("EG B2 Problemas", "Problemas", sem, 120, "NO", dibujoDigitalGIM, JDiosLopez))
Clases.append(clase("EG C1 C2 Prácticas informáticas", "Prácticas", sem, 120, "NO", dibujoDigitalGIM, ElenaCabrera))
Clases.append(clase("FIS1 A1 Teoría 1", "Teoría", mg, 90, "SI", fis1GIM, JoseLuisCardenas))
Clases.append(clase("FIS1 A1 Teoría 2", "Teoría", mg, 90, "SI", fis1GIM, JoseLuisCardenas))
Clases.append(clase("FIS1 B1 Problemas", "Problemas", sem, 60, "NO", fis1GIM, MariaIsabelEgea))
Clases.append(clase("FIS1 B2 Problemas", "Problemas", sem, 60, "NO", fis1GIM, MariaIsabelEgea))
Clases.append(clase("FIS1 D1 Laboratorio", "Laboratorio", Fisica_lab, 120, "NO", fis1GIM, InmaculadaRamos))
Clases.append(clase("FIS1 D2 Laboratorio", "Laboratorio", Fisica_lab, 120, "NO", fis1GIM, AguedaVazquez))
Clases.append(clase("FIS1 D3 Laboratorio", "Laboratorio", Fisica_lab, 120, "NO", fis1GIM, AguedaVazquez))
Clases.append(clase("FI A1 Teoría", "Teoría", mg, 150, "SI", informaticaGIM, JMariaRdgz))
Clases.append(clase("FI A1 Teoría Extra", "Teoría", mg, 60, "SI", informaticaGIM, JMariaRdgz))
Clases.append(clase("FI C1 Prácticas informáticas", "Prácticas", pi, 120, "NO", informaticaGIM, AlejandroCal))
Clases.append(clase("FI C2 Prácticas informáticas", "Prácticas", pi, 120, "NO", informaticaGIM, AntonioTomeu))
Clases.append(clase("FI C3 Prácticas informáticas", "Prácticas", pi, 120, "NO", informaticaGIM, Eloysa))


#COMIENZAN LAS PRUEBAS
#Primera prueba
Horarios: dict
Horarios={}
gii: dict
gii={}
gii[gii1a.nombre] = [[],[],[],[],[]]
#Segunda prueba
gii[gii1b.nombre] = [[],[],[],[],[]]
#Tercera prueba5
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
#Séptima Prueba
gii[gii4tecinfo.nombre] = [[],[],[],[],[]]
gii[gii4computacion.nombre] = [[],[],[],[],[]]
gii[gii4hardware.nombre] = [[],[],[],[],[]]
gii[gii4sisinfo.nombre] = [[],[],[],[],[]]
gii[gii4software.nombre] = [[],[],[],[],[]]
#Octava Prueba
gia[gia3.nombre] = [[],[],[],[],[]]
#Novena Prueba
gim: dict
gim = {}
gim[gim1.nombre] = [[],[],[],[],[]]

Horarios[giiC.nombre] = gii
Horarios[giaC.nombre] = gia
Horarios[gimC.nombre] = gim

#v1.colocarClases(Clases, Aulas, Horarios)
#v2.colocarClases(Clases, Aulas, Horarios)
#v3.colocarClases(Clases, Aulas, Horarios, 510, 1260, 840, 900)         #Con las franjas del HorarioV2
#v3.colocarClases(Clases, Aulas, Horarios, 510, 1260)                   #Sin descanso (esclavismo)
v3.colocarClases(Clases, Aulas, Horarios,510,1260,849,909)                               #Sin descanso y con clases las 24 horas (crímenes de guerra)
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


