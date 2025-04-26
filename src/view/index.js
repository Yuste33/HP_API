'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import rutaPeliculas from './peliculas/index.js'
import rutaPersonajes from './personajes/index.js'

let app = express()

// Middlewares
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

// Acceso a rutas
app.use('/peliculas', rutaPeliculas)
app.use('/personajes', rutaPersonajes)

export function start(port) {
    app.listen(port, () => {
        console.log('API Iniciada en el puerto ' + port)
    })
}
