const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Forever_hi5.',
    database: 'libro_reclamaciones'
})

mysqlConnection.connect(err => {
    if (err) {
        console.log('db error -> ', err)
    } else {
        console.log('db is connected')
    }
})



module.exports = mysqlConnection
