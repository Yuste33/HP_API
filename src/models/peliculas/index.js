'use strict';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Necesario para poder usar __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '../../datos.json');

class PeliculasModel {

    loadData() {
        const raw = fs.readFileSync(DATA_PATH);
        return JSON.parse(raw);
    }

    saveData(data) {
        fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    }

    getAll() {
        return this.loadData().peliculas;
    }

    getById(id) {
        const peliculas = this.getAll();
        return peliculas.find(p => p.id === parseInt(id));
    }

    getLastId() {
        const peliculas = this.getAll();
        return peliculas.length > 0 ? Math.max(...peliculas.map(p => p.id)) : 0;
    }

    add(datos) {
        const data = this.loadData();
        const newId = this.getLastId() + 1;

        const nueva = {
            id: newId,
            title: datos?.title ?? 'Sin título',
            length: datos?.length ?? 0,
            year: datos?.year ?? 1900,
            sinopsis: datos?.sinopsis ?? ''
        };

        data.peliculas.push(nueva);
        this.saveData(data);
        return newId;
    }

    update(id, datos) {
        const data = this.loadData();
        const index = data.peliculas.findIndex(p => p.id === parseInt(id));
        if (index === -1) return null;

        data.peliculas[index] = { ...data.peliculas[index], ...datos };
        this.saveData(data);
        return data.peliculas[index];
    }

    remove(id) {
        const data = this.loadData();
        const index = data.peliculas.findIndex(p => p.id === parseInt(id));
        if (index === -1) return false;

        data.peliculas.splice(index, 1);
        this.saveData(data);
        return true;
    }
}

export default new PeliculasModel();
