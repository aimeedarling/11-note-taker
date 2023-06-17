const router = require('express').Router()
const {readFromFile, readAndAppend} = require('../helpers/fsUtils')
const uuid = require('../helpers/uuid')


//GET routes
router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then(data => res.json(JSON.parse(data)))
})


//POST routes
router.post('/notes', (req, res) => {
    let newNote ={
        title: req.body.title,
        text: req.body.text,
        id: uuid()
    }
    readAndAppend(newNote, './db/db.json')
    res.json('success')
})

module.exports = router