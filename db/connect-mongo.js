const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        const url = process.env.MONGO_URI; // Ahora usa la variable de entorno
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('✅ Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error);
    }
};

module.exports = { getConnection };
