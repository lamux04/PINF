import mysql from 'mysql2'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

const sslCert = fs.readFileSync('/home/lamux/Documentos/Repositorios/PINF/backend/ca.pem')

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: 26547,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        ca: sslCert
    }
})

export const promisePool = pool.promise()