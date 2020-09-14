const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MAX_RESULTS = 250;

/**
 * Idea: una collection representa un conjunto de uno o más archivos
 * -archives-
 *
 */

const collectionSch = new Schema({
    collectionId: { type: Number, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    active: { type: Number, required: false },
    created: { type: Date, required: false },
    modified: { type: Date, required: false }
})

/**
 * Datos sobre el fondo al que pertenece un determinado archive (ahora acervo)
 *
 */

const fondoSch = new Schema({
    coleccion: { type: [collectionSch], required: false },
    legajo_numero: { type: Number, required: false },
    legajo_resumen: { type: String, required: false },
    id_externo: { type: String, required: false },
    vida_record_id: { type: Number, required: false }
});

/**
 * Metadata: metadatos que caracterizan al documento digital correspondiente
 * a un determinado acervo
 *
 */
const metadataSch = new Schema({
    timecode: { type: String, required: false },
    tape_master_numero: { type: Number, required: false },
    observacion_preparacion: { type: String, required: false },
    observacion_digitalizacion: { type: String, required: false },
    transcripcion: { type: String, required: false },
    puesta_audiovisual: { type: String, required: false },
    titulo_formal: { type: String, required: false },
    sonido: { type: Number, required: false },
    subtitulos: { type: Number, required: false },
    duracion: { type: String, required: false },
    color: { type: Number, required: false },
    derechos: { type: String, required: false },
    active: { type: Number, required: false },
    created: { type: String, required: false },
    modified: { type: String, required: false },
    coleccion: { type: String, required: false },
    temas_raw: { type: String, required: false },
    observacion_cinecolor: { type: String, required: false },
    custom1: { type: String, required: false },
    nroprocdigital: { type: String, required: false },
    motivos_visuales: { type: String, required: false },
    lado: { type: String, required: false },
    track: { type: String, required: false },
    fecha_grabacion: { type: Date, required: false },
    fecha_filmacion: { type: Date, required: false },
    fecha_ingreso: { type: Date, required: false },
    fecha_digitalizacion: { type: Date, required: false },
    velocidad: { type: String, required: false },
    created_administrador_id: { type: Number, required: false },
    modified_administrador_id: { type: Number, required: false }
});


/**
 * Materials: fuentes a partir de las que se genera el material digital
 * que luego pasará a almacenarse en un archivo -archive-
 *
 */

const materialTypeSch = new Schema({
    materialTypeId: { type: Number, required: false },
    title: { type: String, required: false }
});

const materialSch = new Schema({
    materialId: { type: Number, required: false },
    type: { type: materialTypeSch, required: false },
    id_externo: { type: String, required: false },
    formato: { type: String, required: false },
    tambor: { type: Number, required: false },
    copias: { type: String, required: false },
    actos: { type: String, required: false },
    items: { type: Number, required: false },
    ubicacion: { type: String, required: false },
    conservacion: { type: String, required: false },
    observacion: { type: String, required: false },
    metraje: { type: Number, required: false },
    numero: { type: Number, required: false },
    duracion: { type: Number, required: false },
    soporte: { type: String, required: false },
    coleccion: { type: String, required: false },
    titulo_formal: { type: String, required: false }
});

/**
 * Artist: personajes que aparecen en el material asociado al archivo
 *
 */

const artistRoleSch = new Schema({
    artistRoleId: { type: Number, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    active: { type: Number, required: false },
    created: { type: Date, required: false },
    modified: { type: Date, required: false }
});

const artistSch = new Schema({
    artistId: { type: Number, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    active: { type: Number, required: false },
    role: { type: artistRoleSch, required: false },
    created: { type: Date, required: false },
    modified: { type: Date, required: false }
});

/**
 * Languages: idiomas que aparecen en el material asociado al archivo
 *
 */

const languageSch = new Schema({
    languageId: { type: Number, required: false },
    title: { type: String, required: false },
    isocode3: { type: String, required: false },
    isocode2: { type: String, required: false },
    title_spanish: { type: String, required: false },
    active: { type: Number, required: false },
    created: { type: Date, required: false },
    modified: { type: Date, required: false }
});

/**
 * Timecodes: marcas de tiempo para un recurso de audio o video
 *
 */

const timecodeSch = new Schema({
    timecodeId: { type: Number, required: false },
    archiveid: { type: Number, required: false },
    code: { type: String, required: false },
    active: { type: Number, required: false },
    title: { type: String, required: false },
    created: { type: Date, required: false },
    modified: { type: Date, required: false }
});

/**
 * Un Theme es un tipo de índice (temático, onomástico, etcétera)
 *
 */

const themeTypeSch = new Schema({
    themeTypeId: { type: Number, required: false },
    title: { type: String, required: false },
    active: { type: Number, required: false },
    created: { type: Date, required: false },
    modified: { type: Date, required: false }
});

const themeSch = new Schema({
    themeId: { type: Number, required: false },
    title: { type: String, required: false },
    themeType: { type: themeTypeSch, required: false },
    active: { type: Number, required: false },
    created: { type: Date, required: false },
    modified: { type: Date, required: false }
});


/**
 * Descripción de un archivo -archive-
 *
 */

const documentSch = new Schema({
    documentId: { type: Number, required: false },
    title: { type: String, required: false },
    contents: { type: String, required: false },
    active: { type: Number, required: false },
    created: { type: Date, required: false },
    modified: { type: Date, required: false }
});


/**
 * Género de un archivo -archive-
 *
 */

const genreSch = new Schema({
    genreId: { type: Number, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    active: { type: Number, required: false },
    created: { type: Date, required: false },
    modified: { type: Date, required: false }
});


/**
 * Es un documento auxiliar que acompaña a un archivo -archive-
 *
 */

const fileTypeSch = new Schema({
    fileTypeId: { type: Number, required: false },
    title: { type: String, required: false }
});

const attachmentSch = new Schema({
    attachmentId: { type: Number, required: false },
    fileType: { type: fileTypeSch, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    fileHash: { type: String, required: false },
    fileName: { type: String, required: false },
    fileExt: { type: String, required: false },
    fileSize: { type: Number, required: false },
    active: { type: Number, required: false },
    created: { type: Date, required: false },
    modified: { type: Date, required: false }
});

/**
 * Un Resource es un documento digital principal, un documento
 * digital propiamente dicho, asociado a un determinado Archivo;
 * típicamente es un archivo de audio o video
 */

const resourceTypeSch = new Schema({
    resourceTypeId: { type: Number, required: false },
    title: { type: String, required: false },
    active: { type: Number, required: false },
    created: { type: Date, required: false },
    modified: { type: Date, required: false }
});

const resourceSch = new Schema({
    resourceId: { type: Number, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    path: { type: String, required: false },
    resourcetype: { type: resourceTypeSch, required: false },
    created: { type: Date, required: false },
    modified: { type: Date, required: false }
});


/**
 * Acervo: es el documento principal.
 *
 */

const acervoSch = new Schema({
    fondo: { type: fondoSch, required: false },
    metadatos: { type: metadataSch, required: false },
    assets: { type: [resourceSch], required: false },
    documentos: { type: [documentSch], required: false },
    attachments: { type: [attachmentSch], required: false },
    temas: { type: [themeSch], required: false },
    timecodes: { type: [timecodeSch], required: false },
    languages: { type: [languageSch], required: false },
    artists: { type: [artistSch], required: false },
    materials: { type: [materialSch], required: false },
    genres: { type: [genreSch], required: false }
});

const Acervo = mongoose.model('Acervo', acervoSch, 'acervos');

/************************************************
 * MÉTODOS PRIVADOS
 *
 */

function buildFiltroBusqueda(termino, tipoBusqueda) {
    if (tipoBusqueda === 'aprox') {
        return { '$regex': termino, '$options': 'i' };
    } else {
        return termino;
    }
}

function buildFiltroBusquedaYear(termino, tipoFecha) {
    if (tipoFecha === 'anio_filmacion') {
        return { '$eq': [{ '$year': '$metadatos.fecha_filmacion' }, Number.parseInt(termino)] };
    }

    if (tipoFecha === 'anio_grabacion') {
        return { '$eq': [{ '$year': '$metadatos.fecha_grabacion' }, Number.parseInt(termino)] };
    }

    if (tipoFecha === 'anio_digitalizacion') {
        return { '$eq': [{ '$year': '$metadatos.fecha_digitalizacion' }, Number.parseInt(termino)] };
    }
}

// 'timecodes.title':'peron'
// 'timecodes.title':'evita'
// 'timecodes': {$elemMatch: [{title: 'evita'}, {title: 'peron'}]}
// 'fecha': {$gte: algo, $lt: otro_algo};


/**
 * Construye la query que luego se envia a MongoDB para realizar una busqueda
 *
 *
 * @param {Object} query Objeto con los parámetros de búsqueda recibidos desde el frontend
 */
function buildQuery(query) {
    let q = {};

    if (query.recurso && query.recurso !== '-1') {
        q['assets.resourcetype.resourceTypeId'] = query.recurso;
    }

    // Nº de legajo
    if (query.buscarEn === 'legajo') {
        q['fondo.legajo_numero'] = buildFiltroBusqueda(query.termino, query.tipoBusqueda);
    }

    // Descripción (documento)
    if (query.buscarEn === 'document') {
        q['documentos.contents'] = buildFiltroBusqueda(query.termino, query.tipoBusqueda);
    }

    // Título
    if (query.buscarEn === 'title') {
        q['metadatos.titulo_formal'] = buildFiltroBusqueda(query.termino, query.tipoBusqueda);
    }

    // Colección
    if (query.buscarEn === 'collection') {
        q['metadatos.coleccion'] = buildFiltroBusqueda(query.termino, query.tipoBusqueda);
    }

    // Palabras clave
    if (query.buscarEn === 'temas_raw') {
        q['metadatos.temas_raw'] = buildFiltroBusqueda(query.termino, query.tipoBusqueda);
    }


    if (query.buscarEn === 'anio_filmacion') {
        q['$expr'] = buildFiltroBusquedaYear(query.termino, 'anio_filmacion')
    }

    if (query.buscarEn === 'anio_grabacion') {
        q['$expr'] = buildFiltroBusquedaYear(query.termino, 'anio_grabacion')
    }

    if (query.buscarEn === 'anio_digitalizacion') {
        q['$expr'] = buildFiltroBusquedaYear(query.termino, 'anio_digitalizacion')
    }

    console.log('Query -> %o', q);

    return q;
}


/**********************************
 * MÉTODOS EXTERNOS
 *
 */


exports.findByQuery = function(query, errorCallback, successCallback) {
    let queryOptions = buildQuery(query);

    Acervo.find(queryOptions).limit(MAX_RESULTS).lean().exec(function(error, results) {
        if (error) {
            errorCallback(error);
        } else {
            successCallback(results);
        }
    });
}

exports.findById = function(id, errorCallback, successCallback) {
    Acervo.findById(id).lean().exec(function(error, results) {
        if (error) {
            errorCallback(error);
        } else {
            successCallback(results);
        }
    });
}


exports.createAcervo = function(acervoContent) {
    Acervo.create(acervoContent);
}

exports.updateAcervoCollections = function(acervo, collectionArray) {
    Acervo.updateOne({ "fondo.vida_record_id": acervo.fondo.vida_record_id }, {
            "fondo.coleccion": collectionArray
        }).then((result) => {

        })
        .catch((error) => {

        });
}

exports.updateAcervoResources = function(acervo, resource) {
    Acervo.updateOne({ "fondo.vida_record_id": acervo.fondo.vida_record_id }, { $push: { assets: resource } })
        .then((result) => {

        })
        .catch((error) => {

        });
}

exports.updateAcervoDocument = function(acervo, document) {
    Acervo.updateOne({ "fondo.vida_record_id": acervo.fondo.vida_record_id }, { $push: { documentos: document } })
        .then((result) => {

        })
        .catch((error) => {

        });
}

exports.updateAcervoAttachment = function(acervo, attachment) {
    Acervo.updateOne({ "fondo.vida_record_id": acervo.fondo.vida_record_id }, { $push: { attachments: attachment } })
        .then((result) => {

        })
        .catch((error) => {

        });
}

exports.updateAcervoTimecode = function(acervo, timecode) {
    Acervo.updateOne({ "fondo.vida_record_id": acervo.fondo.vida_record_id }, { $push: { timecodes: timecode } })
        .then((result) => {

        })
        .catch((error) => {

        });
}

exports.updateAcervoArtist = function(acervo, artist) {
    Acervo.updateOne({ "fondo.vida_record_id": acervo.fondo.vida_record_id }, { $push: { artists: artist } })
        .then((result) => {

        })
        .catch((error) => {

        });
}


exports.updateAcervoThemes = function(acervo, theme) {
    Acervo.updateOne({ "fondo.vida_record_id": acervo.fondo.vida_record_id }, { $push: { temas: theme } })
        .then((result) => {

        })
        .catch((error) => {

        });
}


exports.updateAcervoLanguages = function(acervo, language) {
    Acervo.updateOne({ "fondo.vida_record_id": acervo.fondo.vida_record_id }, { $push: { languages: language } })
        .then((result) => {

        })
        .catch((error) => {

        });
}

exports.updateAcervoMaterial = function(acervo, material) {
    Acervo.updateOne({ "fondo.vida_record_id": acervo.fondo.vida_record_id }, { $push: { materials: material } })
        .then((result) => {

        })
        .catch((error) => {

        });
}

exports.updateAcervoGenre = function(acervo, genre) {
    Acervo.updateOne({ "fondo.vida_record_id": acervo.fondo.vida_record_id }, { $push: { genres: genre } })
        .then((result) => {

        })
        .catch((error) => {

        });
}