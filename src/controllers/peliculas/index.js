'use strict';

import PeliculasModel from '../../models/peliculas/index.js';

class PeliculasController {

    getAll() {
        return PeliculasModel.getAll();
    }

    getById(id) {
        return PeliculasModel.getById(id);
    }

    add(datos) {
        return PeliculasModel.add(datos);
    }

    update(id, datos) {
        return PeliculasModel.update(id, datos);
    }

    delete(id) {
        return PeliculasModel.remove(id);
    }
}

export default new PeliculasController();
