
const { request } = require('express');
const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();


const getPeople = async (req, res) => {

    let sql = 'select * from personas';
    try {
        let result = await _pg.executeSql(sql);
        let rows = result.rows;

        return res.send({
            ok: true,
            message: "Personas consultadas",
            content: rows,
        })

    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando la persona",
            content: error,
        })
    }

}

const createPeople = async (req, res) => {
    try {
        let people = req.body;
        let sql = `INSERT INTO public.personas (name, email) VALUES ('${people.name}','${people.email}');`;
        let result = await _pg.executeSql(sql);
        return res.send({
            ok: true,
            message: result.rowCount == 1 ? "Persona creada" : "La persona no fue creada",
            content: people,
        })
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error creando la persona",
            content: error,
        })
    }
}

const updatePeople = async (req, res) => {
    try {
        let id = req.params.id;
        let people = req.body;

        let sql = `UPDATE public.personas 
        SET name='${people.name}', email='${people.email}' 
        WHERE id='${id}';`;
        let result = await _pg.executeSql(sql);

        return res.send({
            ok: true,
            message: result.rowCount == 1 ? "Datos actualizados" : "La persona no fue actualizada",
            content: people,
        })
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error modificando la persona",
            content: error,
        })
    }
}

const deletePeople = async (req, res) => {
    try {
        let id =req.params.id;
        let sql = `DELETE FROM public.personas WHERE id='${id}';`;
        let result = await _pg.executeSql(sql);

        return res.send({
            ok: true,
            message: result.rowCount == 1 ? "Persona eliminada" : "La persona no fue eiminada",
            content: id,
        })
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error eliminando la persona",
            content: error,
        })
    }
}

module.exports = { getPeople, createPeople, updatePeople, deletePeople }