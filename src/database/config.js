const mongoose = require('mongoose')
require('dotenv').config(); 
try {
    mongoose.connect(process.env.MONGODB_CONNECT)
    .then(()=> console.log('Conectado a MongoDB'))
    .catch(err=> console.log('No se pudo conectar a MongoDB', err))
} catch (error) {
    console.log(error);

}

module.exports= mongoose;