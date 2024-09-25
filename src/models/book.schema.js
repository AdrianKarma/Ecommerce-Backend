const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    titulo: {
    type: String,
    required: true,
    trim: true,
    minlength:  [5, "El minimo de caracteres es 5"],
    maxlength: [50, "El maximo de caracteres es 50"],
  },
  genero: {
    type: String,
    required: true,
    trim: true,
    enum: {
        values: ['romance', 'ficcion', 'psicologia', 'historia', 'aventura'],
        message: 'El genero debe ser: Romance, Ficcion, Psicologia, Historia, Aventura'
      }
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
    minlength:  [5, "El minimo de caracteres es 5"],
    maxlength: [50, "El maximo de caracteres es 50"]
  },
  precio: {
    type: Number,
    required: true,
    default: 0
  },
  imagenes: {
    type: String,
    default: "",
  },
  bloqueado:{
    type:Boolean,
    default:false
}
});


const BookModel = mongoose.model('libro', BookSchema);
module.exports= BookModel