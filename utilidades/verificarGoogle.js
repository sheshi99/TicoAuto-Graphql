const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '252538192927-4h489g0gsg982vn2lpsh6ek63kv5a8vb.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const verificarGoogleToken = async (credential) => {
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: CLIENT_ID
    });

    const payload = ticket.getPayload();

    return {
        correo: payload.email,
        googleId: payload.sub
    };
};

module.exports = {
    verificarGoogleToken
};