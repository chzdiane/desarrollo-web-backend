const express = require('express');

const router = express.Router()

const _userController = require('../controllers/people/people.controller')

router
    .get("/people", _userController.getPeople)
    .post("/people", _userController.createPeople)
    .put("/people/:id", _userController.updatePeople)
    .delete("/people/:id", _userController.deletePeople);

module.exports = router;