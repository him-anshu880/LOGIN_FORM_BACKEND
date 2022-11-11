const express = require('express')
const bcrypt = require("bcrypt")
// hello
const jwt = require("jsonwebtoken")
const cors =  require("cors")
const verifyToken = require("./middilewere.js")
const connection = require("./db.js")
const app = express();
app.use(express.json());
app.use(cors())

// hello i have change the commit

app.get(`/data`, (req, res) => {

    res.send("hello himanshu");
})
app.get('/get_students_data', (req, res) => {

    connection.query(`select * from students`, (err, results, feilds) => {
        if (!err) {
            res.status(200).send({
                result: results
            })
        } else {
            res.status(400).send({
                error: err
            })
        }
    })
})
app.post('/insert_data', (req, res) => {

    const sql = `insert into students(roll,firstname,lastname,age,city,post) values(?,?,?,?,?,?)`
    connection.query(sql, [req.body.roll, req.body.firstname, req.body.lastname, req.body.age, req.body.city, req.body.post], (err, result, feilds) => {

        if (err) {
            res.status(400).send({
                err: err
            })
        } else {
            res.status(200).send({
                success: true,
                results: result
            })
        }

    })

})
app.post('/signup', (req, res) => {
    const sql = `insert into signup(username,email,password) values(?,?,?)`
    bcrypt.hash(req.body.password, 10, (err, pass) => {
        if (err) {
            console.log(err);
        } else {
            connection.query(sql, [req.body.username, req.body.email, pass], (err, result, feilds) => {
                if (err) {
                    res.status(400).send({
                        success:false,
                        err: err
                    })
                } else {

                    res.status(200).send({
                        success: true,
                        results: result
                    })
                }

            })
        }

    })
})
app.post('/signin', (req, res) => {

    let email = req.body.email;
    var sql = `select * from signup where email = ?`

    connection.query(sql, [email], function (err, result, fields) {
        if (err) {
            res.status(400).send(err);
        }
        else if (result.length > 0) {
            if (bcrypt.compareSync(req.body.password, result[0].password)) {
                const token = jwt.sign({ loginAdmin: result }, "43209-ni");
                res.status(201).json({ message: 'login successfully.', token: token })
            }
            else {
                res.send("password dose not match")
            }
        }
        else {
            res.send("email is not correct");
        }
    })
})


const PORT = process.env.PORT || 6900;

app.listen(PORT, () => {
    console.log(`server at running port ${PORT}`)
})
