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
  { backgroundColor: "#A2B8FF", textColor: "#000000" }, // Azul pastel
  { backgroundColor: "#FFD966", textColor: "#000000" }, // Amarillo pastel
  { backgroundColor: "#F1A1B8", textColor: "#000000" }, // Rojo oscuro pastel
  { backgroundColor: "#E8A2B3", textColor: "#000000" }, // Vino pastel
  { backgroundColor: "#9D7FBF", textColor: "#000000" }, // Púrpura oscuro pastel
  { backgroundColor: "#A7D8A3", textColor: "#000000" }, // Verde pastel
  { backgroundColor: "#A5D8E3", textColor: "#000000" }, // Cian pastel
  { backgroundColor: "#F9D58D", textColor: "#000000" }, // Naranja dorado pastel
  { backgroundColor: "#F2A380", textColor: "#000000" }, // Naranja quemado pastel
  { backgroundColor: "#B19ACF", textColor: "#000000" }, // Púrpura pastel
  { backgroundColor: "#A5C8E1", textColor: "#000000" }, // Azul cielo pastel
  { backgroundColor: "#A4D6D1", textColor: "#000000" }, // Turquesa pastel
  { backgroundColor: "#F5A7A4", textColor: "#000000" }, // Rojo coral pastel
  { backgroundColor: "#A0B4C1", textColor: "#000000" }, // Azul grisáceo pastel
  { backgroundColor: "#BCC6C0", textColor: "#000000" }, // Gris claro pastel
  { backgroundColor: "#F9E294", textColor: "#000000" }, // Amarillo pastel suave
  { backgroundColor: "#9DDAD1", textColor: "#000000" }, // Verde agua pastel
  { backgroundColor: "#A9C9E8", textColor: "#000000" }, // Azul suave pastel
  { backgroundColor: "#D1A4D9", textColor: "#000000" }, // Lila pastel
  { backgroundColor: "#F6C5B4", textColor: "#000000" }, // Rosa coral pastel
  { backgroundColor: "#A8D8A6", textColor: "#000000" }, // Verde pastel suave
  { backgroundColor: "#B6CFE7", textColor: "#000000" }, // Azul pastel suave
  { backgroundColor: "#C3A4D9", textColor: "#000000" }, // Morado brillante pastel
];

let i = 0

export const HorarioVisual = ({ horario, h_ini, h_fin }) => {
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
            slotMinTime={h_ini} // Hora de inicio
            slotMaxTime={h_fin} // Hora de fin
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