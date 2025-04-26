import express from 'express';
import vistaPeliculas from './view/peliculas/index.js';
import vistaPersonajes from './view/personajes/index.js';
import vistaPeliculaPersonaje from './view/peliculasPersonajes/index.js';
import vistaCombate from './view/combate/index.js';
import bearerToken from 'express-bearer-token';
import { decodeJwt } from './middlewares/auth.js';
import vistaLogin from './view/login/index.js';


const app = express();
app.use(express.json());

app.use('/peliculas', vistaPeliculas);
app.use('/personajes', vistaPersonajes);
app.use('/combate', vistaCombate);
app.use('/peliculasPersonajes', vistaPeliculaPersonaje);

app.use(bearerToken());  // para capturar el token
app.use(decodeJwt);      // para decodificar y poner req.user

app.use('/login', vistaLogin);

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Harry Potter 🔮');
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
