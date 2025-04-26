'use strict';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '../../datos.json');

class CombateModel {

    loadData() {
        const raw = fs.readFileSync(DATA_PATH);
        return JSON.parse(raw);
    }

    saveData(data) {
        fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    }

    getPersonaje(id) {
        const data = this.loadData();
        return data.personajes.find(p => p.id === parseInt(id));
    }

    updatePersonaje(id, nuevosDatos) {
        const data = this.loadData();
        const index = data.personajes.findIndex(p => p.id === parseInt(id));
        if (index === -1) return null;

        data.personajes[index] = { ...data.personajes[index], ...nuevosDatos };
        this.saveData(data);
        return data.personajes[index];
    }

    combatir(id1, id2) {
        const data = this.loadData();
        const p1 = data.personajes.find(p => p.id === parseInt(id1));
        const p2 = data.personajes.find(p => p.id === parseInt(id2));

        if (!p1 || !p2) return null;

        for (let ronda = 0; ronda < 5; ronda++) {
            let ataqueP1 = p1.fuerza + Math.floor(Math.random() * 10) - p2.defensa;
            if (ataqueP1 < 0) ataqueP1 = 0;
            p2.vida -= ataqueP1;

            let ataqueP2 = p2.fuerza + Math.floor(Math.random() * 10) - p1.defensa;
            if (ataqueP2 < 0) ataqueP2 = 0;
            p1.vida -= ataqueP2;
        }

        p1.vida = Math.max(0, p1.vida);
        p2.vida = Math.max(0, p2.vida);

        this.saveData(data);

        return { personaje1: p1, personaje2: p2 };
    }
}

export default new CombateModel();
