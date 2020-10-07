const mongoose = require('mongoose');
const Schema = mongoose.Schema;








const reportesSch = new Schema({
    person_id : { type : String, required : true},
    description : { type : String, required : true},
    fecha : { type : Date , required : false}
})

function buildQuery(query) {
    let q = {};

    // TODO: En el modelo, este campo debiera llamarse tdoc
    if (query.fecha) {
        q['fecha'] = query.fecha;
    }

    return q;
}

const record = mongoose.model('Reportes', reportesSch, 'reportes');

/******************************************************************************
 * Métodos públicos
 *
 */

exports.create = function(data, errorCallback, successCallback) {
    record.create(data, function(error, result) {
        if (error) {
            errorCallback(error);
        } else {
            //person.createPersonFromUser(result, successCallback)
                successCallback(result);
        }
    });
}

// exports.update = function(id, data, errorCallback, successCallback) {
//     record.findByIdAndUpdate(id, data, { new: true }, function(error, result) {
//         if (error) {
//             errorCallback(error);
//         } else {
//             successCallback(result);
//         }
//     });
// }

// exports.delete = function(id, errorCallback, successCallback) {
//     record.findByIdAndDelete(id, function(error, result) {
//         if (error) {
//             errorCallback(error);
//         } else {
//             successCallback(result);
//         }
//     });
// }

exports.findAll = function(errorCallback, successCallback) {
    record.find().lean().exec(function(error, result) {
        if (error) {
            errorCallback(error);
        } else {
            successCallback(result);
        }
    });
}

exports.findByQuery = function(query, errorCallback, successCallback) {
    const regexQuery = buildQuery(query);

    record.find(regexQuery).lean().exec(function(error, result) {
        if (error) {
            errorCallback(error);
        } else {
            successCallback(result);
        }
    });
}