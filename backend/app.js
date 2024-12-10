import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cors({
    // Todos los origenes
    origin: 'http://www.sched4all.site',
    credentials: true
}))
app.options('*', cors())
app.disable('x-powered-by')
app.use(cookieParser())

// Rutas

import { AuthRouter } from './routes/auth.js'
app.use('/api/auth', AuthRouter)

import { PlantillaRouter } from './routes/plantilla.js'
app.use('/api/plantilla', PlantillaRouter)

import { CarreraRouter } from './routes/carrera.js'
app.use('/api/carrera', CarreraRouter)

import { HorarioRouter } from './routes/horario.js'
app.use('/api/horario', HorarioRouter)

import { CursoRouter } from './routes/curso.js'
app.use('/api/curso', CursoRouter)

import { AsignaturaRouter } from './routes/asignatura.js'
app.use('/api/asignatura', AsignaturaRouter)

import { ClaseRouter } from './routes/clase.js'
app.use('/api/clase', ClaseRouter)

import { AulaRouter } from './routes/aula.js'
app.use('/api/aula', AulaRouter)

import { ProfesorRouter } from './routes/profesor.js'
app.use('/api/profesor', ProfesorRouter)

// Error 404
app.use('', (req, res) => {
    res.status(404).json({ message: 'Error 404 Not Found' })
})

// Manejo de errores
import { errorMiddleware } from './middlewares/errorMiddleware.js'
app.use(errorMiddleware)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})