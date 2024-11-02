class carrera:
    def __init__(self, Nombre):
        if not type(Nombre) is str:
            raise TypeError("El tipo del Nombre de la carrera debe ser string")
        self.nombre = Nombre
    
    def mostrar(self):
        print(f"Carrera: {self.nombre}", end = "\n")


class curso:
    def __init__(self, Nombre, Carrera):
        if not type(Nombre) is str:
            raise TypeError("El tipo del Nombre del curso debe ser string")
        if not type(Carrera) is carrera:
            raise TypeError("El tipo de la Carrera debe ser carrera")
        self.nombre = Nombre
        self.carrera = carrera

    def mostrar(self):
        print(f"Curso: {self.nombre} de la carrera {self.carrera.nombre}", end = "\n")

class asignatura:
    def __init__(self, Nombre, Aprobabilidad, Curso):
        if not type(Nombre) is str:
            raise TypeError("El tipo del Nombre de la asignatura debe ser un string")
        if not type(Aprobabilidad) is str:
            raise TypeError("El tipo de la Aprobabilidad debe ser un string")
        if not type(Curso) is curso:
            raise TypeError("El tipo del Curso debe ser curso")
        self.nombre = Nombre
        self.curso = Curso
        if Aprobabilidad == "SI":
            self.aprobable = False
        else:
            self.aprobable = True

    def mostrar(self):
        print(f"Asignatura: {self.nombre} del curso {self.curso.nombre} de la carrera {self.curso.carrera.nombre}", end = "\n")
        if self.aprobable:
            print("Aprobable")
        else:
            print("Poco aprobable")

class aula:
    def __init__(self, Nombre, Tipo):
        if not type(Nombre) is str:
            raise TypeError("El tipo del Nombre del aula debe ser un string")
        if not type(Tipo) is str:
            raise TypeError("El tipo del Tipo del aula debe ser un string")
        self.nombre = Nombre
        self.tipo = Tipo

    def mostrar(self):
        print(f"Aula: {self.nombre} de tipo {self.tipo}", end = "\n")

class profesor:
    def __init__(self, Nombre):
        if not type(Nombre) is str:
            raise TypeError("El tipo del Nombre del profesor debe ser un string")
        self.nombre = Nombre

    def mostrar(self):
        print(f"Profesor: {self.nombre}", end = "\n")

class clase:
    def __init__(self, Nombre, Tipo, Tipo_aula, Duracion, Importante, Asignatura, Profesor):
        if not type(Nombre) is str:
            raise TypeError("El tipo del Nombre de la clase debe ser un string")
        if not type(Tipo) is str:
            raise TypeError("El tipo del Tipo de la clase debe ser un string")
        if not type(Tipo_aula) is str:
            raise TypeError("El tipo del Tipo_aula de la clase debe ser un string")
        if not type(Duracion) is int:
            raise TypeError("El tipo de la Duración de la clase debe ser un entero")
        if Duracion < 60:
            raise ValueError("La duración de la clase no puede ser inferior a 1 hora")
        if not type(Importante) is str:
            raise TypeError("El tipo de Importante de la clase debe ser un string")
        if not type(Asignatura) is asignatura:
            raise TypeError("El tipo de la Asignatura de la clase debe ser una asignatura")
        if not type(Profesor) is str:
            raise TypeError("El tipo de Profesor de la clase debe ser un profesor")
        
        self.nombre = Nombre
        self.tipo = Tipo
        self.tipo_aula = Tipo_aula
        self.duracion = Duracion
        if Importante == "SI":
            self.importante = True
        else:
            self.importante = False
        self.asignatura = Asignatura
        self.profesor = profesor

    def mostrar(self):
        print(f"Clase: {self.nombre} de la asignatura {self.asignatura.nombre} del curso {self.asignatura.curso.nombre} de la carrera {self.asignatura.curso.carrera.nombre}", end = "\n")
        print(f"El tipo del aula es {self.tipo} y necesita un aula de tipo {self.tipo_aula}. Tambien tiene una duracion de {self.duracion} y ", end = "")
        if self.importante:
            print("es importante", end = "\n")
        else:
            print("no es tan importante", end = "\n")

class c_horario:
    def __init__(self, Clase, H_ini, H_fin, Aula):
        if not type(Clase) is clase:
            raise TypeError("El tipo de la Clase de c_horario debe ser clase")
        if not type(H_ini) is int:
            raise TypeError("El tipo de H_ini de c_horario debe ser int")
        if not type(H_fin) is int:
            raise TypeError("El tipo de H_fin de c_horario debe ser int")
        
        self.clase = Clase
        self.h_ini = H_ini
        self.h_fin = H_fin
        self.aula = Aula
    
    def mostrar(self):
        self.clase.mostrar()
        print(f"Hora de inicio: {self.h_ini}, y hora de fin: {self.h_fin}", end = "\n")
