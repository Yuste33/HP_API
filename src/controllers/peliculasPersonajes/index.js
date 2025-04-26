'use strict';

import PeliculaPersonajeModel from '../../models/peliculaPersonajeModel.js';

class PeliculaPersonajeController {

    getPersonajesByPelicula(idPelicula) {
        return PeliculaPersonajeModel.getPersonajesByPelicula(idPelicula);
    }

    getPeliculasByPersonaje(idPersonaje) {
        return PeliculaPersonajeModel.getPeliculasByPersonaje(idPersonaje);
    }

    addRelacion(idPelicula, idPersonaje) {
        return PeliculaPersonajeModel.addRelacion(idPelicula, idPersonaje);
    }

    removeRelacion(idPelicula, idPersonaje) {
        return PeliculaPersonajeModel.removeRelacion(idPelicula, idPersonaje);
    }
}

export default new PeliculaPersonajeController();
