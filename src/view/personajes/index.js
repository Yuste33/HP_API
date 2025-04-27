'use strict';

import { Router } from 'express';
import controladorPersonajes from '../../controllers/personajes/index.js';
import { requireAuth } from '../../middlewares/auth.js';

const router = Router();

// GET todos los personajes -> libre
router.get('/', (req, res) => {
    res.send(controladorPersonajes.getAll());
});

// POST nuevo personaje -> protegido
router.post('/', requireAuth, (req, res) => {
    const idNuevo = controladorPersonajes.add(req.body);
    const personaje = controladorPersonajes.getById(idNuevo);
    res.send(personaje);
});

// GET personaje por id -> libre
router.get('/:idPersonaje', (req, res) => {
    const personaje = controladorPersonajes.getById(req.params.idPersonaje);
    if (!personaje) return res.status(404).send('Personaje no encontrado');
    res.send(personaje);
});

// PUT actualizar personaje -> protegido
router.put('/:idPersonaje', requireAuth, (req, res) => {
    const personajeActualizado = controladorPersonajes.update(req.params.idPersonaje, req.body);
    if (!personajeActualizado) return res.status(404).send('Personaje no encontrado');
    res.send(personajeActualizado);
});

// DELETE borrar personaje -> protegido
router.delete('/:idPersonaje', requireAuth, (req, res) => {
    const borrado = controladorPersonajes.remove(req.params.idPersonaje);
    if (!borrado) return res.status(404).send('Personaje no encontrado');
    res.send({ msg: 'Personaje eliminado' });
});

export default router;
