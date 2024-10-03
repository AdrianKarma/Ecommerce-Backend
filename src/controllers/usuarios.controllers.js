const serviceUsuario = require("../services/usuarios.services");
const logger = require("../../log4js-config");

const registrarUsuario = async (req, res) => {
  try {
    const resultado = await serviceUsuario.nuevoUsuario(req.body);

    if (resultado.statusCode === 201) {
      logger.info(`Se registró Usuario correctamente`);

      res.status(201).json({ msg: resultado.msg });
    } else {
      logger.warn(`No se pudo registrar el Usuario correctamente: ${result.msg}`);

      res.status(500).json({ msg: resultado.msg });
    }
  } catch (error) {
    logger.error(`Error en registrar Usuario: ${error.message}`);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const iniciarSesionUsuario = async (req, res) => {
  try {
    const result = await serviceUsuario.inicioSesion(req.body);

    if (result.statusCode === 400) {
      logger.warn(`No se pudo iniciar sesion correctamente: ${result.msg}`);

      res.status(400).json({ msg: result.msg });
    } else {
      logger.info(`Se inició sesión correctamente`);

      res.status(200).json({ msg: result.msg, token: result.token });

    }
  } catch (error) {
    logger.error(`Error en Iniciar Sesión: ${error.message}`);
    res.status(500).json({ msg: "Error en el servidor" });

  }
};

const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuarios = await serviceUsuario.obtenerTodosLosUsuarios();
    logger.info(`Se obtuvieron todos los Usuarios correctamente`);

    return res.status(200).json({ msg: usuarios });
  } catch (error) {
    logger.error(`Error en obtener Usuarios: ${error.message}`);

    return res.status(500).json({ msg: usuarios.msg });
  }
};

const obtenerUnUsuario = async (req, res) => {
  try {
    const usuario = await serviceUsuario.obtenerUnUsuario(req.params.idUsuario);
    if (usuario.statusCode === 200) {
      logger.info(`Se obtuvo Usuario por ID correctamente`);

      return res.status(200).json({ msg: usuario });
    } else {
      logger.warn(`No se pudo obtener Usuario por ID: ${result.msg}`);

      return res.status(404).json({ msg: usuario.msg });
    }
  } catch (error) {
    logger.error(`Error en obtener un Usuario: ${error.message}`);
    return res.status(500).json({ msg: usuario.msg });
  }
};

const bajaFisicaUsuario = async (req, res) => {
  try {
    const result = await serviceUsuario.bajaUsuarioFisica(req.params.idUsuario);
    if (result.statusCode === 200) {
      logger.info(`Se eliminó correctamente al Usuario`);

      return res.status(200).json({ msg: result.msg });
    } else {
      logger.warn(`No se pudo eliminar correctamente el Usuario: ${result.msg}`);

      return res.status(404).json({ msg: result.msg });
    }
  } catch (error) {

    logger.error(`Error al eliminar Usuario: ${error.message}`);
    return res.status(500).json({ msg: result.msg });
  }
};

const bajaLogicaUsuario = async (req, res) => {
  try {
    const result = await serviceUsuario.bajaUsuarioLogica(req.params.idUsuario);

    if (result.statusCode === 200) {
      if (result.accion === "bloqueado") {
        logger.info(`El Usuario con ID: ${req.params.idUsuario} fue bloqueado correctamente`);
      } else if (result.accion === "desbloqueado") {
        logger.info(`El Usuario con ID: ${req.params.idUsuario} fue desbloqueado correctamente`);
      }

      return res.status(200).json({ msg: result.msg });
    } else {
      logger.warn(`No se pudo realizar la acción de baja lógica para el Usuario con ID: ${req.params.idUsuario}: ${result.msg}`);
      
      return res.status(404).json({ msg: result.msg });
    }
  } catch (error) {
    logger.error(`Error en baja lógica del Usuario con ID: ${req.params.idUsuario}: ${error.message}`);
    
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

module.exports = {
  registrarUsuario,
  iniciarSesionUsuario,
  obtenerTodosLosUsuarios,
  obtenerUnUsuario,
  bajaFisicaUsuario,
  bajaLogicaUsuario,
};
