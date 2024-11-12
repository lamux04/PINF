import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
app.disable('x-powered-by')

// Rutas
import { aulaRouter } from './routes/aula.js'
app.use('/api/aula', aulaRouter)

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