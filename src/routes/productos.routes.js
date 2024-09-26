const express = require('express')
const { crearProducto, traerTodosLosProductos, traerUnProducto, actualizarUnProducto, eliminarUnProducto, agregarImagenProducto } = require('../controllers/productos.controllers')
const multer = require('../middlewares/multer')
const router = express.Router()


router.post('/', crearProducto)
router.get('/', traerTodosLosProductos)
router.get('/:idProducto', traerUnProducto)
router.put('/:idProductos', actualizarUnProducto)
router.delete('/:idProducto', eliminarUnProducto)
router.post('/agregarImagen/:idProducto', multer.single('imagen'),agregarImagenProducto)

module.exports = router