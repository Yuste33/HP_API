import express from 'express';
import bearerToken from 'express-bearer-token';
import { decodeJwt } from './middlewares/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar todas las vistas/routes
import vistaPeliculas from './view/peliculas/index.js';
import vistaPersonajes from './view/personajes/index.js';
import vistaPeliculaPersonaje from './view/peliculasPersonajes/index.js';
import vistaCombate from './view/combate/index.js';
import vistaLogin from './view/login/index.js';

// Configurar __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(express.json());
app.use(bearerToken());
app.use(decodeJwt);

// Servir archivos estáticos - RUTA CORREGIDA (eliminamos el src duplicado)
app.use(express.static(path.join(__dirname, 'public')));

// Todas las rutas manteniendo la estructura original
app.use('/login', vistaLogin);
app.use('/peliculas', vistaPeliculas);
app.use('/personajes', vistaPersonajes);
app.use('/combate', vistaCombate);
app.use('/peliculasPersonajes', vistaPeliculaPersonaje);

// Ruta explícita para el archivo HTML (opcional)
app.get('/web-pruebas.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'web-pruebas.html'));
});

// Ruta principal
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Harry Potter 🔮');
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});