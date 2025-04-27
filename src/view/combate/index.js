'use strict';

import { Router } from 'express';
import CombateController from '../../controllers/combate/index.js';
import { requireAuth } from '../../middlewares/auth.js';

const router = Router();

// GET atributos del personaje -> libre
router.get('/:idPersonaje', (req, res) => {
    const personaje = CombateController.getPersonaje(req.params.idPersonaje);
    if (!personaje) return res.status(404).send('Personaje no encontrado');
    res.send(personaje);
});

// POST combatir -> protegido
router.post('/', requireAuth, (req, res) => {
    const { p1, p2 } = req.query;
    if (!p1 || !p2) return res.status(400).send('Faltan personajes');
    const resultado = CombateController.combatir(p1, p2);
    res.send(resultado);
});

// PUT curar/modificar personaje -> protegido
router.put('/:idPersonaje', requireAuth, (req, res) => {
    const actualizado = CombateController.actualizarAtributos(req.params.idPersonaje, req.body);
    if (!actualizado) return res.status(404).send('Personaje no encontrado');
    res.send(actualizado);
});

export default router;
