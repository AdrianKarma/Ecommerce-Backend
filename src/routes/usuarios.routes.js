const { Router } = require('express')
const { registrarUsuario } = require('../controllers/usuarios.controllers')
const router = Router()

router.post('/', registrarUsuario)
router.get('/', obtenerTodosLosUsuarios)
router.get('/:idUsuario', obtenerUnUsuario)



module.exports = router