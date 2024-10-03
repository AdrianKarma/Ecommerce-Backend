const jwt = require('jsonwebtoken');

module.exports = (rol) => (req, res, next) => {

    try {
        const token = req.header('auth')
        if(!token){
            return res.status(409).json({msg: 'Token incorrecto'})
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        req.idUsuario = verify._id;
        if (rol === verify.rol) {
            return next()
        } else {
            return res.status(401).json({ msg: 'Acceso denegado' })
        }
    } catch (error) {
        console.log(error)
    }
};