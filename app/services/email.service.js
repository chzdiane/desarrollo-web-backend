
const nodemailer = require("nodemailer");

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'pruebadianella@gmail.com',
                pass: 'pruebadianella123',
            },
        });

        this.mailOptions = {
            from: 'pruebadianella@gmail.com',
            to: '',
            subject: 'Bienvenido, ¡Registro exitoso!',
            //text: `Funciona`,
            html:'<b>REGISTRO EXITOSO </b> <br> Bienvenido a nuestro sistema <br/>',
        }
    }

    async sendEmail(email) {
        this.mailOptions.to = email;
        await this.transporter.sendMail(this.mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            } else {
                console.log("Email enviado: " + info.response);
            }
        })
    }
}

module.exports = EmailService;


