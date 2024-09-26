const { cloudinary } = require("../helpers/cloudinary");
const ProductModel = require("../models/book.schema");

const nuevoProducto = async(body)=>{
  try {
    const product= new ProductModel(body);
    await product.save();
    return{
      msg:'Producto creado con éxito',
      statusCode: 201
    }
  } catch (error) {
    console.error('Error en nuevoProducto:', error);
    return{
      msg:'Error al crear el producto',
      statusCode:500,
      error
    }
    
  }
}



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
  imagenProducto,
  
};
