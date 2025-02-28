const mongoose = require('mongoose');


const getConnection = async () => {

    try {
        const url = "mongodb+srv://nisperuzaarroyojosedomingo:kTotYJgcbNJBMunK@cluster0.qu5v7.mongodb.net/Ing-Web-2?retryWrites=true&w=majority&appName=Cluster0"   

        await mongoose.connect(url);

        console.log('conexion exitosa');

    } catch(error) {
        console.log(error);   
    }
}
    
    module.exports = {
        getConnection,
    }

