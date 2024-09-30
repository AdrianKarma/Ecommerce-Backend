const serviceUsuario = require('../services/usuarios.services');

const registrarUsuario = async(req, res) => {
    try {
        const resultado = await serviceUsuario.nuevoUsuario(req.body); 
        
        if (resultado.statusCode === 201) {
             res.status(201).json({ msg: resultado.msg });
        } else {
             res.status(500).json({ msg: resultado.msg });
        }
    } catch (error) {
        console.log(error);
         res.status(500).json({ msg: 'Error en el servidor' });
    }
};

const iniciarSesionUsuario = async(req, res) => {
    try {
        const result = await serviceUsuario.inicioSesion(req.body)

        if(result === 400){
            res.status(400).json({msg:'usuario o contraseña incorrecto'})
        }else {
            res.status(200).json({msg:'usuario logueado'})
        }
    } catch (error) {
        console.log(error);
    }
}

const obtenerTodosLosUsuarios = (req, res) => {
    try {
        const usuarios = serviceUsuario.obtenerTodosLosUsuarios();
        return res.status(200).json(usuarios);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
};

const obtenerUnUsuario = (req, res) => {
    try {
        const usuario = serviceUsuario.obtenerUnUsuario(req.params.idUsuario);
        if (usuario) {
            return res.status(200).json({ msg: 'Usuario encontrado', usuario });
        } else {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
};

const bajaFisicaUsuario = (req, res) => {
    try {
        const resultado = serviceUsuario.bajaUsuarioFisica(req.params.idUsuario); 
        
        return res.status(resultado.status).json({ msg: resultado.msg });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
};

const bajaLogicaUsuario = (req, res) => {
    try {
        const resultado = serviceUsuario.bajaUsuarioLogica(req.params.idUsuario); 
        
        return res.status(200).json({ msg: resultado.msg });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
};

module.exports = {
    registrarUsuario,
    iniciarSesionUsuario,
    obtenerTodosLosUsuarios,
    obtenerUnUsuario,
    bajaFisicaUsuario,
    bajaLogicaUsuario
};
