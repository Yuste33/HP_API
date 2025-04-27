'use strict';

import { Router } from 'express';
import LoginController from '../../controllers/login/index.js';

const router = Router();

router.post('/', (req, res) => {
    const { login, password } = req.body;
    const token = LoginController.login(login, password);

    if (!token) {
        return res.status(401).send('Login incorrecto');
    }

    res.send({ token });
});

export default router;
