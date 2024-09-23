const express = require('express')
const { crearProducto, traerTodosLosProductos, traerUnProducto, actualizarUnProducto, eliminarUnProducto } = require('../controllers/productos.controllers')
const router = express.Router()


router.post('/', crearProducto)
router.get('/', traerTodosLosProductos)
router.get('/:idProducto', traerUnProducto)
router.put('/:idProductos', actualizarUnProducto)
router.delete('/:idProducto', eliminarUnProducto)


module.exports = router