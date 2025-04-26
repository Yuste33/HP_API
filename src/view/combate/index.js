'use strict';

import { Router } from 'express';
import CombateController from '../../controllers/combate/index.js';

const router = Router();


// Obtener atributos actuales
router.get('/:idPersonaje', (req, res) => {
    const personaje = CombateController.getPersonaje(req.params.idPersonaje);
    if (!personaje) return res.status(404).send('Personaje no encontrado');
    res.send(personaje);
});

// Realizar combate
router.post('/', (req, res) => {
    const { p1, p2 } = req.query;
    if (!p1 || !p2) return res.status(400).send('Faltan personajes para combatir');
    const resultado = CombateController.combatir(p1, p2);
    res.send(resultado);
});

// Actualizar atributos (curación o mejora)
router.put('/:idPersonaje', (req, res) => {
    const actualizado = CombateController.actualizarAtributos(req.params.idPersonaje, req.body);
    if (!actualizado) return res.status(404).send('Personaje no encontrado');
    res.send(actualizado);
});

export default router;
