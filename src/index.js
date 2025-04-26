import express from 'express';
import vistaPeliculas from './view/peliculas/index.js';
import vistaPersonajes from './view/personajes/index.js';
//import vistaPeliculasPersonajes from './view/peliculasPersonajes/index.js';

const app = express();
app.use(express.json());

app.use('/peliculas', vistaPeliculas);
app.use('/personajes', vistaPersonajes);
//app.use('/peliculasPersonajes', vistaPeliculasPersonajes);

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Harry Potter 🔮');
});


app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
