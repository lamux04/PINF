import { promisePool } from "./db.js"

const [rows] = await promisePool.query("SELECT * FROM AULA")
console.log(rows)