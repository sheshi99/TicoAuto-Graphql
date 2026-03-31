
const axios = require("axios");

const consultarCedula = async (cedula) => {
  try {
    const response = await axios.get(`http://localhost:8000/cedula/${cedula}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // no existe
    }
    throw error;
  }
};

module.exports = {
  consultarCedula
};