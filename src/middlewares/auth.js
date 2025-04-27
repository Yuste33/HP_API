'use strict';

import jwt from 'jsonwebtoken';

const SECRET = 'harrypotter123';

export function decodeJwt(req, res, next) {
    if (req.token) {
        try {
            const decoded = jwt.verify(req.token, SECRET);
            req.user = decoded;
        } catch (err) {
            return res.status(401).send('Token inválido');
        }
    }
    next();
}

export function requireAuth(req, res, next) {
    if (!req.user) {
        return res.status(401).send('No autorizado');
    }
    next();
}
