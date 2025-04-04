const express = require('express');
const cors = require('cors');  // Importar CORS
const { connect } = require('./db/connect-mongo'); // Conexión a MongoDB Atlas
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000; // Puerto por defecto

// Habilitar CORS para permitir solicitudes desde el frontend
app.use(cors());

// Middleware para recibir JSON
app.use(express.json());

// Conectar a MongoDB Atlas
connect().then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
}).catch((err) => {
    console.error('❌ Error conectando a MongoDB:', err);
});

// Rutas
app.use('/productora', require('./routes/productora'));
app.use('/director', require('./routes/director'));
app.use('/genero', require('./routes/genero'));
app.use('/tipo', require('./routes/tipo'));
app.use('/media', require('./routes/media'));

// Servidor escuchando
app.listen(port, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${port}`);
});
