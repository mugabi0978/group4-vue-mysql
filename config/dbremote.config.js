module.exports = {
    HOST: "localhost",
    USER: "schoolpe_june010",
    PASSWORD: "fP##74v@IbO@iafP",
    DB: "schoolpe_june_internship",
    dialect: "mysql",
    pool: {
        // maximum number of connections to db pool
        max: 5,
        // minimum number of connections to db pool 
        min: 0,
        // maximum time, in milliseconds, that the db pool tries to connect before it throws an error
        acquire: 30000,
        // maximum time, in milliseconds, that a connection can be idle before being released
        idle: 10000

    }
}