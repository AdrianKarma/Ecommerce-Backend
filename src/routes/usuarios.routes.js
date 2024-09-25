const { Router } = require('express')
const { registrarUsuario, obtenerTodosLosUsuarios, obtenerUnUsuario, bajaFisicaUsuario, bajaLogicaUsuario } = require('../controllers/usuarios.controllers')
const router = Router()



router.post('/', registrarUsuario)
router.get('/', obtenerTodosLosUsuarios)
router.get('/:idUsuario', obtenerUnUsuario)
router.delete('/:idUsuario', bajaFisicaUsuario)
router.put('/:idUsuario', bajaLogicaUsuario)


module.exports = router