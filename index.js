const express = require('express');
const cors = require('cors');  // <-- Agregado para evitar errores de CORS
const getConnection = require('./db/connect-mongo');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000; // <-- Asegura que el puerto tenga un valor por defecto

getConnection();

// Configurar CORS para permitir peticiones desde el frontend
app.use(cors({
    origin: 'https://movies-frontend-1sg3.onrender.com', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Definir rutas
app.use('/productora', require('./routes/productora'));
app.use('/director', require('./routes/director'));
app.use('/genero', require('./routes/genero'));
app.use('/tipo', require('./routes/tipo'));
app.use('/media', require('./routes/media'));

// Iniciar servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`);
});
