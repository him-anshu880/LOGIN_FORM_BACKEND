const mysql = require("mysql");

const connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "Himanshu@123",
    database: "demo"
})

connection.connect((err) => {

    if (err) {
        console.log(err)
    } else {
        console.log(`connected......`)
    }
})

module.exports = connection