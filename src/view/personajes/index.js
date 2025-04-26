'use strict';

import { Router } from 'express';
import controladorPersonajes from '../../controllers/personajes/index.js';

const router = Router();

// Obtener todos los personajes
router.get('/', (req, res) => {
    res.send(controladorPersonajes.getAll());
});

// Crear un nuevo personaje
router.post('/', (req, res) => {
    const idNuevo = controladorPersonajes.add(req.body);
    const personaje = controladorPersonajes.getById(idNuevo);
    res.send(personaje);
});

// Preprocesar idPersonaje (param middleware)
router.param('idPersonaje', (req, res, next, idPersonaje) => {
    const personaje = controladorPersonajes.getById(idPersonaje);
    if (!personaje) {
        return res.status(404).send('Personaje no encontrado');
    }
    req.personaje = personaje;
    next();
});

// Obtener un personaje específico
router.get('/:idPersonaje', (req, res) => {
    res.send(req.personaje);
});

export default router;
