module.exports = {
    HOST: "52.90.135.103",
    // HOST: "localhost",
    USER: "schoolpe_group1_user",
    PASSWORD: "9aFkIR5m3CtU#2wK",
    DB: "schoolpe_group1",
    dialect: "mysql",
    pool: {
        // maximum number of connections to db pool
        max: 5,
        // minimum number of connections to db pool 
        min: 0,
        // maximum time, in milliseconds, that the db pool tries to connect before it throws an error
        acquire: 30000,
        // maximum time, in milliseconds, that a connection can be idle before being released
        idle: 100000000

    }
}