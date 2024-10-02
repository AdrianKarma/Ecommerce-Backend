const express = require('express')
const { crearProducto, traerTodosLosProductos, traerUnProducto, actualizarUnProducto, eliminarUnProducto, agregarImagenProducto, agregarProductoAlCarrito, borrarProductoDelCarrito, mercadoPago } = require('../controllers/productos.controllers')
const multer = require('../middlewares/multer')
const router = express.Router()


router.post('/', crearProducto)
router.get('/', traerTodosLosProductos)
router.get('/:idProducto', traerUnProducto)
router.put('/:idProducto', actualizarUnProducto)
router.delete('/:idProducto', eliminarUnProducto)
router.post('/agregarImagen/:idProducto', multer.single('imagen'),agregarImagenProducto)
router.post('/agregarProdCart/:idProducto', /* auth('usuario'), */agregarProductoAlCarrito)
router.delete('/borrarProdCart/:idProducto', /* auth('usuario'), */ borrarProductoDelCarrito)
router.post('/crearpago', mercadoPago)
module.exports = router