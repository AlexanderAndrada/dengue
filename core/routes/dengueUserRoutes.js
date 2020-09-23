const express = require('express');
const router = express.Router();
const service = require('../models/dengueUserModel.js');
const passport = require('passport');
const whoami = 'Router : routes / agnUserRouter';


/**
 * Ruta: /api/dengue/usuarios
 * Método: POST
 * Descripción: crear un nuevo usuario
 *
 */
router.post('/usuarios', function(req, res) {
    service.create(req.body, function(error) {
            res.status(400).json(error);
        },
        function(result) {
            res.status(201).json(result);
        });
});

/**
 * Ruta: /api/dengue/usuarios
 * Método: GET
 * Descripción: recuperar todos los usuarios
 *
 */
router.get('/usuarios', function(req, res) {
    service.findAll(function(error) {
        res.status(400).json(error);
    }, function(results) {
        res.status(200).json(results);
    });
});

/**
 * Ruta: /api/dengue/usuarios/:id
 * Método: GET
 * Descripción: recupera un usuario por ID
 *
 */
router.get('/usuario/:id', function(req, res) {
    service.findById(function(error) {
        res.status(400).json(error);
    }, function(results) {
        res.status(200).json(results);
    });
});

/**
 * Ruta: /api/dengue/usuario/:id/persona
 * Método: GET
 * Descripción: recupera los datos de la persona asociada al usuario ID
 *
 */
router.get('/usuario/:id/persona', function(req, res) {
    service.findPersonForUser(req.params.id, function(error) {
        res.status(400).json(error);
    }, function(result) {
        res.status(200).json(result);
    });
});


/**
 * Ruta: /api/dengue/usuarios/:id
 * Método: PUT
 * Descripción: modificar un usuario
 *
 */
router.put('/usuario/:id', function(req, res) {
    service.update(req.params.id, req.body, function(error) {
        res.status(400).json(error);
    }, function(results) {
        res.status(200).json(results);
    });
});

/**
 * Ruta: /api/dengue/usuarios/:id
 * Método: DELETE
 * Descripción: eliminar un usuario
 *
 */
router.delete('/usuario/:id', function(req, res) {
    service.delete(req.params.id, function(error) {
        res.status(400).json(error);
    }, function(result) {
        res.status(200).json(result);
    });
});

/**
 * Ruta: /api/dengue/usuarios/login
 * Método: POST
 * Descripción: inicia una sesión
 *
 */
router.post('/usuarios/login', function(req, res, next) {
    passport.authenticate('dengue-local', function(err, user, info) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(400).json({
                error: {
                    message: 'Error en la autenticacion',
                    status: 400
                }
            });
        }

        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.status(200).json(user);
        });
    })(req, res, next);
});

/**
 * Ruta: /api/dengue/usuarios/currentuser
 * Método: GET
 * Descripción: recupera un usuario desde la sesión iniciada
 *
 */

router.get('/usuarios/currentuser', function(req, res) {
    if (req.user) {
        res.status(200).json(req.user);
    } else {
        res.status(200).json({ message: 'Sin sesión iniciada' });
    }
});

/**
 * Ruta: /api/dengue/usuarios/logoutgit sta
 * Método: GET
 * Descripción: cierra una sesión
 *
 */
router.get('/usuarios/logout', function(req, res) {
    req.logOut();
    req.session = null;
    res.status(200).json({ message: 'Sesión finalizada OK' });
});

/**
 * Ruta: /api/dengue/usuarios/resetpassword
 * Método: POST
 * Descripción: edita la contraseña
 *
 */
router.post('/usuarios/resetpassword', function(req, res) {
    service.resetPassword(req.body, function(error) {
            res.status(400).json(error);
        },
        function(result) {
            res.status(200).json(result);
        });
});


module.exports = router;
