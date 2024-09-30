const { cloudinary } = require("../helpers/cloudinary");
const BookModel = require("../models/book.schema");
const ProductModel = require("../models/book.schema");

const nuevoProducto = async (body) => {
  try {
    const product = new ProductModel(body);
    await product.save();
    return {
      msg: "Producto creado con éxito",
      statusCode: 201,
    };
  } catch (error) {
    console.error("Error en nuevoProducto:", error);
    return {
      msg: "Error al crear el producto",
      statusCode: 500,
      error,
    };
  }
};

const todoLosProductos = async (body) => {
  try {
    const libros = await BookModel.find();
    return {
      libros,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
const unProducto = async (idProducto) => {
  try {
    const producto = await ProductModel.findById(idProducto);

    if (producto) {
      return {
        producto,
        statusCode: 200,
      };
    } else {
      return {
        statusCode: 404,
        msg: "Producto no encontrado",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      msg: "Error en el servidor",
      statusCode: 500,
      error,
    };
  }
};

const editarProducto = async (idProducto, body) => {
  try {
    console.log("ID del producto recibido:", idProducto); // Log para verificar el ID recibido

    const producto = await ProductModel.findById(idProducto);
    if (!producto) {
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

    return {
      msg: "Producto actualizado con éxito",
      producto: productoActualizado,
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error en el servidor:", error);
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
      return {
        msg: "Producto eliminado",
        statusCode: 200,
      };
    } else {
      return {
        msg: "Producto no existe",
        statusCode: 400,
      };
    }
  } catch (error) { console.error("Error en el servidor:", error);
    return {
      msg: "Error en el servidor",
      statusCode: 500,
      error,
    };}
};

const imagenProducto = async (idProducto, file) => {
  try {
    const product = await ProductModel.findById({ _id: idProducto });
    if (!product) {
      return {
        msg: "Producto no encontrado",
        statusCode: 404,
      };
    }
    const imagen = await cloudinary.uploader.upload(file.path);
    product.imagen = imagen.url;
    await product.save();
    return {
      msg: "Imagen guardada con éxito",
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error en imagenProducto:", error);
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
  imagenProducto
};
