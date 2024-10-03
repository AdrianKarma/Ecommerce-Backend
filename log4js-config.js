const log4js = require('log4js');

log4js.configure({
    appenders: {
        console: { type: 'console' }, // Imprimir en la consola
        // Puedes agregar otros appenders si lo necesitas
    },
    categories: {
        default: { appenders: ['console'], level: 'info' },
    },
});

const logger = log4js.getLogger();
logger.info('Logger configurado');
module.exports = logger; 