'use strict';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '../../datos.json');

class PeliculaPersonajeModel {

    loadData() {
        const raw = fs.readFileSync(DATA_PATH);
        return JSON.parse(raw);
    }

    getPersonajesByPelicula(idPelicula) {
        const data = this.loadData();
        const relaciones = data.pelicula_personaje.filter(rel => rel.idPelicula === parseInt(idPelicula));
        const personajes = relaciones.map(rel => data.personajes.find(p => p.id === rel.idPersonaje));
        return personajes;
    }

    getPeliculasByPersonaje(idPersonaje) {
        const data = this.loadData();
        const relaciones = data.pelicula_personaje.filter(rel => rel.idPersonaje === parseInt(idPersonaje));
        const peliculas = relaciones.map(rel => data.peliculas.find(p => p.id === rel.idPelicula));
        return peliculas;
    }

    addRelacion(idPelicula, idPersonaje) {
        const data = this.loadData();

        // Verificar que la relación no exista
        const existe = data.pelicula_personaje.some(
            rel => rel.idPelicula === parseInt(idPelicula) && rel.idPersonaje === parseInt(idPersonaje)
        );

        if (!existe) {
            data.pelicula_personaje.push({
                idPelicula: parseInt(idPelicula),
                idPersonaje: parseInt(idPersonaje)
            });
            fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
            return true;
        }
        return false; // Ya existía
    }

    removeRelacion(idPelicula, idPersonaje) {
        const data = this.loadData();
        const index = data.pelicula_personaje.findIndex(
            rel => rel.idPelicula === parseInt(idPelicula) && rel.idPersonaje === parseInt(idPersonaje)
        );

        if (index !== -1) {
            data.pelicula_personaje.splice(index, 1);
            fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
            return true;
        }
        return false;
    }
}

export default new PeliculaPersonajeModel();
