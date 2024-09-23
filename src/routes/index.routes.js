const { Router } = require('express')
const router = Router()


router.use('/productos', require('./productos.routes'))
//router.use('/usuarios', require('./usuarios.routes'))
//router.use('/categorias', require('./categorias.routes'))


module.exports = router