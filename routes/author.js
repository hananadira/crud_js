const express = require('express')
const router = express.Router()
const {
    addAuthor,
    getAuthor,
    getAutors,
    updateAuthor,
    deleteAuthor
} = require('../controllers/AuthourController')

router.get('/', getAutors)

router.post('/', addAuthor)

router.get('/:id', getAuthor)

router.put('/:id', updateAuthor)

router.delete('/:id', deleteAuthor)

module.exports = router