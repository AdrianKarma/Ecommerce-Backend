const serviciosDeProductos = require('../services/productos.services')

const productos = []



/* const crearProducto = (req, res) => {
        const producto = req.body

        productos.push({id: crypto.randomUUID(), producto})
        res.send('producto Creado')
    } */

const crearProducto = async(req, res)=>{
    try {
        const result = await serviciosDeProductos.nuevoProducto(req.body);
        if (result.statusCode === 201) {
            res.status(201).json({ msg: result.msg });
          } else {
            res.status(500).json({ msg: result.msg });
          }
    } catch (error) {
        console.log('Error al agregar imagen:',error)
        res.status(500).json({msg:'Error en el servidor'})
    }
    
}
const traerTodosLosProductos = (req, res) => {
        res.json(productos)
    }


const traerUnProducto = (req, res)=> {
        const id = req.params.idProducto
        const producto = productos.find((prod) => prod.id === id) 

        res.json(producto)
    }

const actualizarUnProducto = (req, res) => {
        const id = req.params.idProductos
        const positionProduct = productos.findIndex((prod) => prod.id === id)
        
        const productoActualizado = {
            id,
            ...req.body,
        }
        productos[positionProduct] = productoActualizado

        res.json({msg: 'producto actualizado'})
    }


const eliminarUnProducto = (req, res) => {
        const id = req.params.idProducto
        const positionProduct = productos.findIndex((prod) => prod.id === id)

        productos.splice(positionProduct, 1)

        res.json({msg: 'producto eliminado'})
    }

    const agregarImagenProducto = async(req, res)=>{
        try {
            const result = await serviciosDeProductos.imagenProducto(req.params.idProducto, req.file)
            if(result.statusCode===200){
                return res.status(200).json({msg:result.msg});
            }else{
                return res.status(400).json({msg:result.msg})
            }
        } catch (error) {
            console.log('Error al agregar imagen:',error)
            res.status(500).json({msg:'Error en el servidor'})
        }
    }

    module.exports = {
        crearProducto,
        traerTodosLosProductos,
        traerUnProducto,
        actualizarUnProducto,
        eliminarUnProducto,
        agregarImagenProducto
        
    }