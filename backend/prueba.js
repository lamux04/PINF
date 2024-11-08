import { promisePool } from "./db.js"

promisePool.query('SELECT * FROM USUARIO WHERE usu_username = "Lacoometo";').then(([username]) => { console.log(username[0])})

