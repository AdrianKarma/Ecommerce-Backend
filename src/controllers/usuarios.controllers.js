const usuarios = [{
    id: 1,
    nombreDeUsuario: 'sebastian',
    email: 'sebas_ale05@hotmail.com',
    contrasenia: '123456',
    //rol: 'admin',
    //estado: true
}]


const registrarUsuario = (req, res) => {
    try {
        const body = req.body;
        const emailExiste = usuarios.find((usuario) => usuario.email === body.email)
        const usuarioExiste = usuarios.find((usuario) => usuario.nombreDeUsuario === body.nombreDeUsuario)

        if(usuarioExiste){
            return res.send('el usuario ya esta registrado')
        }else if(emailExiste)

        if(emailExiste){
            return res.send('el email ya esta registrado')
        }

        const id = crypto.randomUUID()
        
        usuarios.push(id, ...body)
        res.send('usuario registrado')

    } catch (error) {
        console.log(error);
    }
}


const obtenerTodosLosUsuarios = (req, res) => {
    try {
        res.status(200).json(usuarios)
    } catch (error) {
        console.log(error);
    }
}

const obtenerUnUsuario = (req, res) => {
    try {
        const id = req.params.idUsuario
        const usuario = usuarios.find((usuario) => usuario.id === id)

        (!usuario) && res.status(404).json({msg: 'usuario no encontrado'})

        res.status(200).json({msg: 'usuario encontrado', usuario})
    } catch (error) {
        console.log(error);
    }
}

const bajaFisicaUsuario = (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    } 
}


const bajaLogicaUsuario = (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    } 
}


module.exports = {
    registrarUsuario,
    obtenerTodosLosUsuarios,
    obtenerUnUsuario,
    bajaFisicaUsuario,
    bajaLogicaUsuario,
}