import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });
    const {email, nombre, token } = datos

    // Enviar Email
    await transport.sendMail({
        from: 'Cachoporra',
        to: email,
        subject: 'Confirma tu cuenta en Cachoporra',
        text: 'Confirma tu cuenta en Cachoporra',
        html: `
            <p>Hola ${nombre}, confirma tu cuenta en cachoporra.es</p>
            <p>Tu cuenta ya está lista, sólo debes confirmala en el siguiente enlace: <a href="${process.env.BACKEND_URL}:${process.env.BACKEND_PORT ?? 8080}/auth/confirmar/${token}">Confirmar Cuenta</a></p>
            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        
        `
    })

}
const emailOlvidePassword = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });
    const {email, nombre, token } = datos

    // Enviar Email
    await transport.sendMail({
        from: 'Cachoporra',
        to: email,
        subject: 'Reestablece tu Password en Cachoporra',
        text: 'Reestablece tu Password en Cachoporra',
        html: `
            <p>Hola ${nombre}, has solicitado reestablecer tu password en cachoporra.es</p>
            <p>Sigue el siguiente enlace para generar un password nuevo: <a href="${process.env.BACKEND_URL}:${process.env.BACKEND_PORT ?? 8080}/auth/olvide-password/${token}">Reestablecer Password</a></p>
            <p>Si tu no solicitaste el cambio de password, puedes ignorar este mensaje</p>
        
        `
    })

}


export{
    emailRegistro,
    emailOlvidePassword
}