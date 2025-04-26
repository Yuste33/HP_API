'use strict';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Necesario para poder usar __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '../../datos.json');

class PersonajesModel {

    loadData() {
        const raw = fs.readFileSync(DATA_PATH);
        return JSON.parse(raw);
    }

    saveData(data) {
        fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    }

    getAll() {
        return this.loadData().personajes;
    }

    getById(id) {
        const personajes = this.getAll();
        return personajes.find(p => p.id === parseInt(id));
    }

    getLastId() {
        const personajes = this.getAll();
        return personajes.length > 0 ? Math.max(...personajes.map(p => p.id)) : 0;
    }

    add(datos) {
        const data = this.loadData();
        const newId = this.getLastId() + 1;

        const nuevo = {
            id: newId,
            name: datos?.name ?? 'Sin nombre',
            desc: datos?.desc ?? 'Sin descripción'
        };

        data.personajes.push(nuevo);
        this.saveData(data);
        return newId;
    }

    update(id, datos) {
        const data = this.loadData();
        const index = data.personajes.findIndex(p => p.id === parseInt(id));
        if (index === -1) return null;

        data.personajes[index] = { ...data.personajes[index], ...datos };
        this.saveData(data);
        return data.personajes[index];
    }

    remove(id) {
        const data = this.loadData();
        const index = data.personajes.findIndex(p => p.id === parseInt(id));
        if (index === -1) return false;

        data.personajes.splice(index, 1);
        this.saveData(data);
        return true;
    }
}

export default new PersonajesModel();
