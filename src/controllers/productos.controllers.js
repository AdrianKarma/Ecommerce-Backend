const serviciosDeProductos = require("../services/productos.services");
const logger = require('../../log4js-config')

const crearProducto = async (req, res) => {
  try {
    const result = await serviciosDeProductos.nuevoProducto(req.body);
    if (result.statusCode === 201) {
        logger.info(`Producto creado: ${JSON.stringify(req.body)}`);
      res.status(201).json({ msg: result.msg });
    } else {
        logger.error(`Error al crear producto: ${result.msg}`);
      res.status(500).json({ msg: result.msg });
    }
  } catch (error) {
    logger.error(`Error interno del servidor: ${error.message}`);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
const traerTodosLosProductos = async (req, res) => {
  try {
    const result = await serviciosDeProductos.todoLosProductos(req.body);
    logger.info(`Se han traído todos los productos`);
    return res.status(200).json({ result });
  } catch (error) {
    logger.error(`Error interno del servidor: ${error.message}`);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const traerUnProducto = async (req, res) => {
    try {
      const result = await serviciosDeProductos.unProducto(req.params.idProducto);
      
      if (result.statusCode === 200) {
        logger.info(`Se ha obtenido un producto por ID`);

        return res.status(200).json(result.producto); 
      } else {
        logger.error(`Error interno del servidor: ${error.message}`);

        return res.status(result.statusCode).json({ msg: result.msg }); 
      }
    } catch (error) {
      logger.error(`Error interno del servidor: ${error.message}`);

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
        logger.info(`Se actualizo el producto correctamente`);

        return res.status(200).json({ msg: result.msg, producto: result.producto });
      } else {
        logger.error(`No se pudo actualizar el producto correctamente: ${result.msg}`);

        return res.status(result.statusCode).json({ msg: result.msg });
      }
    } catch (error) {
      logger.error(`Error interno del servidor: ${error.message}`);

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
          logger.info(`Se eliminó correctamente el producto`);

            res.status(200).json({ msg: result.msg });
          } else {
            logger.error(`No se pudo eliminar el producto: ${result.msg}`);

            res.status(500).json({ msg: result.msg });
          }
    } catch (error) {
      logger.error(`Error interno del servidor: ${error.message}`);
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
      logger.info(`Se agregó imagen al producto correctamente`);

      return res.status(200).json({ msg: result.msg });
    } else {
      logger.error(`No se pudo agregar img al producto correctamente: ${result.msg}`);

      return res.status(400).json({ msg: result.msg });
    }
  } catch (error) {
    logger.error(`Error interno del servidor: ${error.message}`);
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
