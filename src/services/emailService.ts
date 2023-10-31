import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import emailValidator from 'email-validator'; // Certifique-se de instalar a biblioteca 'email-validator'

// Configuração do Nodemailer
const transporter: Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_FORGOT, // Substitua com o seu endereço de e-mail
        pass: process.env.PASS_FORGOT, // Substitua com a senha de aplicativo
    },
});

// Função para enviar e-mails de redefinição de senha
export const sendPasswordResetEmail = (toEmail: string, resetCode: string) => {
    if (!emailValidator.validate(toEmail)) {
        console.error('Endereço de e-mail inválido:', toEmail);
        return;
    }

    const mailOptions: SendMailOptions = {
        from: 'gofreela2@gmail.com', // Substitua com o seu endereço de e-mail
        to: toEmail,
        subject: 'Solicitação de Redefinição de Senha',
        text: `Seu código de redefinição de senha é: ${resetCode}`,
    };

    // Envie o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar o e-mail:', error);
        } else {
            console.log('E-mail enviado:', info.response);
        }
    });
};
