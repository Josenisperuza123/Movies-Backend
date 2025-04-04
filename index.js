const express = require('express'); const cors = require('cors'); // Importar CORS const connectDB = require('./db/connect-mongo'); // Conexión a MongoDB Atlas require('dotenv').config();

const app = express(); const port = process.env.PORT || 8000; // Puerto por defecto

 app.use(cors());

 app.use(express.json());

connectDB()
 .then(() => console.log('\u2705 Conectado a MongoDB Atlas'))
  .catch(err => console.error('\u274C Error conectando a MongoDB:', err));

app.use('/productora', require('./routes/productora'));
app.use('/director', require('./routes/director')); 
app.use('/genero', require('./routes/genero'));
app.use('/tipo', require('./routes/tipo')); 
app.use('/media', require('./routes/media'));


app.listen(port, () => {
   console.log('\u{1F680} Servidor escuchando en el puerto ${port}'); 
  
  });

