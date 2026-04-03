const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const enviarCorreoVerificacion = async (correo, nombre, linkVerificacion) => {
    const mensaje = {
        to: correo,

        
        from: {
            email: process.env.SENDGRID_FROM_EMAIL,
            name: "TicoAuto"
        },

        subject: 'Verificación de cuenta - TicoAuto',

        
        text: `Hola ${nombre},

        Gracias por registrarte en TicoAutos.

        Para activar tu cuenta, copia y pega este enlace en tu navegador:
        ${linkVerificacion}

        Si no realizaste este registro, puedes ignorar este mensaje.`,

        
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                <h2>Hola ${nombre}</h2>
                <p>Gracias por registrarte en <strong>TicoAutos</strong>.</p>
                <p>Para activar tu cuenta, haz clic en el siguiente botón:</p>

                <p style="text-align: center;">
                    <a href="${linkVerificacion}" 
                       style="display:inline-block;padding:12px 20px;background:#2563eb;color:white;text-decoration:none;border-radius:6px;">
                        Verificar cuenta
                    </a>
                </p>

                <p style="font-size:12px;color:#888;">
                    Este es un correo automático, por favor no respondas a este mensaje.
                </p>
            </div>
        `
    };

    try {
        await sgMail.send(mensaje);
        console.log("📩 Correo enviado correctamente a:", correo);
    } catch (error) {
        console.error("❌ Error al enviar correo:", error.response?.body || error.message);
    }
};

module.exports = enviarCorreoVerificacion;