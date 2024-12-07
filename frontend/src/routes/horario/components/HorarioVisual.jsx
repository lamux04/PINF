import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from "@fullcalendar/core/locales/es"; // Importa el idioma español
import { useEffect, useState } from "react";
import './HorarioVisual.css'

const convertirMinutosAFormatoFullCalendar = (minutos) => {
    const horas = Math.floor(minutos / 60); // Calcula las horas
    const minutosRestantes = minutos % 60; // Calcula los minutos
    const formatoHoras = horas.toString().padStart(2, '0'); // Asegura dos dígitos
    const formatoMinutos = minutosRestantes.toString().padStart(2, '0'); // Asegura dos dígitos
    return `${formatoHoras}:${formatoMinutos}:00`; // Devuelve el formato HH:mm:ss
};

const colores = [
  { backgroundColor: "#3357FF", textColor: "#FFFFFF" }, // Azul
  { backgroundColor: "#FFC300", textColor: "#000000" }, // Amarillo
  { backgroundColor: "#C70039", textColor: "#FFFFFF" }, // Rojo oscuro
  { backgroundColor: "#900C3F", textColor: "#FFFFFF" }, // Vino
  { backgroundColor: "#581845", textColor: "#FFFFFF" }, // Púrpura oscuro
  { backgroundColor: "#28A745", textColor: "#FFFFFF" }, // Verde oscuro
  { backgroundColor: "#17A2B8", textColor: "#FFFFFF" }, // Cian
  { backgroundColor: "#F39C12", textColor: "#FFFFFF" }, // Naranja dorado
  { backgroundColor: "#D35400", textColor: "#FFFFFF" }, // Naranja quemado
  { backgroundColor: "#7D3C98", textColor: "#FFFFFF" }, // Púrpura
  { backgroundColor: "#2E86C1", textColor: "#FFFFFF" }, // Azul cielo
  { backgroundColor: "#1ABC9C", textColor: "#FFFFFF" }, // Turquesa
  { backgroundColor: "#E74C3C", textColor: "#FFFFFF" }, // Rojo coral
  { backgroundColor: "#34495E", textColor: "#FFFFFF" }, // Azul grisáceo
  { backgroundColor: "#95A5A6", textColor: "#000000" }, // Gris claro
  { backgroundColor: "#F7DC6F", textColor: "#000000" }, // Amarillo pastel
  { backgroundColor: "#48C9B0", textColor: "#000000" }, // Verde agua
  { backgroundColor: "#5DADE2", textColor: "#FFFFFF" }, // Azul suave
  { backgroundColor: "#AF7AC5", textColor: "#FFFFFF" }, // Lila
  { backgroundColor: "#F1948A", textColor: "#000000" }, // Rosa coral
  { backgroundColor: "#52BE80", textColor: "#FFFFFF" }, // Verde vibrante
  { backgroundColor: "#7FB3D5", textColor: "#000000" }, // Azul pastel
  { backgroundColor: "#A569BD", textColor: "#FFFFFF" }, // Morado brillante
];

let i = 0

export const HorarioVisual = ({ horario }) => {
    const [eventos, setEventos] = useState([])

    useEffect(() => {
        const eventos = []
        const asignaturas = {}
        for (let carrera of horario.carreras) {
            // if (carrera.nombre !== 'Ingeniería Informática') continue  // COMENTAR ESTO
            if (!carrera.visible) continue
            for (let curso of carrera.cursos) {
                // if (curso.nombre !== '2º') continue  // COMENTAR ESTO
                if (!curso.visible) continue
                for (let asignatura of curso.asignaturas) {
                    if (!asignatura.visible) continue
                    
                    // Extraemos el color
                    if (!asignaturas[asignatura.nombre]) {
                        asignaturas[asignatura.nombre] = colores[i]
                        i = (i + 1) % colores.length
                    }

                    for (let clase of asignatura.clases) {
                        if (!clase.visible) continue
                        const evento = {
                            title: `${asignatura.nombre} - ${clase.tipo} - ${clase.aula}`,
                            daysOfWeek: [clase.clase_gen_dia + 1],
                            startTime: convertirMinutosAFormatoFullCalendar(clase.clase_gen_hinicio),
                            endTime: convertirMinutosAFormatoFullCalendar(clase.clase_gen_hfin),
                            ...asignaturas[asignatura.nombre],
                        }
                        eventos.push(evento)
                    }
                }
            }
        }
        setEventos(eventos)
    }, [horario])

    return (
        <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridWeek"
            weekends={false} // Oculta sábados y domingos
            allDaySlot={false} // Oculta el slot de todo el día
            slotMinTime="08:00:00" // Hora de inicio
            slotMaxTime="21:00:00" // Hora de fin
            headerToolbar={{
                left: '',
                center: '',
                right: '',
            }}
            slotEventOverlap={false}
            expandRows={true}
            events={eventos}
            firstDay={1} // Inicia la semana en lunes
            dayHeaderFormat={{ weekday: "long" }}
            locale={esLocale} // Idioma español
        />
    )
}