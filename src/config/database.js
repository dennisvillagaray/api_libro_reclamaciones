const mysql = require('mysql')

const dbPassword = process.env.DB_PASSWORD
const dbUser = process.env.DB_USER
const dbName = process.env.DB_NAME

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: dbUser,
    password: dbPassword,
    database: dbName
})

mysqlConnection.connect(err => {
    if (err) {
        console.log('db error -> ', err)
    } else {
        console.log('db is connected')
    }
})



module.exports = mysqlConnection
