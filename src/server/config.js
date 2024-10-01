require("../database/config");
const express = require('express')
const path = require('path');
const cors = require('cors')
const morgan = require('morgan');
const logger = require('../../log4js-config'); 
class Server {
    constructor() {
            this.app = express()
            this.port = process.env.PORT || 3001
            this.middleware()
            this.routes()
        }



        middleware(){
            this.app.use(express.json())
            this.app.use(express.static(path.join(__dirname, 'src/public')))
            this.app.use(cors())
            this.app.use(morgan('dev'))
        }
    

        routes() {

            this.app.use('/api', require('../routes/index.routes'))
        }
        listen() {
            this.app.listen(this.port, () => {
              logger.info(`Servidor escuchando en el puerto ${this.port}`);
            });
          }
    }


module.exports = Server