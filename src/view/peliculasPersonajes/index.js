'use strict';

import { Router } from 'express';
import PeliculaPersonajeController from '../../controllers/peliculaPersonaje/index.js';

const router = Router();

// Middleware de autenticación
router.use((req, res, next) => {
    if (!req.user) {
        return res.status(401).send('No autorizado');
    }
    next();
});

// Obtener personajes que participan en una película
router.get('/peliculas/:idPelicula/personajes', (req, res) => {
    const personajes = PeliculaPersonajeController.getPersonajesByPelicula(req.params.idPelicula);
    res.send(personajes);
});

// Obtener películas en las que aparece un personaje
router.get('/personajes/:idPersonaje/peliculas', (req, res) => {
    const peliculas = PeliculaPersonajeController.getPeliculasByPersonaje(req.params.idPersonaje);
    res.send(peliculas);
});

// Añadir una relación personaje-película
router.post('/peliculas/:idPelicula/personajes/:idPersonaje', (req, res) => {
    const ok = PeliculaPersonajeController.addRelacion(req.params.idPelicula, req.params.idPersonaje);
    if (ok) {
        res.send({ msg: 'Relación añadida' });
    } else {
        res.status(400).send({ msg: 'Relación ya existente o error' });
    }
});

// Eliminar una relación personaje-película
router.delete('/peliculas/:idPelicula/personajes/:idPersonaje', (req, res) => {
    const ok = PeliculaPersonajeController.removeRelacion(req.params.idPelicula, req.params.idPersonaje);
    if (ok) {
        res.send({ msg: 'Relación eliminada' });
    } else {
        res.status(404).send({ msg: 'Relación no encontrada' });
    }
});

export default router;
