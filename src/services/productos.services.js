const { cloudinary } = require("../helpers/cloudinary");
const ProductModel = require("../models/book.schema");
const logger = require("../../log4js-config");
const { MercadoPagoConfig, Preference } = require('mercadopago')
const UserModel = require("../models/user.schema");

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
    logger.info("Se han traído todos los productos");
    return {
      libros,
      statusCode: 200,
    };
  } catch (error) {
    logger.error("Error al obtener los productos:", error);
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

const agregarProductoCarrito = async (idProducto, idUsuario) => {
  try {
    const producto = await ProductModel.findById(idProducto)
    const usuario = await UserModel.findById(idUsuario)

    const productoExiste = usuario.carrito.find((prod) => prod.id === idProducto)
    if (!usuario) {
      return {
        msg: 'Usuario no encontrado',
        statusCode: 404
      };
    }
    if (productoExiste) {
      return {
        mag: 'Producto ya existe en el Carrito',
        statusCode: 400
      }
    }
    console.log(usuario)
    console.log(producto)
    usuario.carrito.push(producto)
    await usuario.save()

    return {
      msg: 'Producto agregado al carrito',
      statusCode: 200
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      msg: 'Error al agregar el producto al carrito'
    }
  }
}

const borrarProductoCarrito = async (idProducto, idUsuario) => {
  try {
    const usuario = await UserModel.findById(idUsuario)

    const posicionProducto = usuario.carrito.findIndex((prod) => prod.id === idProducto)
    
    usuario.carrito.splice(posicionProducto, 1)
    await usuario.save()

    return {
      msg: 'Producto borrdado del Carrito',
      statusCode: 200
    }
  } catch (error) {
    return {
      statusCode: 500,
      msg: 'Error al borrar el producto del carrito'
    }
  }
}

const pagoConMP = async (body) => {
  const client = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN})
  const preference = new Preference(client)
  const result = await preference.create({
    body: {
      //Dado que no hay un frontend que envie los productos, los items están hardcodeados temporalmente.
      items:[
        {
          title:'Libro 1',
          quantity: 1,
          unit_price: 15000,
          currency_id:'ARS'
        },
        {
          title:'libro 2',
          quantity: 1,
          unit_price: 170000,
          currency_id:'ARS'
        },
      ],
      back_urls: {
        success:'myApp.netlify.com/carrito/success', //pagina de frontEnd
        failure:'myApp.netlify.com/carrito/failure', //pagina de frontEnd
        pending:'myApp.netlify.com/carrito/pending' //pagina de frontEnd   
      },
      auto_return: 'approved'
    }
  })

  return {
    result,
    statusCode: 200
  }
  
}

module.exports = {
  nuevoProducto,
  todoLosProductos,
  unProducto,
  editarProducto,
  eliminarProducto,
  imagenProducto,
  agregarProductoCarrito,
  borrarProductoCarrito,
  pagoConMP
};
