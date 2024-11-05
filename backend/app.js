import express from 'express'
import cors from 'cors'

import { aulaRouter } from './routes/aula.js'

const app = express()
app.use(express.json())
app.use(cors())
app.disable('x-powered-by')

app.use('/api/aula', aulaRouter)

app.use('', (req, res) => {
    res.status(404).json({ message: 'Error 404 Not Found' })
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})