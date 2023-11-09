const dbConfig = require('../config/database')
const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const pool = mysql.createPool(dbConfig)
const {
    responseAuthSuccess,
    responseFailValidate
} = require('../traits/ApiResponse')
const { Connection } = require('mysql2/typings/mysql/lib/Connection')

pool.on('error', (err) => {
    console.error(err)
})

const accesssTokenSecret = '2023-Wikrama-exp'

const register = (req, res) => {
    const data = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query(`SELECT * FROM users WHERE email='${data.email}' OR 
        username='${data.username}'`, (err,results) => {
            if(err) throw err 

            if(results.length > 0) {
                res.status(403).json({
                    message: 'Email/Username sudah digunakan'
                })

                return 
            }
        })
    })
}