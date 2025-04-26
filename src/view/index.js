'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import rutaPeliculas from './peliculas/index.js'
import rutaPersonajes from './personajes/index.js'
import rutaPeliculaPersonaje from './peliculasPersonajes/index.js'
import rutaCombate from './combate/index.js'
//import rutaLogin from './login/index.js'

let app = express()

// Middlewares
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

// Acceso a rutas
app.use('/peliculas', rutaPeliculas)
app.use('/personajes', rutaPersonajes)
app.use('/combate', rutaCombate)
//app.use('/login', rutaLogin)
app.use('/', rutaPeliculaPersonaje)

export function start(port) {
    app.listen(port, () => {
        console.log('API Iniciada en el puerto ' + port)
    })
}
