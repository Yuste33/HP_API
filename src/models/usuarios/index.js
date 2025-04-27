'use strict';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '../../usuarios.json');

class UsuariosModel {

    loadData() {
        const raw = fs.readFileSync(DATA_PATH);
        return JSON.parse(raw);
    }

    validarUsuario(login, password) {
        const data = this.loadData();
        const passwordHash = crypto.createHash('sha1').update(password).digest('hex');
        return data.usuarios.find(user => user.login === login && user.password === passwordHash);
    }
}

export default new UsuariosModel();
