require('dotenv').config()
const Server = require('./src/server/config')
const server = new Server()

server.listen()
