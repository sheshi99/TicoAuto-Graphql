const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '817077174471-bt5e6bh7eelg0989ksook2k9m1eu9tbp.apps.googleusercontent.com';
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