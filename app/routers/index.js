const express = require('express');

const router = express.Router()

const _userController = require('../controllers/people/people.controller')
const _authController = require('../controllers/people/auth.controller')

//Rutas publicas, no necesitan un token

router
    .post('/login', _authController.getPeopleLogin);

//Registro del MIDDLEWARE
router.use([_authController.verifyTokenMiddleware]);


//Rutas privadas
router
    .get("/verify", _authController.verifyToken)
    .get("/people", _userController.getPeople)
    .post("/people", _userController.createPeople)
    .put("/people/:id", _userController.updatePeople)
    .delete("/people/:id", _userController.deletePeople);

module.exports = router;