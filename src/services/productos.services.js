const { cloudinary } = require("../helpers/cloudinary");
const ProductModel = require("../models/book.schema");
const logger = require("../../log4js-config");

const nuevoProducto = async (body) => {
  try {
    const product = new ProductModel(body);
    await product.save();
    logger.info(`Nuevo producto guardado: ${JSON.stringify(body)}`);
    return {
      msg: "Producto creado con éxito",
      statusCode: 201,
    };
  } catch (error) {
    logger.error(`Error en nuevoProducto: ${error.message}`);
    return {
      msg: "Error al crear el producto",
      statusCode: 500,
      error,
    };
  }
};

const todoLosProductos = async (body) => {
  try {
    const libros = await ProductModel.find();
    logger.info("Se han traído todos los libros");
    return {
      libros,
      statusCode: 200,
    };
  } catch (error) {
    logger.error("Error al obtener los libros:", error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
const unProducto = async (idProducto) => {
  try {
    const producto = await ProductModel.findById(idProducto);

    if (producto) {
      logger.info(`Producto encontrado: ${idProducto}`);

      return {
        producto,
        statusCode: 200,
      };
    } else {
      logger.warn(`Producto no encontrado: ${idProducto}`);

      return {
        statusCode: 404,
        msg: "Producto no encontrado",
      };
    }
  } catch (error) {
    logger.error(`Error en unProducto: ${error.message}`);
    return {
      msg: "Error en el servidor",
      statusCode: 500,
      error,
    };
  }
};

const editarProducto = async (idProducto, body) => {
  try {

    const producto = await ProductModel.findById(idProducto);
    if (!producto) {
      logger.warn(`Producto no encontrado: ${idProducto}`);

      return {
        msg: "Producto no encontrado",
        statusCode: 404,
      };
    }

    const productoActualizado = await ProductModel.findByIdAndUpdate(
      idProducto,
      body,
      { new: true }
    );
    logger.info(`Producto actualizado: ${idProducto}`);

    return {
      msg: "Producto actualizado con éxito",
      producto: productoActualizado,
      statusCode: 200,
    };
  } catch (error) {
    logger.error(`Error en editarProducto: ${error.message}`);
    return {
      msg: "Error en el servidor",
      statusCode: 500,
      error,
    };
  }
};

const eliminarProducto = async (idProducto) => {
  try {
    const result = await ProductModel.findById(idProducto);
    if (result) {
      await ProductModel.findByIdAndDelete({ _id: idProducto });
      logger.info(`Producto eliminado: ${idProducto}`);

      return {
        msg: "Producto eliminado",
        statusCode: 200,
      };
    } else {
      logger.warn(`Producto no existe: ${idProducto}`);

      return {
        msg: "Producto no existe",
        statusCode: 400,
      };
    }
  } catch (error) {
    logger.error(`Error en eliminarProducto: ${error.message}`);
    return {
      msg: "Error en el servidor",
      statusCode: 500,
      error,
    };
  }
};

const imagenProducto = async (idProducto, file) => {
  try {
    const product = await ProductModel.findById({ _id: idProducto });
    if (!product) {
      logger.warn(`Producto no encontrado: ${idProducto}`);

      return {
        msg: "Producto no encontrado",
        statusCode: 404,
      };
    }
    const imagen = await cloudinary.uploader.upload(file.path);
    product.imagen = imagen.url;
    logger.info(`Imagen guardada para el producto: ${idProducto}`);

    await product.save();
    return {
      msg: "Imagen guardada con éxito",
      statusCode: 200,
    };
  } catch (error) {
    logger.error(`Error en imagenProducto: ${error.message}`);
    return {
      msg: "Error interno en el servidor",
      statusCode: 500,
      error: error.message,
    };
  }
};

module.exports = {
  nuevoProducto,
  todoLosProductos,
  unProducto,
  editarProducto,
  eliminarProducto,
  imagenProducto,
};
