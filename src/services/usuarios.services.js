const crypto = require("crypto");
const UserModel = require("../models/user.schema");
const bcrypt = require("bcrypt");
const logger = require("../../log4js-config");

const nuevoUsuario = async (body) => {
  try {
    const usuarioExiste = await UserModel.findOne({
      nombreUsuario: body.nombreUsuario,
    });

    if (usuarioExiste) {
      logger.warn(`El Usuario ya está registrado`);

      return {
        msg: "El usuario ya está registrado",
        statusCode: 400,
      };
    }
    const salt = await bcrypt.genSalt();
    body.contrasenia = await bcrypt.hash(body.contrasenia, salt);
    

    const usuario = new UserModel(body);
    await usuario.save();
    logger.info(`Usuario registrado con éxito`);

    return {
      msg: "Usuario creado con exito",
      statusCode: 201,
    };
  } catch (error) {
    logger.error(`Error al crear Usuario: ${error.message}`);
    return { statusCode: 500, msg: "Error interno del servidor", error };
  }
};

const inicioSesion = async (body) => {
  try {
    const usuarioExiste = await UserModel.findOne({
      nombreUsuario: body.nombreUsuario,
    });

    if (!usuarioExiste) {
      logger.warn(`El Usuario no existe`);

      return {
        msg: "El usuario no existe",
        statusCode: 400,
      };
    }

    const verificarContrasenia = bcrypt.compareSync(
      body.contrasenia,
      usuarioExiste.contrasenia
    );

    if (verificarContrasenia) {
      logger.info(`Inicio de sesión con éxito`);

      return {
        msg: "Inicio de sesión con éxito",
        statusCode: 201,
      };
    } else {
      logger.warn(`Inicio de sesión incorrecto`);

      return {
        msg: "Inicio de sesión incorrecto",
        statusCode: 400,
      };
    }
  } catch (error) {
    logger.error(`Error al Iniciar Sesion: ${error.message}`);
    return { statusCode: 500, msg: "Error interno del servidor", error };
  }
};

const obtenerTodosLosUsuarios = async (body) => {
  try {
    const usuarios = await UserModel.find();
    logger.info(`Se obtuvieron todos los Usuarios correctamente`);

    return {
      usuarios,
      statusCode: 200,
    };
  }  catch (error) {
    logger.error(`Error al obtener los Usuarios: ${error.message}`);
    return { statusCode: 500, msg: "Error interno del servidor", error }; 
  }
};

const obtenerUnUsuario = async (idUsuario) => {
  try {
    const usuario = await UserModel.findById(idUsuario);
    if (usuario) {
      logger.info(`Se obtuvo un Usuario por ID correctamente`);

      return {
        usuario,
        statusCode: 200,
      };
    } else {
      logger.warn(`No se pudo obtener un Usuario por ID correctamente`);

      return { statusCode: 404, msg: "Usuario no encontrado" };
    }
  } catch (error) {
    logger.error(`Error al obtener Usuario: ${error.message}`);

    return {
      msg: "Error al obtener usuario",
      statusCode: 500,
      error,
    };
  }
};

const bajaUsuarioFisica = async (idUsuario) => {
  try {
    const usuarioEliminado = await UserModel.findByIdAndDelete(idUsuario);
    if (usuarioEliminado) {
      logger.info(`Usuario eliminado con éxito`);

      return {
        statusCode: 200,
        msg: "Usuario eliminado con éxito",
      };
    } else {
      logger.warn(`No se pudo eliminar el Usuario`);

      return {
        statusCode: 404,
        msg: "Usuario no encontrado",
      };
    }
  } catch (error) {
    logger.error(`Error al eliminar Usuario: ${error.message}`);
    return {
      statusCode: 500,
      msg: "Error interno del servidor",
      error,
    };
  }
};

const bajaUsuarioLogica = async (idUsuario) => {
  try {
    const usuario = await UserModel.findById(idUsuario);
    if (usuario) {
      usuario.bloqueado = !usuario.bloqueado;
      await usuario.save();

      const mensaje = usuario.bloqueado
        ? "Usuario bloqueado"
        : "Usuario desbloqueado";
      const accion = usuario.bloqueado ? "bloqueado" : "desbloqueado";

      logger.info(
        `El Usuario con ID: ${idUsuario} ha sido ${accion} correctamente`
      );

      return {
        statusCode: 200,
        msg: mensaje,
        accion: accion,
      };
    } else {
      logger.warn(`No se encontró el Usuario con ID: ${idUsuario}`);
      return {
        statusCode: 404,
        msg: "Usuario no encontrado",
      };
    }
  } catch (error) {
    logger.error(
      `Error al realizar la baja lógica para el Usuario con ID: ${idUsuario}: ${error.message}`
    ); 
    return {
      statusCode: 500,
      msg: "Error interno del servidor",
      error,
    };
  }
};
module.exports = {
  nuevoUsuario,
  inicioSesion,
  obtenerTodosLosUsuarios,
  obtenerUnUsuario,
  bajaUsuarioFisica,
  bajaUsuarioLogica,
};
