const current = 'lucas_dev';

const config_mysql = {

    agn_dev: {
        MySQL: {
            host: 'localhost',
            puerto: 3306,
            usuario: 'matgomez',
            password: 'Hola.1234',
            database: 'agn200_desa_db'
        }
    },

    mgo_dev: {
        MySQL: {
            host: 'localhost',
            puerto: 3306,
            usuario: 'root',
            password: 'abc1234',
            database: 'agn_vida'
        }
    },

    lucas_dev: {
        MySQL: {
            host: 'localhost',
            puerto: 3306,
            usuario: 'lucas',
            password: 'lucas',
            database: 'agnbicentenario'
        }
    },

    facundo_dev: {
        MySQL: {
            host: 'localhost',
            puerto: 3306,
            usuario: 'maldonado',
            password: 'maldonado',
            database: 'agnbicentenario'
        }
    }

}


module.exports = config_mysql[current];