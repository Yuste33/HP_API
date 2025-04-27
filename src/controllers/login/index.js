'use strict';

import jwt from 'jsonwebtoken';
import UsuariosModel from '../../models/usuarios/index.js';

const SECRET = 'harrypotter123'; // Clave secreta para firmar tokens

class LoginController {

    login(login, password) {
        const usuario = UsuariosModel.validarUsuario(login, password);
        if (!usuario) return null;

        const payload = {
            id: usuario.id,
            login: usuario.login
        };

        const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
        return token;
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, SECRET);
        } catch (err) {
            return null;
        }
    }
}

export default new LoginController();
