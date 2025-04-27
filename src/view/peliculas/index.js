'use strict';

import { Router } from 'express';
import controladorPeliculas from '../../controllers/peliculas/index.js';
import { requireAuth } from '../../middlewares/auth.js';

const router = Router();

// GET -> acceso libre
router.get('/', (req, res) => {
    res.send(controladorPeliculas.getAll());
});

// POST -> protegido
router.post('/', requireAuth, (req, res) => {
    const idNueva = controladorPeliculas.add(req.body);
    const peli = controladorPeliculas.getById(idNueva);
    res.send(peli);
});

// GET by id -> acceso libre
router.get('/:idPelicula', (req, res) => {
    const peli = controladorPeliculas.getById(req.params.idPelicula);
    if (!peli) return res.status(404).send('Película no encontrada');
    res.send(peli);
});

// PUT -> protegido
router.put('/:idPelicula', requireAuth, (req, res) => {
    const peliActualizada = controladorPeliculas.update(req.params.idPelicula, req.body);
    if (!peliActualizada) return res.status(404).send('Película no encontrada');
    res.send(peliActualizada);
});

// DELETE -> protegido
router.delete('/:idPelicula', requireAuth, (req, res) => {
    const borrada = controladorPeliculas.remove(req.params.idPelicula);
    if (!borrada) return res.status(404).send('Película no encontrada');
    res.send({ msg: 'Película eliminada' });
});

export default router;
