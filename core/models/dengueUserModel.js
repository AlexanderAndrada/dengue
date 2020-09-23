const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const crypto = require('crypto');
const key = Buffer.from('5ed90daa50a3d7fd1a1ea7a1d7883fc62ccffc49de570ec37eebf05067aa613a', 'hex');
const IV = Buffer.from('a2e50e8df4c5ad20b6af1269ba2552be', 'hex');
const person = require('../models/personModel');

const dengueUsuarioWebSch = new Schema({
    ndoc: { type: Number, required: true },
    tipoDoc: { type: String, required: true, default: 'DNI' },
    numTramite: { type: Number, required: true },
    nombre: { type: String, required: false },
    apellido: { type: String, required: false },
    username: { type: String, required: false },
    password: { type: String, required: true },
    email: { type: String, required: false },
    telefono: { type: Number, required: true },
    fechaNacimiento: { type: Date, required: true },
    tsFechaNacimiento: { type: Number, required: true },
    preguntaSecreta: { type: String, required: true },
    respuestaSecreta: { type: String, required: true },
    isUsuarioWeb: { type: Boolean, required: true, default: true }
});

/******************************************************************************
 * Funciones utilitarias
 *
 */

function buildQuery(query) {
    let q = {};

    return q;
}

function encrypt(input) {
    const cifrador = crypto.createCipheriv('aes-256-ctr', key, IV);
    let inputCifrado = cifrador.update(input, 'utf8', 'hex');

    inputCifrado += cifrador.final('hex');

    return inputCifrado;
}


function comparePasswords(plain, encrypted, callback) {
    if (encrypt(plain) === encrypted) {
        callback(false, true);
    } else {
        callback({ error: 'Contraseña errónea' }, false);
    }
}


/**
 * 'hook' para encriptar el password antes de insertar un usuario nuevo
 */
dengueUsuarioWebSch.pre('save', function(next) {
    let usuario = this;
    usuario.password = encrypt(usuario.password);
    next();
});

/**
 * método verificador de contraseña
 */
dengueUsuarioWebSch.methods.comparePassword = function(passwordToCompare, callback) {
    comparePasswords(passwordToCompare, this.password, callback);
}

const record = mongoose.model('DengueUsuario', dengueUsuarioWebSch, 'dengueusuarios');

/******************************************************************************
 * Métodos públicos
 *
 */

exports.create = function(data, errorCallback, successCallback) {
    record.create(data, function(error, result) {
        if (error) {
            errorCallback(error);
        } else {
            person.createPersonFromUser(result, successCallback)
                //successCallback(result);
        }
    });
}

exports.update = function(id, data, errorCallback, successCallback) {
    console.log('hola %o', data)
    record.findByIdAndUpdate(id, data, { new: true }, function(error, result) {
        if (error) {
            errorCallback(error);
        } else {
            successCallback(result);
        }
    });
}

exports.delete = function(id, errorCallback, successCallback) {
    record.findByIdAndDelete(id, function(error, result) {
        if (error) {
            errorCallback(error);
        } else {
            successCallback(result);
        }
    });
}

exports.findAll = function(errorCallback, successCallback) {
    record.find().lean().exec(function(error, result) {
        if (error) {
            errorCallback(error);
        } else {
            successCallback(result);
        }
    });
}

exports.findById = function(id, callback) {
    record.findById(id, function(error, user) {
        callback(error, user);
    });
}

exports.findByUsername = function(username, callback) {
    record.findOne({ username: username }, function(error, user) {
        callback(error, user);
    });
}

exports.findPersonForUser = function(id, errorCallback, successCallback) {
    person.findByQuery({ userId: id }, function(error) {
        errorCallback(error);
    }, function(person) {
        successCallback(person);
    });
}

exports.verifyPassword = function(currentPassword, passwordToCompare, callback) {
    comparePasswords(currentPassword, passwordToCompare, callback);
};

exports.resetPassword = function(data, errorCallback, callback) {
    record.findOneAndUpdate({ email: data.email, preguntaSecreta: data.preguntaSecreta, respuestaSecreta: data.respuestaSecreta }, { password: encrypt(data.password) }, function(error, result) {
        if (error) {
            errorCallback(error);
        } else {
            callback(result);
        }
    });
}
