const { Router } = require('express')
const { registrarUsuario, obtenerTodosLosUsuarios, obtenerUnUsuario, bajaFisicaUsuario, bajaLogicaUsuario, iniciarSesionUsuario } = require('../controllers/usuarios.controllers')
const router = Router()



router.post('/', registrarUsuario)
router.post('/login', iniciarSesionUsuario)
router.get('/', obtenerTodosLosUsuarios)
router.get('/:idUsuario', obtenerUnUsuario)
router.delete('/:idUsuario', bajaFisicaUsuario)
router.put('/:idUsuario', bajaLogicaUsuario)


module.exports = router