'use strict';

import { Router } from 'express';
import controladorPeliculas from '../../controllers/peliculas/index.js';

const router = Router();


// Obtener todas las películas
router.get('/', (req, res) => {
    res.send(controladorPeliculas.getAll());
});

// Crear una nueva película
router.post('/', (req, res) => {
    const idNueva = controladorPeliculas.add(req.body);
    const peli = controladorPeliculas.getById(idNueva);
    res.send(peli);
});

// Preprocesar idPelicula (param middleware)
router.param('idPelicula', (req, res, next, idPelicula) => {
    const peli = controladorPeliculas.getById(idPelicula);
    if (!peli) {
        return res.status(404).send('Película no encontrada');
    }
    req.pelicula = peli;
    next();
});

// Obtener una película específica
router.get('/:idPelicula', (req, res) => {
    res.send(req.pelicula);
});

export default router;
