const serviceUsuario = require("../services/usuarios.services");

const registrarUsuario = async (req, res) => {
  try {
    const resultado = await serviceUsuario.nuevoUsuario(req.body);

    if (resultado.statusCode === 201) {
      res.status(201).json({ msg: resultado.msg });
    } else {
      res.status(500).json({ msg: resultado.msg });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const iniciarSesionUsuario = async (req, res) => {
  try {
    const result = await serviceUsuario.inicioSesion(req.body);

    if (result.statusCode === 400) {
      res.status(400).json({ msg: result.msg });
    } else {
      res.status(200).json({ msg: result.msg });
    }
  } catch (error) {
    console.log(error);
  }
};

const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuarios = await serviceUsuario.obtenerTodosLosUsuarios();
    return res.status(200).json({ msg: usuarios });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: usuarios.msg });
  }
};

const obtenerUnUsuario = async (req, res) => {
  try {
    const usuario = await serviceUsuario.obtenerUnUsuario(req.params.idUsuario);
    if (usuario.statusCode === 200) {
      return res.status(200).json({ msg: usuario });
    } else {
      return res.status(404).json({ msg: usuario.msg });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: usuario.msg });
  }
};

const bajaFisicaUsuario = async (req, res) => {
  try {
    const result = await serviceUsuario.bajaUsuarioFisica(req.params.idUsuario);
    if (result.statusCode === 200) {
      return res.status(200).json({ msg: result.msg });
    } else {
      return res.status(404).json({ msg: result.msg });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: result.msg });
  }
};

const bajaLogicaUsuario = async(req, res) => {
  try {
    const result = await serviceUsuario.bajaUsuarioLogica(req.params.idUsuario);

    if (result.statusCode === 200) {
      return res.status(200).json({ msg: result.msg });
    } else {
      return res.status(404).json({ msg: result.msg });
    }
  } catch (error) {
    console.log(error);
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
