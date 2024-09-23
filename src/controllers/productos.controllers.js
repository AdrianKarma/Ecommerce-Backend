const productos = []

const crearProducto = (req, res) => {
        const producto = req.body

        productos.push({id: crypto.randomUUID(), producto})
        res.send('producto Creado')
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



    module.exports = {
        crearProducto,
        traerTodosLosProductos,
        traerUnProducto,
        actualizarUnProducto,
        eliminarUnProducto,
    }