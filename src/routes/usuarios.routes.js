const { Router } = require('express')
const { registrarUsuario, obtenerTodosLosUsuarios, obtenerUnUsuario, bajaFisicaUsuario, bajaLogicaUsuario, iniciarSesionUsuario } = require('../controllers/usuarios.controllers')
const auth = require('../middlewares/auth')
const router = Router()



router.post('/', registrarUsuario)

router.post('/login', iniciarSesionUsuario)

router.get('/',auth('admin'), obtenerTodosLosUsuarios)

router.get('/:idUsuario',auth('admin'), obtenerUnUsuario)

router.delete('/:idUsuario',auth('admin'), bajaFisicaUsuario)

router.put('/:idUsuario',auth('admin'), bajaLogicaUsuario)


module.exports = router