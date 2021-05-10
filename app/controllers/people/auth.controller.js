const _jwt = require('../../services/jwt.service');

const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const getPeopleLogin = async (req, res) => {

    try {
        let people = req.body;
        let sql = `select * from personas WHERE name='${people.name}' and email= '${people.email}' limit 1;` //consultar en el select informacion que no sea sensible (no password)
        let result = await _pg.executeSql(sql);
        let people_logged = result.rows[0];

        let token = people_logged ? _jwt.sign(people_logged) : null;

        return res.send({
            ok: people_logged ? true : false,
            message: people_logged ? `Bienvenido ${people_logged.name}` : "Usuario no encontrado, verificar los daton ingresados",
            content: token,
        })

    } catch (error) {
        console.log(error);
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando la persona",
            content: error,
        })
    }

}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */

const verifyToken = (req, res) => {
    try {
        let token = req.headers.token
        let people = _jwt.verify(token)

        return res.send({
            ok: true,
            message: "Token verificado",
            content: people,
        })
    } catch (error) {
        return res.send({
            ok: false,
            message: "Error verificando el token",
            content: error,
        })
    }

}


const verifyTokenMiddleware = (req, res, next) => {
    try {
        let token = req.headers.token;
        let people = _jwt.verify(token);
        next()
    } catch (error) {
        return res.send({
            ok: false,
            message: "Middleware - Error verificando el token",
            content: error,
        })
    }

}

module.exports = { getPeopleLogin, verifyToken, verifyTokenMiddleware };