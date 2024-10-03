const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength:  [5, "El minimo de caracteres es 5"],
    maxlength: [50, "El maximo de caracteres es 50"],
  },
  contrasenia: {
    type: String,
    required: true,
    trim: true,
  },
  emailUsuario: {
    type: String,
    required: true,

  },
  rol: {
    type: String,
    default: "usuario",
    enum: ["usuario", "admin"],
  },
  bloqueado: {
    type: Boolean,
    default: false,
  },
  carrito:[],

});

const UserModel = model("usuario", UserSchema);
module.exports = UserModel;
