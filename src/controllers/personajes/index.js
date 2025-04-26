'use strict';

import PersonajesModel from '../../models/personajes/index.js';

class PersonajesController {

    getAll() {
        return PersonajesModel.getAll();
    }

    getById(id) {
        return PersonajesModel.getById(id);
    }

    add(datos) {
        return PersonajesModel.add(datos);
    }

    update(id, datos) {
        return PersonajesModel.update(id, datos);
    }

    delete(id) {
        return PersonajesModel.remove(id);
    }
}

export default new PersonajesController();
