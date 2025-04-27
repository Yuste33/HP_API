'use strict';

import CombateModel from '../../models/combate/index.js';

class CombateController {

    getPersonaje(id) {
        return CombateModel.getPersonaje(id);
    }


    combatir(id1, id2) {
        return CombateModel.combatir(id1, id2);
    }

    actualizarAtributos(id, atributos) {
        return CombateModel.updatePersonaje(id, atributos);
    }
}

export default new CombateController();
