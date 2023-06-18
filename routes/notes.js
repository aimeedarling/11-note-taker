const router = require('express').Router()
const {readFromFile, readAndAppend} = require('../helpers/fsUtils')
const uuid = require('../helpers/uuid')
const fs = require('fs')

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

//DELETE route
router.delete('/notes/:id', (req, res) => {
    const id = req.params.id
    const notesData = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
    const index = notesData.findIndex((note) => note.id === id)

    if (index !== -1) {
        notesData.splice(index, 1)
        fs.writeFileSync('./db/db.json', JSON.stringify(notesData))
        res.json({ message: 'Note deleted successfully' })
    } else {
        res.status(404).json({ error: 'Note not found' })
    }
})

module.exports = router