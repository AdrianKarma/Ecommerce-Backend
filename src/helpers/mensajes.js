const transporter = require('../helpers/nodemailer')

const registroUsuario = async (nombreUsuario, emailUsuario) => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: `Maddison Foo Koch 👻" <${process.env.GMAIL_USER}>`,
        to: "bar@example.com",
        subject: "Bienvenida",
        text: "Bienvenido/a a nuestra libreria!",
        html: "<b>Hello world?</b>", // agregar codigo html
    });

};

module.exports = {
    registroUsuario
};