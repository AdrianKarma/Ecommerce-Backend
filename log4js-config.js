const fs = require('fs');
const path = require('path');
const log4js = require('log4js');

// Ruta para escribir logs en entornos de desarrollo (local)
const logDir = path.resolve(__dirname, 'logs');

// Si el entorno es 'development', verifica si el directorio 'logs' existe y créalo
if (process.env.NODE_ENV === 'development' && !fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Configuración de log4js para diferentes entornos
log4js.configure({
  appenders: {
    console: { type: 'console' },  // Siempre log en consola
    // Si estamos en desarrollo, guardamos también en 'logs/app.log'
    ...(process.env.NODE_ENV === 'development' && {
      file: { type: 'file', filename: path.join(logDir, 'app.log') }
    }),
    // En producción, usamos una ruta temporal segura en Vercel
    ...(process.env.NODE_ENV === 'production' && {
      file: { type: 'file', filename: '/tmp/app.log' }
    })
  },
  categories: {
    default: {
      appenders: process.env.NODE_ENV === 'development'
        ? ['console', 'file'] // En desarrollo, log a consola y archivo
        : ['console'],        // En producción, solo log a consola
      level: 'info'  // Nivel de log
    }
  }
});

const logger = log4js.getLogger();

module.exports = logger;
