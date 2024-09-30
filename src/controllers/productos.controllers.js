const BookModel = require("../models/book.schema");
const serviciosDeProductos = require("../services/productos.services");

const productos = [];

/* const crearProducto = (req, res) => {
        const producto = req.body

        productos.push({id: crypto.randomUUID(), producto})
        res.send('producto Creado')
    } */

const crearProducto = async (req, res) => {
  try {
    const result = await serviciosDeProductos.nuevoProducto(req.body);
    if (result.statusCode === 201) {
      res.status(201).json({ msg: result.msg });
    } else {
      res.status(500).json({ msg: result.msg });
    }
  } catch (error) {
    console.log("Error al agregar imagen:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
const traerTodosLosProductos = async (req, res) => {
  try {
    const result = await serviciosDeProductos.todoLosProductos(req.body);
    return res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const traerUnProducto = async (req, res) => {
    try {
      const result = await serviciosDeProductos.unProducto(req.params.idProducto);
      
      if (result.statusCode === 200) {
        return res.status(200).json(result.producto); 
      } else {
        return res.status(result.statusCode).json({ msg: result.msg }); 
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
  };
/* 
const actualizarUnProducto = (req, res) => {
  const id = req.params.idProductos;
  const positionProduct = productos.findIndex((prod) => prod.id === id);

  const productoActualizado = {
    id,
    ...req.body,
  };
  productos[positionProduct] = productoActualizado;

  res.json({ msg: "producto actualizado" });
};
 */
const actualizarUnProducto = async (req, res) => {
    try {
      const result = await serviciosDeProductos.editarProducto(req.params.idProducto, req.body);
      
      if (result.statusCode === 200) {
        return res.status(200).json({ msg: result.msg, producto: result.producto });
      } else {
        return res.status(result.statusCode).json({ msg: result.msg });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
  };
/* const eliminarUnProducto = (req, res) => {
  const id = req.params.idProducto;
  const positionProduct = productos.findIndex((prod) => prod.id === id);

  productos.splice(positionProduct, 1);

  res.json({ msg: "producto eliminado" });
}; */
const eliminarUnProducto=async(req,res)=>{
    try {
        const result = await serviciosDeProductos.eliminarProducto(req.params.idProducto);
        if (result.statusCode === 200) {
            res.status(200).json({ msg: result.msg });
          } else {
            res.status(500).json({ msg: result.msg });
          }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }

}

const agregarImagenProducto = async (req, res) => {
  try {
    const result = await serviciosDeProductos.imagenProducto(
      req.params.idProducto,
      req.file
    );
    if (result.statusCode === 200) {
      return res.status(200).json({ msg: result.msg });
    } else {
      return res.status(400).json({ msg: result.msg });
    }
  } catch (error) {
    console.log("Error al agregar imagen:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

module.exports = {
  crearProducto,
  traerTodosLosProductos,
  traerUnProducto,
  actualizarUnProducto,
  eliminarUnProducto,
  agregarImagenProducto,
};
