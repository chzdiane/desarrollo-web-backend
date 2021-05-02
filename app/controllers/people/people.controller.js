
const { request } = require('express');
const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();

const EmailService = require('../../services/email.service');
const _email = new EmailService();

const ExcelService = require('../../services/excel.service');

const getPeople = async (req, res) => {

    try {
        let sql = 'select * from personas';
        let result = await _pg.executeSql(sql);
        let rows = result.rows;

        const _excel = new ExcelService();

        await _excel.createWorkSheet(rows);

        return res.send({
            url: 'http://localhost:3001/personas.xlsx',
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
        if (result.rowCount==1) {
            _email.sendEmail(people.email);
        }
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