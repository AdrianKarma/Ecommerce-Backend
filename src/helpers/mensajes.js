const transporter = require('../helpers/nodemailer')

const registroUsuario = async (nombreUsuario, emailUsuario) => {
    // send mail with defined transport object
     await transporter.sendMail({
        from: `Libreria <${process.env.GMAIL_USER}>`,
        to: emailUsuario,
        subject: "Bienvenida",
        text: "Bienvenido/a a nuestra libreria!",
        html: "<b>Hello world?</b>", // agregar codigo html
    });

};

const recuperoContrasenia = async (token) => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: `Recuperación de contraseña" <${process.env.GMAIL_USER}>`,
        to: 'bar@example.com',
        subject: "Contraseña restablecida",
        html: ` `
    });
};

module.exports = {
    registroUsuario,
    recuperoContrasenia
};