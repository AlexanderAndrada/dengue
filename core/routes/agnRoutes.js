/**
 * Load module dependencies
 */
var express = require('express');
var router = express.Router();
var servicio = require('../models/acervoModel.js');
const whoami = "Router:routes/agnRoutes: ";

/**
 * Efectuar la migración de la base de datos
 *    http://localhost:8080/api/vida/migrar
 *    La collección acervos debe estar en blanco
 *
 */
router.get('/migrar', function(req, res) {
    const Config = require('../config/config_agn.js');

    console.log('Parámetros de conexión a MySQL: %o', Config);

    // ############################################################################
    // Conexión y tratamiento de los datos desde MySQL
    //

    const mysql = require('mysql');
    const conexion = mysql.createConnection({
        host: Config.MySQL.host,
        user: Config.MySQL.usuario,
        password: Config.MySQL.password,
        database: Config.MySQL.database
    });

    /* ************************************************************************* */

    var fetchArchives = conexion.query('SELECT * FROM archives');

    fetchArchives
        .on('error', function(err) {
            console.error('Ocurrió un error: %s', err);
        })
        .on('result', function(registro) {
            conexion.pause();

            /**
             * corrige error:
             *
             * Unhandled rejection ValidationError: metadatos.fecha_grabacion: Cast to date failed for value "0000-00-00 00:00:00" at path "fecha_grabacion",
             */
            if (registro.fecha_grabacion === '0000-00-00 00:00:00') {
                registro.fecha_grabacion = null;
            }

            var acervo = {
                fondo: {
                    legajo_numero: registro.legajo_numero,
                    legajo_resumen: registro.legajo_resumen,
                    id_externo: registro.id_externo,
                    vida_record_id: registro.id,
                    coleccion: null
                },
                metadatos: {
                    timecode: registro.timecode,
                    tape_master_numero: registro.tape_master_numero,
                    observacion_preparacion: registro.observacion_preparacion,
                    observacion_digitalizacion: registro.observacion_digitalizacion,
                    transcripcion: registro.transcripcion,
                    puesta_audiovisual: registro.puesta_audiovisual,
                    titulo_formal: registro.titulo_formal,
                    sonido: registro.sonido,
                    subtitulos: registro.subtitulos,
                    duracion: registro.duracion,
                    color: registro.color,
                    derechos: registro.derechos,
                    active: registro.active,
                    temas_raw: registro.temas_raw,
                    observacion_cinecolor: registro.observacion_cinecolor,
                    custom1: registro.custom1,
                    nroprocdigital: registro.nroprocdigital,
                    motivos_visuales: registro.motivos_visuales,
                    lado: registro.lado,
                    track: registro.track,
                    velocidad: registro.velocidad,
                    coleccion: registro.coleccion,
                    fecha_grabacion: registro.fecha_grabacion,
                    fecha_filmacion: registro.fecha_filmacion,
                    fecha_ingreso: registro.fecha_ingreso,
                    fecha_digitalizacion: registro.fecha_digitalizacion,
                    created_administrador_id: registro.created_administrador_id,
                    modified_administrador_id: registro.modified_administrador_id,
                    created: registro.created,
                    modified: registro.modified
                },
                assets: [],
                documentos: [],
                attachments: [],
                temas: [],
                timecodes: [],
                languages: [],
                artists: [],
                materials: [],
                genres: []
            }

            insertNewAcervo(acervo);

            /**
             * A continuación obtengo las colecciones para un archivo
             *
             */

            var fetchCollectionsForArchive = conexion.query('SELECT * FROM collections c INNER JOIN archives_collections ac ON c.id = ac.collection_id AND ac.archive_id = ' + acervo.fondo.vida_record_id);
            fetchCollectionsForArchive
                .on('result', function(registro) {
                    conexion.pause();

                    var collection = {
                        collectionId: Number.parseInt(registro.id),
                        title: registro.title,
                        description: registro.title,
                        active: registro.active,
                        created: registro.created,
                        modified: registro.modified
                    }

                    updateAcervoCollections(acervo, collection);


                    conexion.resume();
                })

            /**
             * A continuación obtengo las assets para un archivo
             *
             */

            var fetchResourcesForArchive = conexion.query('select r.id, r.title, r.description, r.path, r.resourcetype_id, rt.id as rt_id, rt.active as rt_active, rt.created as rt_created, rt.modified as rt_modified, rt.title as rt_title from resources r inner join archives_resources ar on r.id = ar.resource_id inner join resourcetypes rt on r.resourcetype_id = rt.id where ar.archive_id =' + acervo.fondo.vida_record_id);
            fetchResourcesForArchive
                .on('result', function(registro) {
                    conexion.pause();

                    var resourceType = {
                        resourceTypeId: Number.parseInt(registro.rt_id),
                        title: registro.rt_title,
                        active: registro.rt_active,
                        created: registro.rt_created,
                        modified: registro.rt_modified
                    }

                    var resource = {
                        resourceId: Number.parseInt(registro.id),
                        title: registro.title,
                        description: registro.title,
                        path: registro.path,
                        resourcetype: resourceType
                    }

                    updateAcervoResources(acervo, resource);

                    conexion.resume();
                })

            /**
             * A continuación obtengo los documentos  para un archivo
             *
             */
            var fetchDocumentsForArchive = conexion.query('select d.id, d.title, d.contents, d.active, d.created, d.modified from documents d inner join archives_documents ad on d.id = ad.document_id where ad.archive_id = ' + acervo.fondo.vida_record_id);

            fetchDocumentsForArchive
                .on('result', function(registro) {
                    conexion.pause();

                    var document = {
                        documentId: Number.parseInt(registro.id),
                        title: registro.title,
                        contents: registro.contents,
                        active: registro.active,
                        created: registro.created,
                        modified: registro.modified
                    }

                    updateAcervoDocuments(acervo, document);

                    conexion.resume();
                })


            /**
             * A continuación obtengo los attachments para un archivo
             *
             */
            var fetchAttachmentsForArchive = conexion.query('select a.id, a.filetype_id, a.title, a.description, a.file_hash, a.file_name, a.file_ext, a.file_size, a.active, a.created, a.updated, af.title as filetype_title from attachments a inner join archives_attachments `at` on a.id = at.attachment_id inner join filetypes af on a.filetype_id = af.id where at.archive_id = ' + acervo.fondo.vida_record_id);

            fetchAttachmentsForArchive
                .on('result', function(registro) {
                    conexion.pause();

                    var attachmentFileType = {
                        id: registro.filetype_id,
                        title: registro.filetype_title
                    }

                    var attachment = {
                        attachmentId: Number.parseInt(registro.id),
                        fileType: attachmentFileType,
                        title: registro.title,
                        description: registro.description,
                        fileHash: registro.file_hash,
                        fileName: registro.file_name,
                        fileExt: registro.file_ext,
                        active: registro.active,
                        created: registro.created,
                        modified: registro.modified
                    }

                    updateAcervoAttachments(acervo, attachment);

                    conexion.resume();
                })


            /**
             * A continuación obtengo los timecodes para un archivo
             *
             */
            var fetchTimecodesForArchive = conexion.query('select t.id, t.archive_id, t.code, t.active, t.title, t.created, t.modified from timecodes t where t.archive_id = ' + acervo.fondo.vida_record_id);

            fetchTimecodesForArchive
                .on('result', function(registro) {
                    conexion.pause();

                    var timecode = {
                        timecodeId: Number.parseInt(registro.id),
                        archiveid: registro.archive_id,
                        code: registro.code,
                        active: registro.active,
                        title: registro.title,
                        created: registro.created,
                        modified: registro.modified
                    }

                    updateAcervoTimecodes(acervo, timecode);

                    conexion.resume();
                })



            /**
             * A continuación obtengo los artistas para un archivo
             *
             */
            var fetchArtistsForArchive = conexion.query('select a.id, a.title, a.description, a.active, a.created, a.modified, r.id as role_id, r.title as role_title, r.description as role_description, r.active as role_active, r.created as role_created, r.modified as role_modified from artists a inner join archives_artists aa on a.id = aa.artist_id inner join roles r on r.id = aa.role_id where aa.archive_id = ' + acervo.fondo.vida_record_id);

            fetchArtistsForArchive
                .on('result', function(registro) {
                    conexion.pause();

                    var artistRole = {
                        artistRoleId: Number.parseInt(registro.role_id),
                        title: registro.role_title,
                        description: registro.role_description,
                        active: registro.role_active,
                        created: registro.role_created,
                        modified: registro.role_modified
                    }

                    var artist = {
                        artistId: Number.parseInt(registro.id),
                        title: registro.title,
                        description: registro.description,
                        active: registro.active,
                        role: artistRole,
                        created: registro.created,
                        modified: registro.modified
                    }


                    updateAcervoArtist(acervo, artist);

                    conexion.resume();
                })

            /**
             * A continuación obtengo los índices -themes- para un archivo
             *
             */
            var fetchThemesForArchive = conexion.query('select t.id, t.title, t.active, t.created, t.modified, tt.id as themetype_id, tt.title as themetype_title, tt.active as themetype_active, tt.created as themetype_created, tt.modified as themetype_modified from themes t inner join archives_themes `at` on t.id = at.theme_id inner join themetypes tt on tt.id = t.themetype_id where at.archive_id = ' + acervo.fondo.vida_record_id);

            fetchThemesForArchive
                .on('result', function(registro) {
                    conexion.pause();

                    var themeType = {
                        themeTypeId: registro.themetype_id,
                        title: registro.themetype_title,
                        active: registro.themetype_active,
                        created: registro.themetype_created,
                        modified: registro.themetype_modified
                    }

                    var theme = {
                        themeId: registro.id,
                        title: registro.title,
                        themeType: themeType,
                        active: registro.active,
                        created: registro.created,
                        modified: registro.modified
                    }

                    updateAcervoThemes(acervo, theme);

                    conexion.resume();
                })


            /**
             * A continuación obtengo los idiomas  para un archivo
             *
             */
            var fetchLanguagesForArchive = conexion.query('select l.id, l.title, l.isocode3, l.isocode2, l.title_spanish, l.active, l.created, l.modified from languages l inner join archives_languages al on l.id = al.language_id where al.archive_id = ' + acervo.fondo.vida_record_id);

            fetchLanguagesForArchive
                .on('result', function(registro) {
                    conexion.pause();

                    var language = {
                        languageId: Number.parseInt(registro.id),
                        title: registro.title,
                        isocode3: registro.isocode3,
                        isocode2: registro.isocode2,
                        title_spanish: registro.title_spanish,
                        active: registro.active,
                        created: registro.created,
                        modified: registro.modified
                    }

                    updateAcervoLanguages(acervo, language);

                    conexion.resume();
                })


            /**
             * A continuación obtengo los materiales -fuentes del archivo digital- para un archivo
             *
             */
            var fetchMaterialsForArchive = conexion.query('select m.id, m.type_id, m.id_externo, m.formato, m.tambor, m.copias, m.actos, m.items, m.ubicacion, m.conservacion, m.observacion, m.metraje, m.numero, m.duracion, m.soporte, m.coleccion, m.titulo_formal, t.title from materials m inner join archives_materials am on m.id = am.material_id inner join types t on m.type_id = t.id  where am.archive_id = ' + acervo.fondo.vida_record_id);

            fetchMaterialsForArchive
                .on('result', function(registro) {
                    conexion.pause();

                    var materialType = {
                        materialTypeId: registro.type_id,
                        title: registro.title
                    }

                    var material = {
                        materialId: registro.id,
                        type: materialType,
                        id_externo: registro.id_externo,
                        formato: registro.formato,
                        tambor: registro.tambor,
                        copias: registro.copias,
                        actos: registro.actos,
                        items: registro.items,
                        ubicacion: registro.ubicacion,
                        conservacion: registro.conservacion,
                        observacion: registro.observacion,
                        metraje: registro.metraje,
                        numero: registro.numero,
                        duracion: registro.duracion,
                        soporte: registro.soporte,
                        coleccion: registro.coleccion,
                        titulo_formal: registro.titulo_formal
                    }

                    updateAcervoMaterial(acervo, material);

                    conexion.resume();
                })

            /**
             * A continuación obtengo los generos para un archivo
             *
             */
            var fetchGenresForArchive = conexion.query('select g.id, g.title, g.description, g.active, g.created, g.modified from genres g inner join archives_genres ag on g.id = ag.genre_id where ag.archive_id = ' + acervo.fondo.vida_record_id);

            fetchGenresForArchive
                .on('result', function(registro) {
                    conexion.pause();

                    var genre = {
                        genreId: registro.id,
                        title: registro.title,
                        description: registro.title,
                        active: registro.active,
                        created: registro.created,
                        modified: registro.modified
                    }

                    updateAcervoGenre(acervo, genre);

                    conexion.resume();
                })



            conexion.resume();
        })
        .on('end', function() {});




    function insertNewAcervo(acervoContent) {
        servicio.createAcervo(acervoContent);
    }

    function updateAcervoCollections(acervo, collectionArray) {
        servicio.updateAcervoCollections(acervo, collectionArray);
    }

    function updateAcervoResources(acervo, resource) {
        servicio.updateAcervoResources(acervo, resource);
    }

    function updateAcervoDocuments(acervo, document) {
        servicio.updateAcervoDocument(acervo, document);
    }

    function updateAcervoAttachments(acervo, attachment) {
        servicio.updateAcervoAttachment(acervo, attachment);
    }

    function updateAcervoTimecodes(acervo, timecode) {
        servicio.updateAcervoTimecode(acervo, timecode);
    }

    function updateAcervoArtist(acervo, artist) {
        servicio.updateAcervoArtist(acervo, artist);
    }

    function updateAcervoThemes(acervo, theme) {
        servicio.updateAcervoThemes(acervo, theme);
    }

    function updateAcervoLanguages(acervo, language) {
        servicio.updateAcervoLanguages(acervo, language);
    }

    function updateAcervoMaterial(acervo, material) {
        servicio.updateAcervoMaterial(acervo, material);
    }


    function updateAcervoGenre(acervo, genre) {
        servicio.updateAcervoGenre(acervo, genre);
    }


    res.send('Fijate en el Mongo si migró!')

});

router.get('/search', function(req, res) {
    servicio.findByQuery(req.query, function(error) {
            res.status(400).json(error)
        },
        function(resultados) {
            res.status(200).json(resultados);
        });
});

router.get('/acervo/:id', function(req, res) {
    servicio.findById(req.params.id, function(error) {
            res.status(400).json(error)
        },
        function(resultado) {
            res.status(200).json(resultado);
        });
});

module.exports = router;