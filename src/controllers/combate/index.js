'use strict';

import CombateModel from '../../models/combate/index.js';

class CombateController {

    getPersonaje(id) {
        const personaje = CombateModel.getPersonaje(id);
        if (!personaje) return null;
        return CombateModel.inicializarAtributos(personaje);
    }

    combatir(id1, id2) {
        return CombateModel.combatir(id1, id2);
    }

    actualizarAtributos(id, atributos) {
        return CombateModel.updatePersonaje(id, atributos);
    }
}

export default new CombateController();
