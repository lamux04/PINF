from Horario import* 
from ClasesProyecto import*

import shutil
import os

with open("aulas.txt") as f: 
    content = f.readlines()  #leer contenido de fichero, lista con elementos=línea de fichero


gii= carrera("GII")
gii1a=curso("1AGII","GII")
B06 = aula("B06", "Seminario")
prof1=profesor("Manolo manolito")
a= asignatura("IG","SI","1AGII")