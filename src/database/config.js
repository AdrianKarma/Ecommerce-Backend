const mongoose = require('mongoose');
const logger = require('../../log4js-config');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT);
        logger.info('Conectado a MongoDB'); 
    } catch (error) {
        logger.error('No se pudo conectar a MongoDB:', error); 
        process.exit(1); 
    }
};

connectToDatabase();

module.exports = mongoose;