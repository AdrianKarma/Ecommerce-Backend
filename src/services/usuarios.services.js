const crypto = require('crypto'); // Asegúrate de importar crypto si no lo has hecho
const UserModel = require('../models/user.schema');
const bcrypt = require('bcrypt')

/*const usuarios = [
    {
        id: 1,
        nombreDeUsuario: 'adrian2024',
        emailDelUsuario: 'adrian@gmail.com',
        contrasenia: '123456789'
    }
];*/
const nuevoUsuario = async (body) => {
    try {
        const usuarioExiste = await UserModel.findOne({nombreUsuario: body.nombreUsuario})

        if(usuarioExiste){
            return {
                msg: 'El usuario ya está registrado',
                statusCode: 400
            }
        }
        
        let salt = bcrypt.genSaltSync();
        body.contrasenia = bcrypt.hashSync(body.contrasenia, salt)
        const usuario = new UserModel(body)
        await usuario.save()

        return {
            msg: 'Usuario creado con exito',
            statusCode:201
        }

        /*const emailExiste = usuarios.find((usuario) => usuario.emailDelUsuario === body.emailDelUsuario);
        const usuarioExiste = usuarios.find((usuario) => usuario.nombreDeUsuario === body.nombreDeUsuario);
    
        if (emailExiste) {
            return { status: 400, msg: 'email no disponible' }; 
        } else if (usuarioExiste) {
            return { status: 400, msg: 'usuario no disponible' }; 
        }

        const id = crypto.randomUUID();
        usuarios.push({ id, bloqueado: false, ...body });
        return { status: 201, msg: 'Usuario creado exitosamente' }; */
    } catch (error) {
        console.log(error);
        return { statusCode: 500,
             msg: 'Error interno del servidor' ,
            error}; 
    }
};

const inicioSesion = async(body) => {
    try {
        const usuarioExiste = await UserModel.findOne({nombreUsuario: body.nombreUsuario})

        if(!usuarioExiste){
            return 400
        }

        const verificarContrasenia = bcrypt.compareSync(body.contrasenia, usuarioExiste.contrasenia)

        if(verificarContrasenia){
            return 200
        }else {
            return 400
        }


    } catch (error) {
        console.log(error);
    }
}


const obtenerTodosLosUsuarios = () => {
    try {
        return { status: 200, usuarios }; 
    } catch (error) {
        console.log(error);
        return { status: 500, msg: 'Error interno del servidor' }; 
    }
};

const obtenerUnUsuario = (idUsuario) => {
    try {
        const usuario = usuarios.find((user) => user.id === idUsuario);
        if (usuario) {
            return { status: 200, usuario }; 
        } else {
            return { status: 404, msg: 'Usuario no encontrado' }; 
        }
    } catch (error) {
        console.log(error);
        return { status: 500, msg: 'Error interno del servidor' }; 
    }
};

const bajaUsuarioFisica = (idUsuario) => {
    const posicionDeUsuario = usuarios.findIndex((usuario) => usuario.id === idUsuario);
    if (posicionDeUsuario !== -1) {
        usuarios.splice(posicionDeUsuario, 1);
        return { status: 200, msg: 'Usuario borrado con éxito' }; 
    } else {
        return { status: 404, msg: 'Usuario no encontrado' }; 
    }
};

const bajaUsuarioLogica = (idUsuario) => {
    const posicionDelUsuario = usuarios.findIndex((usuario) => usuario.id === idUsuario);
    if (posicionDelUsuario !== -1) {
        usuarios[posicionDelUsuario].baja = !usuarios[posicionDelUsuario].baja;
        const mensaje = usuarios[posicionDelUsuario].baja ? 'usuario bloqueado' : 'usuario activo';
        return { status: 200, msg: mensaje }; 
    } else {
        return { status: 404, msg: 'Usuario no encontrado' }; 
    }
};

module.exports = {
    nuevoUsuario,
    inicioSesion,
    obtenerTodosLosUsuarios,
    obtenerUnUsuario,
    bajaUsuarioFisica,
    bajaUsuarioLogica
};
