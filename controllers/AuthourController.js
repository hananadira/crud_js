const mysql = require('mysql2')
const dbConfig = require('../config/database')
const {
    responseNotFound,
    responseSuccess
} = require('../traits/ApiResponse')
const { request } = require('express')
const pool = mysql.createPool(dbConfig)

const getAutors = (req, res) => {
    const query = "SELECT * FROM author"

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err
            
            responseSuccess(res, results, 'Author succesfully fetched')
        })

        connection.release()
    })
}

const addAuthor = (req, res) => {
    const data = {
        nama: req.body.nama,
        email: req.body.email,
        alamat: req.body.alamat,
        umur: req.body.umur,
        media_sosial: req.body.media_sosial
    }

    const query_2 = 'INSERT INTO author SET ?'

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query_2, [data], (err, results) => {
            if(err) throw err
            
            responseSuccess(res, results, 'Author successfully added')
        })

        connection.release()
    })
}

const getAuthor = ((req, res) => {
    const id = req.params.id

    const query_2 = `SELECT * FROM author WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query_2, (err, results) => {
            if(err) throw err

            if(results.length == 0 ){
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'Author successfully fetched')
        })

        connection.release()
    })
})

const updateAuthor = (req, res) => {
    const id = req.params.id

    const data = {
        nama: req.body.nama,
        email: req.body.email,
        alamat: req.body.alamat,
        umur: req.body.umur,
        media_sosial: req.body.media_sosial
    }

    const query_2 = `UPDATE author SET ? WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err 

        connection.query(query_2, [data], (err, results) => {
            if(err) throw err

            if(results.affectedRows == 0) {
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'Author successfully updated')
        })

        connection.release()
    })
}

deleteAuthor = (req, res) => {
    const id = req.params.id

    const query_2 = `DELETE FROM author WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query_2, (err, results) => {
            if(err) throw err 

            if(results.affectedRows == 0 ) {
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'Author successfully delete')
        })

        connection.release()
    })
}

module.exports = {
    addAuthor,
    getAuthor,
    getAutors,
    updateAuthor,
    deleteAuthor
}