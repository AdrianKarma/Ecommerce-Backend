const express = require('express')
const { crearProducto, traerTodosLosProductos, traerUnProducto, actualizarUnProducto, eliminarUnProducto, agregarImagenProducto, agregarProductoAlCarrito, borrarProductoDelCarrito, mercadoPago } = require('../controllers/productos.controllers')
const multer = require('../middlewares/multer')
const auth = require('../middlewares/auth')
const router = express.Router()


router.post('/', auth('admin') , crearProducto)
router.get('/', traerTodosLosProductos)
router.get('/:idProducto', traerUnProducto)
router.put('/:idProducto', auth('admin') , actualizarUnProducto)
router.delete('/:idProducto', auth('admin'), eliminarUnProducto)
router.post('/agregarImagen/:idProducto', multer.single('imagen'),agregarImagenProducto)
router.post('/agregarProdCart/:idProducto',  auth('usuario'), agregarProductoAlCarrito)
router.delete('/borrarProdCart/:idProducto', auth('usuario'), borrarProductoDelCarrito)
router.post('/crearPago', mercadoPago)

module.exports = router