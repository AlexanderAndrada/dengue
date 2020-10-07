const express = require('express');
const router = express.Router();
const service = require('../models/reportesModel.js');
const whoami = 'Router : routes / reportesRouter';


/**
 * Ruta: /api/reportes
 * Método: POST
 * Descripción: crear un nuevo reporte
 *
 */
router.post('', function(req, res) {
    console.log("reportes")
    service.create(req.body, function(error) {
            res.status(400).json(error);
        },
        function(result) {
            res.status(201).json(result);
        });
});

/**
 * Ruta: /api/reportes
 * Método: GET
 * Descripción: recuperar todos los reportes
 *
 */
router.get('', function(req, res) {
    service.findAll(function(error) {
        res.status(400).json(error);
    }, function(results) {
        res.status(200).json(results);
    });
});



/**
 * Ruta: /api/reportes/search
 * Método: GET
 * Descripción: recuperar reportes que cumplan el criterio de búsqueda
 *
 */
router.get('/search', function(req, res) {

    service.findByQuery(req.query, function(error) {
        res.status(400).json(error);
    }, function(results) {
        res.status(200).json(results);
    });
});



module.exports = router;