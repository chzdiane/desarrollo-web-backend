const jwt = require('jsonwebtoken');

const SECRET_KEY = "Ny8hRE-mXb`?3>E2Cp5@=jESr.|$E,fA'Y}28%0RgRWC8a?k$76egpw-a]5+(o";

/**
 * Funcion para cifrar datos
 * @param {*} data Datos a cifrar 
 * @returns 
 */
const sign = (data) => {
    return jwt.sign(data, SECRET_KEY, { expiresIn: "8h" });
}


/**
 * Funcion para descifrar un token y validarlo
 * @param {*} token 
 */
const verify = (token) => {
    return jwt.verify(token, SECRET_KEY)
}

module.exports = { sign, verify };