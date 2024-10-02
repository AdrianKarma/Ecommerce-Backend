const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    titulo: {
    type: String,
    required: true,
    trim: true,
    minlength:  [5, "El minimo de caracteres es 5"],
    maxlength: [200, "El maximo de caracteres es 200"],
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
    maxlength: [200, "El maximo de caracteres es 200"]
  },
  precio: {
    type: Number,
    required: true,
    default: 0
  },
  imagen: {
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